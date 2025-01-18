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
    Dead = -1,
    Critical = 0,
    Normal = 1,
    Healthy = 2,
}

export interface FeedingSchedule {
    lastFeed: string
    intervalInHours: number
}
