import { useFetch } from '@/composables/useFetch'
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish'
import { checkFishHealthByTime, fishTypeToImageSelector } from '@/util/fishUtils'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTimeStore } from './timeStore'

const API_URL = import.meta.env.VITE_FISH_API_URL


export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()
  const timeStore = useTimeStore()
  const lastFeedTimes = ref(new Map<string, Date>())  // Track last status update time per fish

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
      health: HealthStatusEnum.Healthy,
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


  const feedFish = (fishId: string) => {
    const fish = fishList.value.find(fish => fish.id === fishId)
    if (!fish) return

    const currentDate = timeStore.currentDateTime

    // Store the current health status before feeding
    const previousHealth = fish.health

    // Calculate if fish was hungry before feeding
    const hoursSinceLastFeed = (currentDate.getTime() - fish.feedingSchedule.lastFeedFullTime.getTime()) / (1000 * 60 * 60)
    const toleranceWindow = 10 / 60; // 10 minutes in hours
    const idealTimeWindow = fish.feedingSchedule.intervalInHours;
    const idealFeedingTime = Math.abs(hoursSinceLastFeed - idealTimeWindow) <= toleranceWindow;
    

    // Update last feed time
    fish.feedingSchedule.lastFeedFullTime = currentDate

    // Update health based on previous status and hunger
    if (idealFeedingTime) {
      switch (previousHealth) {
        case HealthStatusEnum.Critical:
          fish.health = HealthStatusEnum.Normal
          break
        case HealthStatusEnum.Normal:
          fish.health = HealthStatusEnum.Healthy
          break
      }
    } else {
      // Overfeeding case
      switch (previousHealth) {
        case HealthStatusEnum.Healthy:
          fish.health = HealthStatusEnum.Normal
          break
        case HealthStatusEnum.Normal:
          fish.health = HealthStatusEnum.Critical
          break
        case HealthStatusEnum.Critical:
          fish.health = HealthStatusEnum.Dead
          break
      }
    }

    // Store the time of this health update
    lastFeedTimes.value.set(fishId, currentDate)
  }


  const shouldUpdateHealth = (fishId: string, currentTime: Date) => {
    const lastUpdate = lastFeedTimes.value.get(fishId)
    if (!lastUpdate) return true

    // Only update health if it's been at least 1 second since last feed/update
    return (currentTime.getTime() - lastUpdate.getTime()) >= 1000
  }

  return { fishList, isLoading, error, getFishList, feedFish, shouldUpdateHealth }
})