import {
  fishTypeToImageSelector,
  getHealthStatusText,
  getHealthStatusColor,
  calculateTimeDifferenceInMinutes,
  formatTimeDifference,
  getMealCount
} from '@/util/fishUtils'
import { HealthStatusEnum, type IFish } from '@/types/fish'
import { FEED_PER_GRAM, HOURS } from '@/constants/fish-constants'
import { describe, expect, test } from 'vitest'

describe('fishUtils', () => {
  describe('fishTypeToImageSelector', () => {
    test('should return correct image path for each fish type', () => {
      expect(fishTypeToImageSelector('Goldfish')).toBe('/images/goldfish.png')
      expect(fishTypeToImageSelector('Betta')).toBe('/images/betta.png')
      expect(fishTypeToImageSelector('Angelfish')).toBe('/images/angelfish.png')
      expect(fishTypeToImageSelector('Guppy')).toBe('/images/guppy.png')
      expect(fishTypeToImageSelector('Oscar')).toBe('/images/oscar.png')
      expect(fishTypeToImageSelector('Unknown')).toBe('/images/goldfish.png')
    })
  })

  describe('getHealthStatusText', () => {
    test('should return correct status text', () => {
      expect(getHealthStatusText(HealthStatusEnum.DEAD)).toBe('Dead')
      expect(getHealthStatusText(HealthStatusEnum.CRITICAL)).toBe('Critical')
      expect(getHealthStatusText(HealthStatusEnum.NORMAL)).toBe('Normal')
      expect(getHealthStatusText(HealthStatusEnum.HEALTHY)).toBe('Healthy')
    })
  })

  describe('getHealthStatusColor', () => {
    test('should return correct color for each status', () => {
      expect(getHealthStatusColor(HealthStatusEnum.DEAD)).toBe('error')
      expect(getHealthStatusColor(HealthStatusEnum.CRITICAL)).toBe('purple')
      expect(getHealthStatusColor(HealthStatusEnum.HEALTHY)).toBe('success')
      expect(getHealthStatusColor(HealthStatusEnum.NORMAL)).toBe('warning')
    })
  })

  describe('calculateTimeDifferenceInMinutes', () => {
    test('should calculate correct time difference in minutes', () => {
      const current = new Date('2024-03-10T10:00:00')
      const past = new Date('2024-03-10T09:30:00')
      expect(calculateTimeDifferenceInMinutes(current, past)).toBe(30)
    })
  })

  describe('formatTimeDifference', () => {
    test('should format time difference correctly', () => {
      const tests = [
        {
          current: new Date('2024-03-10T10:30:00'),
          last: new Date('2024-03-10T09:00:00'),
          expected: '1 hour 30 minutes'
        },
        {
          current: new Date('2024-03-10T10:31:00'),
          last:    new Date('2024-03-10T10:30:00'),
          expected: '1 minute'
        },
        {
          current: new Date('2024-03-10T10:30:00'),
          last: new Date('2024-03-10T10:00:00'),
          expected: '30 minutes'
        },
        {
          current: new Date('2024-03-10T11:00:00'),
          last: new Date('2024-03-10T10:00:00'),
          expected: '1 hour'
        }
      ]

      tests.forEach(test => {
        expect(formatTimeDifference(test.current, test.last)).toBe(test.expected)
      })
    })
  })

  describe('getMealCount', () => {
    test('should calculate correct meal count and amount', () => {
      const fish:IFish = {
        id: '1',
        name: 'Goldie',
        weight: 10,
        fishImage: '/images/goldfish.png',
        health:1,
        type: 'Goldfish',
        feedingSchedule: {
          intervalInHours: 4,
          healthScheduleTime: new Date('2024-03-10T10:00:00'),
          lastFeed:'12:00',
          lastFeedFullTime: new Date('2024-03-10T12:00:00')
        }
      }
      const mealCount = Math.round(HOURS / fish.feedingSchedule.intervalInHours)
      const totalFeedPerDay = fish.weight * FEED_PER_GRAM
      const expectedAmount = (totalFeedPerDay / mealCount).toFixed(3)

      expect(getMealCount(fish)).toBe(`${expectedAmount}g x ${mealCount} times`)
    })
  })
})
