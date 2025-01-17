<script setup lang="ts">
import AquariumBase from '@/components/AquariumBase.vue'
import VTable from '@/components/ui/VTable.vue'
const fishData = [
  {
    name: 'Goldfish',
    type: 'Freshwater',
    weight: '0.5kg',
    lastFeed: '2 days ago',
    health: 'Good',
  },
  {
    name: 'Betta',
    type: 'Freshwater',
    weight: '0.1kg',
    lastFeed: '1 day ago',
    health: 'Good',
  },
  {
    name: 'Clownfish',
    type: 'Saltwater',
    weight: '0.3kg',
    lastFeed: '3 days ago',
    health: 'Good',
  },
  {
    name: 'Koi',
    type: 'Freshwater',
    weight: '1kg',
    lastFeed: '4 days ago',
    health: 'Good',
  },
  {
    name: 'Tang',
    type: 'Saltwater',
    weight: '0.8kg',
    lastFeed: '2 days ago',
    health: 'Good',
  },
]

const tableHeaders = [
  { key: 'name', label: 'Fish Name' },
  { key: 'type', label: 'Type' },
  { key: 'weight', label: 'Weight' },
  { key: 'lastFeed', label: 'Last Feed' },
  { key: 'health', label: 'Health' },
]

const handleAction = (item: Record<string, string>) => {
  console.log(item)
}
</script>

<template>
  <AquariumBase />
  <VTable
    :headers="tableHeaders"
    :data="fishData"
    :actions="[{ label: 'Feed' }]"
    @action="handleAction"
  />
</template>
