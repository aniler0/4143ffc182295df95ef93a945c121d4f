import { useFetch } from '@/composables/useFetch'
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()

  const getFishList = async () => {
    await fetchData('https://run.mocky.io/v3/e80be173-df55-404b-833b-670e53a4743d')
    if (data.value) {
      fishList.value = data.value.map(fish => ({
        ...fish,
        health: HealthStatusEnum.Critical // or any other default
      }))
    }
  }

  const feedFish = (fishId: string) => {
    const now = new Date()
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
          lastFeed: currentTime
        }
      }
    }
  }
  


  return { fishList, isLoading, error, getFishList, feedFish }
})
