import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useFetch } from '@/composables/useFetch'
import { FEED_TOLERANCE_MINUTES } from '@/constants/fish-constants'
import { useTimeStore } from '@/stores/timeStore'
import { type IFish, type IFishResponse } from '@/types/fish'
import { calculateTimeDifferenceInMinutes, isAcceptableMealAmount } from '@/util/fishUtils'
import { mapFishResponse, shouldUpdateFishHealth, updateFishHealth } from './helpers/fishStoreHelpers'

const API_URL = import.meta.env.VITE_FISH_API_URL

export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()
  const timeStore = useTimeStore()

  const getFishList = async () => {
    try {
      await fetchData(API_URL)
      if (!data.value) return
      fishList.value = data.value.map(fish => mapFishResponse(fish, timeStore.currentDateTime))
    } catch (err) {
      console.error('Failed to fetch fish list:', err)
    }
  }

  const feedFish = (fishId: string, amount: number) => {
    const fish = fishList.value.find(fish => fish.id === fishId)
    if (!fish) return

    const currentDate = timeStore.currentDateTime
    const minutesSinceLastFeed = calculateTimeDifferenceInMinutes(
      currentDate,
      fish.feedingSchedule.lastFeedFullTime
    )
    const isHealthyAmount = isAcceptableMealAmount(fish, amount)

    // First check timing, then check amount
    const isHealthyTiming = shouldUpdateFishHealth(
      minutesSinceLastFeed,
      fish.feedingSchedule.intervalInHours * 60,
      FEED_TOLERANCE_MINUTES
    )
    // Update fish health based on both timing and amount
    fish.health = updateFishHealth(
      fish.health,
      isHealthyTiming && isHealthyAmount
    )

    // Update feeding times
    fish.feedingSchedule.lastFeedFullTime = currentDate
    fish.feedingSchedule.healthScheduleTime = currentDate
  }
  return { fishList, isLoading, error, getFishList, feedFish }
})
