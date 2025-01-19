import VAquariumSettings from '@/components/VAquariumSettings.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

describe('VAquariumSettings', () => {
  const mockDateTime = new Date('2024-01-01T12:00:00')
  const mockFormattedDateTime = '01/01/2024, 12:00:00'

  const createWrapper = (initialTimeSpeed = 1) => {
    return mount(VAquariumSettings, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            time: {
              currentDateTime: mockDateTime,
              formattedDateTime: mockFormattedDateTime,
              timeSpeed: initialTimeSpeed
            }
          }
        })]
      }
    })
  }

  test('renders aquarium settings component', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.aquarium-settings').exists()).toBe(true)
  })

  test('displays current time correctly', () => {
    const wrapper = createWrapper()
    const timeText = wrapper.find('[test-id="formatted-time-test"]')
    expect(timeText.text()).toBe(mockFormattedDateTime)
  })
})
