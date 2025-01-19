import { useFetch } from '@/composables/useFetch'
import { describe, expect, test } from 'vitest'

describe('useFetch', () => {
  const mockData = { id: 1, name: 'Test' }

  test('should fetch data successfully', async () => {
    global.fetch = async () => {
      return new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { data, error, isLoading, fetchData } = useFetch()
    const fetchPromise = fetchData('https://api.example.com/data')
    expect(isLoading.value).toBe(true)

    await fetchPromise

    expect(isLoading.value).toBe(false)
    expect(data.value).toEqual(mockData)
    expect(error.value).toBeNull()
  })

  test('should handle fetch error', async () => {
    global.fetch = async () => {
      throw new Error('Fetch failed')
    }
    const { data, error, isLoading, fetchData } = useFetch()

    await fetchData('https://api.example.com/data')

    expect(isLoading.value).toBe(false)
    expect(data.value).toBeUndefined()
    expect(error.value).instanceOf(Error)
    expect(error.value?.message).toBe('Fetch failed')
  })
})
