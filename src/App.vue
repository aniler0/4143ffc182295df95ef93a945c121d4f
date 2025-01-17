<script setup lang="ts">
import VAquarium from '@/components/VAquarium.vue'
import { onMounted } from 'vue'
import { useFishStore } from './stores/fish'
import VFishList from './components/VFishList.vue'
import VLoading from './components/ui/VLoading.vue'
import VAquariumSettings from './components/VAquariumSettings.vue'

const fishStore = useFishStore()

onMounted(() => {
  fishStore.getFishList()
})
</script>

<template>
  <template v-if="fishStore.isLoading">
    <VLoading />
  </template>
  <template v-else>
    <VAquariumSettings />
    <VAquarium />
    <VFishList />
  </template>
</template>
