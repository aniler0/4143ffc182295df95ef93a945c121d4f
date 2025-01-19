import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { useFishStore } from '@/stores/fishStore'
import { useTimeStore } from '@/stores/timeStore'

// Mock current time
const MOCK_CURRENT_DATE = new Date('2024-03-10T12:00:00Z')

// Mock the useFetch composable
vi.mock('@/composables/useFetch', () => ({
  useFetch: () => ({
    data: { value: mockFishResponse },
    error: { value: null },
    isLoading: { value: false },
    fetchData: vi.fn()
  })
}))

const mockFishResponse = [
  {
    id: '1',
    name: 'Nemo',
    type: 'Clownfish',
    weight: 0.5,
    feedingSchedule: {
      intervalInHours: 24,
      lastFeed: '16:00',
      lastFeedFullTime: '2024-03-10T10:00:00Z',
      healthScheduleTime: '2024-03-10T10:00:00Z'
    }
  }
]

describe('FishStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    const timeStore = useTimeStore()
    timeStore.currentDateTime = MOCK_CURRENT_DATE
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should initialize with empty fish list', () => {
    const store = useFishStore()
    expect(store.fishList).toEqual([])
  })

  test('should fetch and map fish list', async () => {
    const store = useFishStore()
    await store.getFishList()
    expect(store.fishList).toHaveLength(1)
    expect(store.fishList[0].name).toBe('Nemo')
    expect(store.fishList[0].health).toBe(2)
  })

  test('should maintain fish health when feeding outside tolerance and acceptable meal amount', () => {
    const store = useFishStore()
    const timeStore = useTimeStore()
    timeStore.currentDateTime = new Date('2024-03-11T12:00:00Z')

    store.fishList = [{
      id: '1',
      name: 'Nemo',
      type: 'Clownfish',
      fishImage: 'clownfish.png',
      weight: 100,
      feedingSchedule: {
        intervalInHours: 24,
        lastFeed: '16:00',
        lastFeedFullTime: new Date('2024-03-10T10:00:00Z'),
        healthScheduleTime: new Date('2024-03-10T10:00:00Z')
      },
      health: 2
    }]
    store.feedFish('1', 0.125)
  })

  test('should decrease fish health when feeding within tolerance', () => {
    const store = useFishStore()
    store.fishList = [{
      id: '1',
      name: 'Nemo',
      type: 'Clownfish',
      fishImage: 'clownfish.png',
      weight: 0.5,
      feedingSchedule: {
        intervalInHours: 24,
        lastFeed: '16:00',
        lastFeedFullTime: new Date('2024-03-10T11:30:00Z'),
        healthScheduleTime: new Date('2024-03-10T11:30:00Z')
      },
      health: 2
    }]

    store.feedFish('1',2)
    expect(store.fishList[0].health).toBe(1)
  })
})
