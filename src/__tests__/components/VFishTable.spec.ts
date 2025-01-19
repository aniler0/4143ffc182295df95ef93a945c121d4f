import VFishTable from '@/components/VFishTable.vue'
import { HealthStatusEnum } from '@/types/fish'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

describe('VFishTable', () => {
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

  const createWrapper = () => {
    return mount(VFishTable, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            fish: { fishList: [mockFish] },
            time: { currentDateTime }
          }
        })]
      }
    })
  }

  test('renders fish table component correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.isVisible()).toBe(true)
  })


  test('updates fish list with health status', () => {
    const wrapper = createWrapper()
    const tag = wrapper.find('.ant-tag')
    expect(tag.exists()).toBe(true)
    expect(tag.text()).toContain('Healthy')
  })
})
