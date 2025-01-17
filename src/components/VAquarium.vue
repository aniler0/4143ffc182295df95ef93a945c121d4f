<script setup lang="ts">
import VAquariumBubbles from '@/components/VAquariumBubbles.vue'
import VFish from '@/components/VFish.vue'
import { useFishStore } from '@/stores/fishStore'

const fishStore = useFishStore()
</script>

<template>
  <div class="aquarium-container">
    <div class="aquarium">
      <VAquariumBubbles />
      <template v-for="(item, index) in fishStore.fishList" :key="index">
        <div>
          <VFish :fish="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.aquarium-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

.aquarium {
  position: relative;
  width: 100%;
  height: 500px;
  background: linear-gradient(180deg, #a2d2ff 0%, #4895ef 100%);
  border-radius: 20px;
  border: 15px solid #333;
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.2),
    0 0 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
