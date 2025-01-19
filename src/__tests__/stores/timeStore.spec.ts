import { useTimeStore } from '@/stores/timeStore'
import { afterEach } from 'node:test'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('TimeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('initializes with default values', () => {
    const store = useTimeStore()
    expect(store.timeSpeed).toBe(1)
    expect(store.currentDateTime).toBeInstanceOf(Date)
  })

  test('formats date time correctly', () => {
    const store = useTimeStore()
    const testDate = new Date('2024-03-15 14:30:45')
    store.currentDateTime = testDate
    expect(store.formattedDateTime).toBe('15/03/2024, 14:30:45')
  })

  test('updates time speed', () => {
    const store = useTimeStore()
    store.setTimeSpeed(2)
    expect(store.timeSpeed).toBe(2)
  })

  test('updates time according to speed', () => {
    const store = useTimeStore()
    const initialTime = store.currentDateTime.getTime()

    store.setTimeSpeed(2)
    vi.advanceTimersByTime(1000)

    const newTime = store.currentDateTime.getTime()
    expect(newTime - initialTime).toBe(2000) // 2 seconds difference due to 2x speed
  })
})
