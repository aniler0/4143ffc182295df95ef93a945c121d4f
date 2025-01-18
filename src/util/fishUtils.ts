import { HealthStatusEnum } from "@/types/fish"

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

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes`
    }

    const totalHours = Math.ceil(diffInMinutes / 60)
    return `${totalHours} hours`
}