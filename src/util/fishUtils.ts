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
    const hoursSinceLastFeed = (currentTime.getTime() - fish.feedingSchedule.lastFeedFullTime.getTime()) / (1000 * 60 * 60);
    const interval = fish.feedingSchedule.intervalInHours;

    if (fish.health === HealthStatusEnum.Dead) {
        return HealthStatusEnum.Dead;  // Dead fish stays dead
    }

    if (hoursSinceLastFeed > interval * 3) {
        return HealthStatusEnum.Dead;
    }

    if (hoursSinceLastFeed > interval * 2) {
        return HealthStatusEnum.Critical;
    }

    if (hoursSinceLastFeed > interval) {
        return HealthStatusEnum.Normal;
    }

    return fish.health;  // Maintain current health if within feeding interval
}

export const updateFishHealthByFeeding = (fish: IFish, currentTime: Date): HealthStatusEnum => {
    const hoursSinceLastFeed = (currentTime.getTime() - fish.feedingSchedule.lastFeedFullTime.getTime()) / (1000 * 60 * 60);
    const wasHungry = hoursSinceLastFeed > fish.feedingSchedule.intervalInHours;
    if (wasHungry) {
        // Improve health by one step if hungry
        switch (fish.health) {
            case HealthStatusEnum.Dead:
                return HealthStatusEnum.Dead; // Dead fish stays dead
            case HealthStatusEnum.Critical:
                return HealthStatusEnum.Normal;
            case HealthStatusEnum.Normal:
                return HealthStatusEnum.Healthy;
            case HealthStatusEnum.Healthy:
                return HealthStatusEnum.Healthy;
            default:
                return fish.health;
        }
    } else {
        // Decrease health by one step if not hungry (overfeeding)
        switch (fish.health) {
            case HealthStatusEnum.Dead:
                return HealthStatusEnum.Dead;
            case HealthStatusEnum.Critical:
                return HealthStatusEnum.Dead;
            case HealthStatusEnum.Normal:
                return HealthStatusEnum.Critical;
            case HealthStatusEnum.Healthy:
                return HealthStatusEnum.Normal;
            default:
                return fish.health;
        }
    }
}

export const getMealCount = (fish: IFish): string => {
    const mealCount = Math.round(24 / fish.feedingSchedule.intervalInHours);
    const fishWeight = fish.weight;
    const feedPerGram = 0.01;

    const totalFeedPerDay = fishWeight * feedPerGram;
    const feedAmountPerInterval = totalFeedPerDay / mealCount;
    return `${Number(feedAmountPerInterval.toFixed(4))}g x ${mealCount} times`;
}