import { HealthStatusEnum, type IFish } from "@/types/fish"

export function fishTypeToImageSelector(type: string): string {
    switch (type) {
        case 'Goldfish':
            return '/src/assets/images/goldfish.png'
        case 'Betta':
            return '/src/assets/images/betta.png'
        case 'Angelfish':
            return '/src/assets/images/angelfish.png'
        case 'Guppy':
            return '/src/assets/images/guppy.png'
        case 'Oscar':
            return '/src/assets/images/oscar.png'
        default:
            return '/src/assets/images/goldfish.png'
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
        case HealthStatusEnum.Healty:
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
    const hoursSinceLastFeed = (currentTime.getTime() - fish.feedingSchedule.lastFeedFullTime.getTime()) / (1000 * 60 * 60);
    const interval = fish.feedingSchedule.intervalInHours;
    const minutesLate = Math.floor((hoursSinceLastFeed - interval) * 60);

    if (hoursSinceLastFeed > interval * 3) {
        return HealthStatusEnum.Dead;
    } else if (hoursSinceLastFeed > interval * 2) {
        return HealthStatusEnum.Critical;
    } else if (minutesLate > 10) {
        return HealthStatusEnum.Normal;
    }
    return HealthStatusEnum.Healty;
}

export const getMealCount = (fish: IFish): string => {
    const mealCount = Math.round(24 / fish.feedingSchedule.intervalInHours);
    const fishWeight = fish.weight;
    const feedPerGram = 0.01;

    const totalFeedPerDay = fishWeight * feedPerGram;
    const feedAmountPerInterval = totalFeedPerDay / mealCount;
    return `${Number(feedAmountPerInterval.toFixed(4))}g x ${mealCount} times`;
}