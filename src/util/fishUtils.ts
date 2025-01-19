import { FEED_PER_GRAM, HOURS } from "@/constants/fish-constants"
import { HealthStatusEnum, type IFish } from "@/types/fish"

export function fishTypeToImageSelector(type: string): string {
  switch (type) {
    case 'Goldfish':
      return '/images/goldfish.png'
    case 'Betta':
      return '/images/betta.png'
    case 'Angelfish':
      return '/images/angelfish.png'
    case 'Guppy':
      return '/images/guppy.png'
    case 'Oscar':
      return '/images/oscar.png'
    default:
      return '/images/goldfish.png'
  }
}

export function getHealthStatusText(status: HealthStatusEnum): string {
  switch (status) {
    case HealthStatusEnum.DEAD:
      return 'Dead'
    case HealthStatusEnum.CRITICAL:
      return 'Critical'
    case HealthStatusEnum.NORMAL:
      return 'Normal'
    case HealthStatusEnum.HEALTHY:
      return 'Healthy'
  }
}

export const getHealthStatusColor = (status: HealthStatusEnum) => {
  switch (status) {
    case HealthStatusEnum.DEAD:
      return 'error'
    case HealthStatusEnum.CRITICAL:
      return 'purple' // or any other color for critical
    case HealthStatusEnum.HEALTHY:
      return 'success'
    default:
      return 'warning'
  }
}

export function calculateTimeDifferenceInMinutes(currentTime: Date, lastFeedTime: Date): number {
  return Math.floor((currentTime.getTime() - lastFeedTime.getTime()) / (1000 * 60));
}

export function formatTimeDifference(currentTime: Date, lastFeedFullTime: Date): string {
  const diffInMinutes = Math.floor(
    (currentTime.getTime() - lastFeedFullTime.getTime()) / (1000 * 60)
  )

  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60

  const hourText = hours === 1 ? 'hour' : 'hours'
  const minuteText = minutes === 1 ? 'minute' : 'minutes'

  if (hours === 0) {
    return `${minutes} ${minuteText}`
  }

  if (minutes === 0) {
    return `${hours} ${hourText}`
  }

  return `${hours} ${hourText} ${minutes} ${minuteText}`
}

export function isAcceptableMealAmount(fish: IFish, providedAmount: number): boolean {
  // Calculate ideal meal size
  const mealsPerDay = Math.round(HOURS / fish.feedingSchedule.intervalInHours)
  const totalFeedPerDay = fish.weight * FEED_PER_GRAM
  const idealMealAmount = totalFeedPerDay / mealsPerDay
  // Check if provided amount is within range
  return Number(providedAmount.toFixed(2)) === Number(idealMealAmount.toFixed(2))
}

export const getMealAmountPerInterval = (fish: IFish): number => {
  const mealCount = Math.round(HOURS / fish.feedingSchedule.intervalInHours)
  const fishWeight = fish.weight

  const totalFeedPerDay = fishWeight * FEED_PER_GRAM
  const feedAmountPerInterval = totalFeedPerDay / mealCount
  return Number(feedAmountPerInterval.toFixed(3))
}

export const getDailyMealCount = (fish: IFish): number => {
  const mealCount = Math.round(HOURS / fish.feedingSchedule.intervalInHours);
  return mealCount;
}
