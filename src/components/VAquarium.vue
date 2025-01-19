<script setup lang="ts">
import { Popover } from 'ant-design-vue'
import { ref } from 'vue'

import VAquariumBubbles from '@/components/VAquariumBubbles.vue'
import VFish from '@/components/VFish.vue'
import VFishInfo from '@/components/VFishInfo.vue'
import { useFishStore } from '@/stores/fishStore'

const fishStore = useFishStore()
const activePopoverFishId = ref()

// Function to handle popover visibility
const handlePopoverVisibility = (fishId: string, visible: boolean) => {
  activePopoverFishId.value = visible ? fishId : null
}
</script>

<template>
  <div class="aquarium-container">
    <div class="aquarium">
      <VAquariumBubbles />
      <template v-for="(item, index) in fishStore.fishList" :key="index">
        <Popover
          :open="activePopoverFishId === item.id"
          @openChange="(visible: boolean) => handlePopoverVisibility(item.id, visible)"
          title="Fish Info"
        >
          <template #content>
            <VFishInfo :fish="item" />
          </template>
          <VFish :fish="item" :hovered="activePopoverFishId" />
        </Popover>
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
