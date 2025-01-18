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
        lastFeedFullTime,
        healthScheduleTime: new Date(lastFeedFullTime)
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
    const FEED_TOLERANCE_MINUTES = 10  // 10 minutes tolerance
    // Calculate if fish was hungry before feeding
    const minuteSinceLastFeed = (currentDate.getTime() - fish.feedingSchedule.lastFeedFullTime.getTime()) / (1000 * 60)
    const intervalInMinutes = fish.feedingSchedule.intervalInHours * 60


    const wasHungry = minuteSinceLastFeed > (intervalInMinutes - FEED_TOLERANCE_MINUTES)
    // Update last feed time
    fish.feedingSchedule.lastFeedFullTime = currentDate
    fish.feedingSchedule.healthScheduleTime = new Date(currentDate)

    // Update health based on previous status and hunger
    if (wasHungry) {
      if (fish.health !== HealthStatusEnum.Healthy) {
        fish.health += 1
      }
    } else {
      fish.health -= 1
    }

    // Store the time of this health update
    lastFeedTimes.value.set(fishId, currentDate)
  }
  return { fishList, isLoading, error, getFishList, feedFish }
})