<script setup lang="ts">
import { Button, InputNumber, Row, Table, Tag, Typography } from 'ant-design-vue'
import { computed, ref } from 'vue'

import { TABLE_COLUNMNS } from '@/constants/fish-table-constants'
import { useFishStore } from '@/stores/fishStore'
import { checkFishHealthByTime } from '@/stores/helpers/fishStoreHelpers'
import { useTimeStore } from '@/stores/timeStore'
import { HealthStatusEnum, type IFish } from '@/types/fish'
import {
  formatTimeDifference,
  getDailyMealCount,
  getHealthStatusColor,
  getHealthStatusText,
  getMealAmountPerInterval,
} from '@/util/fishUtils'

const { Text } = Typography
const fishStore = useFishStore()
const timeStore = useTimeStore()
const mealAmounts = ref(new Map<string, number>()) // New map to store amounts per fish

const onClickFeed = (fish: IFish) => {
  fishStore.feedFish(fish.id, getMealAmount(fish.id))
}

const updatedFishList = computed(() => {
  return fishStore.fishList.map((fish: IFish) => {
    // Initialize meal amount if not set
    if (!mealAmounts.value.has(fish.id)) {
      mealAmounts.value.set(fish.id, Number(getMealAmountPerInterval(fish)))
    }
    return {
      ...fish,
      health: checkFishHealthByTime(fish, timeStore.currentDateTime),
    }
  })
})

const getMealAmount = (fishId: string) => mealAmounts.value.get(fishId) || 0
const setMealAmount = (fishId: string, amount: number) => mealAmounts.value.set(fishId, amount)
</script>

<template>
  <Table :dataSource="updatedFishList" :columns="TABLE_COLUNMNS" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <Text>
          {{ record.name }}
        </Text>
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
        <Row
          type="flex"
          justify="center"
          align="middle"
          :style="{ gap: '8px', flexDirection: 'column' }"
        >
          <InputNumber
            :value="getMealAmount(record.id)"
            @update:value="(val) => setMealAmount(record.id, val as number)"
            :max="100"
            addon-after="g"
            placeholder="Enter grams"
            :disabled="record.health === HealthStatusEnum.DEAD"
            style="width: 100%"
          />
          <div>
            {{ getMealAmountPerInterval(record as IFish) }}g x
            {{ getDailyMealCount(record as IFish) }} times
          </div>
          <Button
            test-id="feed-button"
            type="primary"
            @click="onClickFeed(record as IFish)"
            :disabled="record.health === HealthStatusEnum.DEAD"
            style="width: 100%"
            >Feed</Button
          >
        </Row>
      </template>
    </template>
  </Table>
</template>
