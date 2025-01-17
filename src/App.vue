<script setup lang="ts">
import VAquarium from '@/components/VAquarium.vue'
import { onMounted } from 'vue'
import { useFishStore } from './stores/fish'
import VFishList from './components/VFishList.vue'
import VLoading from './components/ui/VLoading.vue'

const fishStore = useFishStore()

const tableHeaders = [
  { key: 'name', label: 'Fish Name' },
  { key: 'type', label: 'Type' },
  { key: 'weight', label: 'Weight'},
  { key: 'lastFeed', label: 'Last Feed' },
  { key: 'health', label: 'Health' },
  {key: 'actions', label: 'Actions'}
]


onMounted(() => {
  fishStore.getFishList()
})
</script>

<template>
  <template v-if="fishStore.isLoading">
    <VLoading />
  </template>
  <template v-else>
    <VAquarium />
    <VFishList :headers="tableHeaders" :data="fishStore.fishList" />
  </template>
</template>
