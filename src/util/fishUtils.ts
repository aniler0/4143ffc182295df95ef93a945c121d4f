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
        case HealthStatusEnum.Dead:
            return 'Dead'
        case HealthStatusEnum.Critical:
            return 'Critical'
        case HealthStatusEnum.Normal:
            return 'Normal'
        case HealthStatusEnum.Healthy:
            return 'Healthy'
    }
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

export const checkFishHealthByTime = (fish: IFish, currentTime: Date): HealthStatusEnum => {
    const minutesSinceLastFeed = (currentTime.getTime() - fish.feedingSchedule.healthScheduleTime.getTime()) / (1000 * 60);
    const intervalInMinutes = fish.feedingSchedule.intervalInHours * 60;
    const TOLERANCE = 10;
    if (fish.health === HealthStatusEnum.Dead) {
        return HealthStatusEnum.Dead;  // Dead fish stays dead
    }

    if (minutesSinceLastFeed >= intervalInMinutes + TOLERANCE) {
        fish.feedingSchedule.healthScheduleTime = currentTime;
        fish.health -= 1
    }

    return fish.health;  // Maintain current health if within feeding interval
}

export const getMealCount = (fish: IFish): string => {
    const mealCount = Math.round(24 / fish.feedingSchedule.intervalInHours);
    const fishWeight = fish.weight;
    const feedPerGram = 0.01;

    const totalFeedPerDay = fishWeight * feedPerGram;
    const feedAmountPerInterval = totalFeedPerDay / mealCount;
    return `${Number(feedAmountPerInterval.toFixed(3))}g x ${mealCount} times`;
}
