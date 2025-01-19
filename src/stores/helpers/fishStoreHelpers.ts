// src/stores/helpers/fishStoreHelpers.ts

import { FEED_TOLERANCE_MINUTES, MINUTES } from '@/constants/fish-constants';
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish';
import { fishTypeToImageSelector } from '@/util/fishUtils';

/**
 * Creates a Date object for the last feeding time
 */
export function createLastFeedTime(feedTime: string, currentDate: Date): Date {
  const [hours, minutes] = feedTime.split(':').map(Number);
  const lastFeedTime = new Date(currentDate);
  lastFeedTime.setHours(hours, minutes);

  if (lastFeedTime > currentDate) {
    lastFeedTime.setDate(lastFeedTime.getDate() - 1);
  }

  return lastFeedTime;
}

/**
 * Maps API response to Fish model
 */
export function mapFishResponse(fish: IFishResponse, currentDate: Date): IFish {
  const lastFeedFullTime = createLastFeedTime(fish.feedingSchedule.lastFeed, currentDate);

  const mappedFish: IFish = {
    ...fish,
    fishImage: fishTypeToImageSelector(fish.type),
    health: HealthStatusEnum.HEALTHY,
    feedingSchedule: {
      ...fish.feedingSchedule,
      lastFeedFullTime,
      healthScheduleTime: new Date(lastFeedFullTime)
    }
  };

  mappedFish.health = checkFishHealthByTime(mappedFish, currentDate);
  return mappedFish;
}

/**
 * Determines if fish health should be updated based on feeding schedule
 */
export function shouldUpdateFishHealth(
  minutesSinceLastFeed: number,
  intervalInMinutes: number,
  toleranceMinutes: number
): boolean {
  return minutesSinceLastFeed > (intervalInMinutes - toleranceMinutes);
}

/**
 * Updates fish health based on feeding status
 */
export function updateFishHealth(
  currentHealth: number,
  wasHungry: boolean
): number {
  if (wasHungry) {
    return currentHealth !== HealthStatusEnum.HEALTHY
      ? currentHealth + 1
      : currentHealth;
  }
  return currentHealth - 1;
}

/**
 * Checks fish health based on time since last feeding
 */
export function checkFishHealthByTime(fish: IFish, currentTime: Date): HealthStatusEnum {
  const minutesSinceLastFeed = (currentTime.getTime() - fish.feedingSchedule.healthScheduleTime.getTime()) / (1000 * 60);
  const intervalInMinutes = fish.feedingSchedule.intervalInHours * MINUTES;

  if (fish.health === HealthStatusEnum.DEAD) {
    return HealthStatusEnum.DEAD;  // Dead fish stays dead
  }

  if (minutesSinceLastFeed >= intervalInMinutes + FEED_TOLERANCE_MINUTES) {
    fish.feedingSchedule.healthScheduleTime = currentTime;
    fish.health -= 1;
  }

  return fish.health;
}
