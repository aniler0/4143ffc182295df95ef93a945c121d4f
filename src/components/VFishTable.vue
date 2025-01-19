<script setup lang="ts">
import { Button, Row, Table, Tag, Typography } from 'ant-design-vue'
import { watch } from 'vue'

import { TABLE_COLUNMNS } from '@/constants/fish-table-constants'
import { useFishStore } from '@/stores/fishStore'
import { useTimeStore } from '@/stores/timeStore'
import { HealthStatusEnum, type IFish } from '@/types/fish'
import {
  checkFishHealthByTime,
  formatTimeDifference,
  getHealthStatusColor,
  getHealthStatusText,
  getMealCount,
} from '@/util/fishUtils'

const { Text } = Typography
const fishStore = useFishStore()
const timeStore = useTimeStore()

const onClickFeed = (fish: IFish) => {
  fishStore.feedFish(fish.id)
}

watch(
  () => timeStore.currentDateTime,
  (newTime) => {
    fishStore.fishList = fishStore.fishList.map((fish: IFish) => {
      return {
        ...fish,
        health: checkFishHealthByTime(fish, newTime),
      }
    })
  },
)
</script>

<template>
  <Table :dataSource="fishStore.fishList" :columns="TABLE_COLUNMNS" :pagination="false">
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
        <Text>
          {{
            formatTimeDifference(timeStore.currentDateTime, record.feedingSchedule.lastFeedFullTime)
          }}
          ago
        </Text>
      </template>
      <template v-if="column.key === 'health'">
        <Tag :color="getHealthStatusColor(record.health)">
          {{ getHealthStatusText(record.health) }}
        </Tag>
      </template>
      <template v-if="column.key === 'actions'">
        <Row justify="space-between" align="middle">
          <Button
            type="primary"
            @click="onClickFeed(record as IFish)"
            :disabled="record.health === HealthStatusEnum.DEAD"
            >Feed</Button
          >
          <span>({{ getMealCount(record as IFish) }})</span>
        </Row>
      </template>
    </template>
  </Table>
</template>
