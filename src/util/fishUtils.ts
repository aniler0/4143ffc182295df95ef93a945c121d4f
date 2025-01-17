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

export function getLastFeedTimeFormatted(lastFeedTime: string, currentDateTime: Date): string {
    const [hours, minutes] = lastFeedTime.split(':').map(Number)

    const feedDate = new Date(currentDateTime)
    feedDate.setHours(hours, minutes)

    if (feedDate > currentDateTime) {
        feedDate.setDate(feedDate.getDate() - 1)
    }

    const diffInMinutes = Math.floor((currentDateTime.getTime() - feedDate.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes`
    }

    // Calculate total hours, rounding up
    const totalHours = Math.ceil(diffInMinutes / 60)
    return `${totalHours} hours`
}

export function formatTimeDifference(currentTime: Date, lastFeedTime: Date): string {
    const diffInMinutes = Math.floor(
        (currentTime.getTime() - lastFeedTime.getTime()) / (1000 * 60)
    )

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes`
    }

    const totalHours = Math.ceil(diffInMinutes / 60)
    return `${totalHours} hours`
}