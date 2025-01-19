<script setup lang="ts">
import { onMounted } from 'vue'

import VAquarium from '@/components/VAquarium.vue'
import VAquariumSettings from '@/components/VAquariumSettings.vue'
import VFishTable from '@/components/VFishTable.vue'
import VLoading from '@/components/ui/VLoading.vue'

import { useFishStore } from '@/stores/fishStore'

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
    <VFishTable />
  </template>
</template>
