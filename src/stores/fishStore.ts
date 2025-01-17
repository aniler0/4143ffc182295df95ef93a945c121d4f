import { useFetch } from '@/composables/useFetch'
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTimeStore } from './timeStore'

export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()

  const getFishList = async () => {
    await fetchData('https://run.mocky.io/v3/e80be173-df55-404b-833b-670e53a4743d')
    if (data.value) {
      const timeStore = useTimeStore()
      const currentDate = timeStore.currentDateTime

      fishList.value = data.value.map(fish => {
        const [hours, minutes] = fish.feedingSchedule.lastFeed.split(':').map(Number)
        const lastFeedFullTime = new Date(currentDate)
        lastFeedFullTime.setHours(hours, minutes)

        // If feed time is in future relative to current time, subtract a day
        if (lastFeedFullTime > currentDate) {
          lastFeedFullTime.setDate(lastFeedFullTime.getDate() - 1)
        }

        return {
          ...fish,
          health: HealthStatusEnum.Critical,
          feedingSchedule: {
            ...fish.feedingSchedule,
            lastFeedFullTime
          }
        }
      })
    }
  }

  const feedFish = (fishId: string) => {
    const timeStore = useTimeStore()
    const now = timeStore.currentDateTime
    const currentTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    const fishIndex = fishList.value.findIndex(fish => fish.id === fishId)
    if (fishIndex !== -1) {
      fishList.value[fishIndex] = {
        ...fishList.value[fishIndex],
        feedingSchedule: {
          ...fishList.value[fishIndex].feedingSchedule,
          lastFeed: currentTime,
          lastFeedFullTime: new Date(now) // Add this line to update the full timestamp
        }
      }
    }
  }



  return { fishList, isLoading, error, getFishList, feedFish }
})
