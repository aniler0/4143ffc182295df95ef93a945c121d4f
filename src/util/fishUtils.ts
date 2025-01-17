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

export function getTimePassed(lastFeedTime: string): string {
    const [hour, minute] = lastFeedTime.split(':').map(Number)
    const today = new Date()
    const lastFeed = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hour,
        minute
    )

    const now = new Date()
    const diffInMs = now.getTime() - lastFeed.getTime()

    const hours = Math.floor(diffInMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }
    return `${minutes}m`

}