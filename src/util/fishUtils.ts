import { HealthStatusEnum } from "@/types/fish"

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