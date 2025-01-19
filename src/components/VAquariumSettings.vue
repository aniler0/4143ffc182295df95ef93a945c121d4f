<template>
  <div class="aquarium-settings">
    <a-row justify="center">
      <a-col span="24" style="max-width: 1200px;">
        <div class="settings-group">
          <a-row justify="space-between">
            <a-col :span="12">
              <h1>Time of Aquarium</h1>
              <h3>{{ timeStore.formattedDateTime }}</h3>
            </a-col>
            <a-col :span="12">
              <a-row type="flex" justify="end" align="middle">
                <a-select
                  v-model:value="timeStore.timeSpeed"
                  style="width: 120px; margin: 8px 0"
                  @change="timeStore.setTimeSpeed"
                >
                  <a-select-option :value="1">1x Speed</a-select-option>
                  <a-select-option :value="60">60x Speed</a-select-option>
                  <a-select-option :value="120">120x Speed</a-select-option>
                  <a-select-option :value="3600">3600x Speed</a-select-option>
                </a-select>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useTimeStore } from '@/stores/timeStore'

const timeStore = useTimeStore()
</script>

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
