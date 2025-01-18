import { ref } from 'vue'

export function useFetch<T>() {
  const data = ref<T | null>()
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  const fetchData = async (url: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      data.value = [
        {
          "id": 1,
          "type": "Goldfish",
          "name": "Goldy",
          "weight": 100,
          "feedingSchedule": {
            "lastFeed": "18:00",
            "intervalInHours": 6
          }
        },
        {
          "id": 2,
          "type": "Betta",
          "name": "Blue Fighter",
          "weight": 50,
          "feedingSchedule": {
            "lastFeed": "18:00",
            "intervalInHours": 5
          }
        },
        {
          "id": 3,
          "type": "Guppy",
          "name": "Swifty",
          "weight": 20,
          "feedingSchedule": {
            "lastFeed": "18:00",
            "intervalInHours": 4
          }
        },
        {
          "id": 4,
          "type": "Oscar",
          "name": "Titan",
          "weight": 300,
          "feedingSchedule": {
            "lastFeed": "18:00",
            "intervalInHours": 8
          }
        },
        {
          "id": 5,
          "type": "Angelfish",
          "name": "Grace",
          "weight": 150,
          "feedingSchedule": {
            "lastFeed": "18:00",
            "intervalInHours": 5
          }
        }
      ] as unknown as T

    } catch (e) {
      error.value = e as Error
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    error,
    isLoading,
    fetchData
  }
}