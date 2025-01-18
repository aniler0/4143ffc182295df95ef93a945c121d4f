<script setup lang="ts">
import { useFishStore } from '@/stores/fishStore'
import { useTimeStore } from '@/stores/timeStore'
import type { IFish } from '@/types/fish'
import { checkFishHealthByTime, formatTimeDifference, getHealthStatusText, getMealCount } from '@/util/fishUtils'
import { watch } from 'vue'

const fishStore = useFishStore()
const timeStore = useTimeStore()

const columns = [
  {
    title: 'Fish Name',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '15%',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    width: '15%',
  },
  {
    title: 'Last Feed',
    dataIndex: 'lastFeed',
    key: 'lastFeed',
    width: '20%',
  },
  {
    title: 'Health',
    dataIndex: 'health',
    key: 'health',
    width: '15%',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: '15%',
  },
]

const onClickFeed = (fish: IFish) => {
  fishStore.feedFish(fish.id)
}

watch(
  () => timeStore.currentDateTime,
  (newTime) => {
    fishStore.fishList = fishStore.fishList.map((fish: IFish) => ({
      ...fish,
      health: checkFishHealthByTime(fish, newTime),
    }))
  },
)
</script>

<template>
  <a-table :dataSource="fishStore.fishList" :columns="columns" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <p>
          {{ record.name }}
        </p>
      </template>
      <template v-if="column.key === 'type'">
        {{ record.type }}
      </template>
      <template v-if="column.key === 'weight'"> {{ record.weight }}g </template>
      <template v-if="column.key === 'lastFeed'">
        <p>
          {{
            formatTimeDifference(timeStore.currentDateTime, record.feedingSchedule.lastFeedFullTime)
          }}
          ago
        </p>
      </template>
      <template v-if="column.key === 'health'">
        {{ getHealthStatusText(record.health) }}
      </template>
      <template v-if="column.key === 'actions'">
        <p>{{ getMealCount(record) }}</p>
        <a-button type="primary" @click="onClickFeed(record)">Feed</a-button>
      </template>
    </template>
  </a-table>
</template>
