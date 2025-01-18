import { useFetch } from '@/composables/useFetch'
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish'
import { checkFishHealthByTime, fishTypeToImageSelector } from '@/util/fishUtils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTimeStore } from './timeStore'

const API_URL = import.meta.env.VITE_FISH_API_URL

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}

export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()
  const timeStore = useTimeStore()

  const getFishList = async () => {
    try {
      await fetchData(API_URL)
      if (!data.value) return

      const currentDate = timeStore.currentDateTime
      fishList.value = data.value.map(fish => mapFishData(fish, currentDate))
    } catch (err) {
      console.error('Failed to fetch fish list:', err)
    }
  }

  const createLastFeedTime = (feedTime: string, currentDate: Date): Date => {
    const [hours, minutes] = feedTime.split(':').map(Number)
    const lastFeedTime = new Date(currentDate)
    lastFeedTime.setHours(hours, minutes)

    if (lastFeedTime > currentDate) {
      lastFeedTime.setDate(lastFeedTime.getDate() - 1)
    }

    return lastFeedTime
  }

  const mapFishData = (fish: IFishResponse, currentDate: Date): IFish => {
    const lastFeedFullTime = createLastFeedTime(fish.feedingSchedule.lastFeed, currentDate)

    const mappedFish = {
      ...fish,
      fishImage: fishTypeToImageSelector(fish.type),
      health: HealthStatusEnum.Healty,
      feedingSchedule: {
        ...fish.feedingSchedule,
        lastFeedFullTime
      }
    }

    return {
      ...mappedFish,
      health: checkFishHealthByTime(mappedFish, currentDate)
    }
  }

  const updateFishFeeding = (fish: IFish, currentTime: string, now: Date): IFish => {
    return {
      ...fish,
      feedingSchedule: {
        ...fish.feedingSchedule,
        lastFeed: currentTime,
        lastFeedFullTime: new Date(now)
      }
    }
  }

  const feedFish = (fishId: string) => {
    const timeStore = useTimeStore()
    const now = timeStore.currentDateTime
    const currentTime = now.toLocaleTimeString('en-GB', TIME_FORMAT)

    const fishIndex = fishList.value.findIndex(fish => fish.id === fishId)
    if (fishIndex === -1) return

    const updatedFish = updateFishFeeding(
      fishList.value[fishIndex],
      currentTime,
      now
    )

    // Update health status immediately after feeding
    updatedFish.health = checkFishHealthByTime(updatedFish, now)

    fishList.value[fishIndex] = updatedFish
  }

  return { fishList, isLoading, error, getFishList, feedFish }
})