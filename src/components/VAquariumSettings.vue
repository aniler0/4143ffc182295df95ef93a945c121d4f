<script setup lang="ts">
import { useTimeStore } from '@/stores/timeStore'
import { Col, Row, Select, SelectOption, Typography } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/select'

const { Text } = Typography
const timeStore = useTimeStore()

const onChangeTimeSpeed = (value: SelectValue) => {
  timeStore.setTimeSpeed(value as number)
}
</script>
<template>
  <div class="aquarium-settings">
    <Row justify="center">
      <Col span="24" style="max-width: 1200px">
        <div class="settings-group">
          <Row justify="space-between">
            <Col :span="12">
              <Col>
                <Text strong>Time of Aquarium</Text>
              </Col>
              <Col
                ><Text test-id="formatted-time-test">{{ timeStore.formattedDateTime }}</Text>
              </Col>
            </Col>
            <Col :span="12">
              <Row type="flex" justify="end" align="middle">
                <Select
                  test-id="time-speed-select"
                  v-model:value="timeStore.timeSpeed"
                  style="width: 140px; margin: 8px 0"
                  @change="onChangeTimeSpeed"
                >
                  <SelectOption :value="1">1x Speed</SelectOption>
                  <SelectOption :value="60">60x Speed</SelectOption>
                  <SelectOption :value="120">120x Speed</SelectOption>
                  <SelectOption :value="3600">3600x Speed</SelectOption>
                </Select>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
</template>
<style scoped>
.aquarium-settings {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}
h1 {
  font-size: 1rem;
  font-weight: bold;
}
h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
