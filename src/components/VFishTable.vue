<script setup lang="ts">
import { useFishStore } from '@/stores/fishStore'
import { useTimeStore } from '@/stores/timeStore'
import { formatTimeDifference, getHealthStatusText } from '@/util/fishUtils'
import { computed } from 'vue'

const fishStore = useFishStore()
const timeStore = useTimeStore()

const columns = [
  {
    title: 'Fish Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Last Feed',
    dataIndex: 'lastFeed',
    key: 'lastFeed',
  },
  {
    title: 'Health',
    dataIndex: 'health',
    key: 'health',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
]

const getTimeDifference = computed(() => {
  return (lastFeedFullTime: Date) =>
    formatTimeDifference(timeStore.currentDateTime, lastFeedFullTime)
})

</script>

<template>
  <a-table :dataSource="fishStore.fishList" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-if="column.key === 'type'">
        {{ record.type }}
      </template>
      <template v-if="column.key === 'weight'"> {{ record.weight }}g </template>
      <template v-if="column.key === 'lastFeed'">
        {{ getTimeDifference(record.feedingSchedule.lastFeedFullTime) }} ago
      </template>
      <template v-if="column.key === 'health'">
        {{ getHealthStatusText(record.health) }}
      </template>
      <template v-if="column.key === 'actions'">
        <a-button type="primary" @click="fishStore.feedFish(record.id)">Feed</a-button>
      </template>
    </template>
  </a-table>
</template>
