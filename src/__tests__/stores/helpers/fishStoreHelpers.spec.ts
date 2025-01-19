import { FEED_TOLERANCE_MINUTES, MINUTES } from '@/constants/fish-constants';
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish';
import {
  createLastFeedTime,
  mapFishResponse,
  shouldUpdateFishHealth,
  updateFishHealth,
  checkFishHealthByTime
} from '@/stores/helpers/fishStoreHelpers';
import { describe, expect, test } from 'vitest';

describe('fishStoreHelpers', () => {

  describe('createLastFeedTime', () => {
    test('should create correct feed time for same day', () => {
      const currentDate = new Date('2024-03-20T15:00:00');
      const result = createLastFeedTime('14:30', currentDate);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getDate()).toBe(currentDate.getDate());
    });
  });

  describe('mapFishResponse', () => {

    const mockFishResponse: IFishResponse = {
      id: '1',
      name: 'Nemo',
      type: 'clownfish',
      weight: 10,
      feedingSchedule: {
        lastFeed: '14:30',
        intervalInHours: 4
      }
    };

    test('should map fish response correctly', () => {
      const currentDate = new Date('2024-03-20T15:00:00');
      const result = mapFishResponse(mockFishResponse, currentDate);
      expect(result.id).toBe(mockFishResponse.id);
      expect(result.health).toBe(HealthStatusEnum.HEALTHY);
    });
  });

  describe('shouldUpdateFishHealth', () => {

    test('should return true when outside tolerance window', () => {
      const result = shouldUpdateFishHealth(120, 100, FEED_TOLERANCE_MINUTES);
      expect(result).toBe(true);
    });

    test('should return false when within tolerance window', () => {
      const result = shouldUpdateFishHealth(80, 100, FEED_TOLERANCE_MINUTES);
      expect(result).toBe(false);
    });
  });

  describe('updateFishHealth', () => {
    test('should decrease health when hungry', () => {
      const wasHungry = false;
      expect(updateFishHealth(HealthStatusEnum.HEALTHY, wasHungry))
        .toBe(HealthStatusEnum.HEALTHY - 1);
    });

    test('should increase health when fed and not healthy', () => {
      const wasHungry = true;
      expect(updateFishHealth(HealthStatusEnum.CRITICAL, wasHungry))
        .toBe(HealthStatusEnum.CRITICAL + 1);
    });

    test('should not increase health beyond healthy', () => {
      const wasHungry = true;
      expect(updateFishHealth(HealthStatusEnum.HEALTHY, wasHungry))
        .toBe(HealthStatusEnum.HEALTHY);
    });
  });

  describe('checkFishHealthByTime', () => {
    const mockFish: IFish = {
      id: '1',
      name: 'Nemo',
      type: 'clownfish',
      health: HealthStatusEnum.HEALTHY,
      weight: 10,
      fishImage: 'clownfish.png',
      feedingSchedule: {
        lastFeed: '14:30',
        intervalInHours: 4,
        lastFeedFullTime: new Date(),
        healthScheduleTime: new Date()
      }
    };

    test('should maintain dead status', () => {
      const deadFish = { ...mockFish, health: HealthStatusEnum.DEAD };
      const result = checkFishHealthByTime(deadFish, new Date());
      expect(result).toBe(HealthStatusEnum.DEAD);
    });

    test('should decrease health when overdue feeding', () => {
      const currentTime = new Date();
      mockFish.feedingSchedule.healthScheduleTime = new Date(
        currentTime.getTime() - (mockFish.feedingSchedule.intervalInHours * MINUTES + FEED_TOLERANCE_MINUTES + 1) * 60 * 1000
      );
      const result = checkFishHealthByTime(mockFish, currentTime);
      expect(result).toBeLessThan(HealthStatusEnum.HEALTHY);
    });
  });
});
