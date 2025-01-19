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
        <VFish :fish="item" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.aquarium-container {
  margin-top: 6rem;
  min-height: 600px;
}

.aquarium {
  position: relative;
  width: 100%;
  height: 550px;
  background-image: url('/images/aquarium-background.jpg');
  background-size: cover;
  background-position: center 30%;
  border-radius: 20px;
  border: 15px solid #4a4a4a;
  box-shadow:
    inset 0 0 50px rgba(255, 255, 255, 0.2),
    0 0 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>
