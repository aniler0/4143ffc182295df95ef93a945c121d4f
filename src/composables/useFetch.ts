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
      data.value = await response.json()
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
