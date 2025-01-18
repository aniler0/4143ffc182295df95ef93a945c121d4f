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
    feedingSchedule: FeedingSchedule & { lastFeedFullTime: Date }
    health: number
}

export enum HealthStatusEnum {
    Critical = 0,
    Normal = 1,
    Healty = 2,
}

export interface FeedingSchedule {
    lastFeed: string
    intervalInHours: number
}
