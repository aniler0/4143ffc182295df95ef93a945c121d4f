export interface IFishResponse {
    id: string
    type: string
    name: string
    weight: number
    feedingSchedule: FeedingSchedule
}

export interface IFish {
    id: string
    type: string
    fishImage: string
    name: string
    weight: number
    feedingSchedule: FeedingSchedule & { lastFeedFullTime: Date, healthScheduleTime: Date }
    health: number
}

export enum HealthStatusEnum {
    DEAD = -1,
    CRITICAL = 0,
    NORMAL = 1,
    HEALTHY = 2,
}

export interface FeedingSchedule {
    lastFeed: string
    intervalInHours: number
}
