import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HealthStatusEnum, type IFish, type IFishResponse } from '@/types/fish'
import { useFetch } from '@/composables/useFetch'

export const useFishStore = defineStore('fish', () => {
  const fishList = ref<IFish[]>([])
  const { data, error, isLoading, fetchData } = useFetch<IFishResponse[]>()

  const getFishList = async () => {
    await fetchData('https://run.mocky.io/v3/e80be173-df55-404b-833b-670e53a4743d')
    if (data.value) {
      fishList.value = data.value.map(fish => ({
        ...fish,
        health: HealthStatusEnum.Healty // or any other default
      }))
    }
  }

  return { fishList, isLoading, error, getFishList }
})
