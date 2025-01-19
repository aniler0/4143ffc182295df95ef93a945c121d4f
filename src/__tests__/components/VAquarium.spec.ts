import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { HealthStatusEnum } from '@/types/fish'
import VAquarium from '@/components/VAquarium.vue'

describe('VAquarium', () => {
  const currentDateTime = new Date()
  const mockFish = {
    id: '1',
    name: 'Test Fish',
    type: 'Salmon',
    weight: 100,
    health: HealthStatusEnum.HEALTHY,
    feedingSchedule: {
      lastFeedFullTime: currentDateTime,
      healthScheduleTime: currentDateTime,
      intervalInHours: 24
    }
  }
  const mockFish2 = {
    id: '2',
    name: 'Test Fish 2',
    type: 'Salmon',
    weight: 100,
    health: HealthStatusEnum.HEALTHY,
    feedingSchedule: {
      lastFeedFullTime: currentDateTime,
      healthScheduleTime: currentDateTime,
      intervalInHours: 24
    }
  }

  const createWrapper = () => {
    return mount(VAquarium, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            fish: { fishList: [mockFish,mockFish2] }
          }
        })]
      }
    })
  }

  test('renders aquarium component', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.aquarium').exists()).toBe(true)
  })

  test('renders fish components for each fish in store', () => {
    const wrapper = createWrapper()
    expect(wrapper.findAllComponents({ name: 'VFish' })).toHaveLength(2)
  })
})
