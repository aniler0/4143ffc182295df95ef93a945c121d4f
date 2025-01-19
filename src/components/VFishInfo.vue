<script setup lang="ts">
import { Button, Card, Divider, Tag, Typography } from 'ant-design-vue'

import { useFishStore } from '@/stores/fishStore'
import { useTimeStore } from '@/stores/timeStore'
import { HealthStatusEnum, type IFish } from '@/types/fish'
import { formatTimeDifference, getHealthStatusColor, getHealthStatusText } from '@/util/fishUtils'

const { Title, Text } = Typography
const timeStore = useTimeStore()
const fishStore = useFishStore()

interface Props {
  fish: IFish
}

const props = defineProps<Props>()

const handleFeed = () => {
  fishStore.feedFish(props.fish.id)
}
</script>

<template>
  <div class="fish-info-container">
    <Card size="small" :bordered="true">
      <template #title>
        <div class="card-header">
          <Title :level="5" style="margin: 0">{{ fish.name }}</Title>
        </div>
      </template>

      <div class="info-row">
        <Text>Weight:</Text>
        <Text>{{ fish.weight }}g</Text>
      </div>

      <div class="info-row">
        <Text>Health:</Text>
        <Tag :color="getHealthStatusColor(fish.health)">
          {{ getHealthStatusText(fish.health) }}
        </Tag>
      </div>

      <Divider style="margin: 12px 0" />

      <div class="feeding-section">
        <Title :level="5">Feeding</Title>
        <Text type="secondary">
          Last fed
          {{
            formatTimeDifference(timeStore.currentDateTime, fish.feedingSchedule.lastFeedFullTime)
          }}
          ago
        </Text>
      </div>

      <Button
        type="primary"
        block
        @click="handleFeed"
        :disabled="fish.health === HealthStatusEnum.DEAD"
      >
        Feed
      </Button>
    </Card>
  </div>
</template>

<style scoped>
.fish-info-container {
  width: 180px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.feeding-section {
  margin-bottom: 12px;
}

:deep(.ant-card-head) {
  min-height: auto;
  padding: 8px 12px;
}

:deep(.ant-card-body) {
  padding: 12px;
}

:deep(.ant-input-number) {
  width: 80px;
}
:deep(.ant-tag) {
  margin-inline-end: 0;
}
</style>
