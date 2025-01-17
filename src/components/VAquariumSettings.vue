<template>
  <div class="aquarium-settings">
    <div class="settings-group">
      <a-row>
        <a-col :span="12">
          <h1>Time of Aquarium</h1>
          <h3>{{ timeStore.formattedDateTime }}</h3>
        </a-col>
        <a-col :span="12">
          <a-row justify="end">
            <a-select
              v-model:value="timeStore.timeSpeed"
              style="width: 120px"
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
  </div>
</template>

<script setup lang="ts">
import { useTimeStore } from '@/stores/time'

const timeStore = useTimeStore()
</script>

<style scoped>
h1 {
  font-size: 1rem;
  font-weight: bold;
}
h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
