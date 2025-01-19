<script setup lang="ts">
import { computed, ref } from 'vue'
import { FISH_HEIGHT, PADDING, SWIM_DURATION, TANK_HEIGHT } from '@/constants/fish-constants'
import type { IFish } from '@/types/fish'
import { HealthStatusEnum } from '@/types/fish'

// Props
interface Props {
  fish: IFish
  hovered: string | undefined
}
const props = defineProps<Props>()

// Animation states
const swimDuration = ref(SWIM_DURATION)
const isSwimmingLeft = ref(Math.random() > 0.5)

// Position states
const startingPosition = ref(Math.random() * 1000)
const verticalPosition = ref(
  Math.random() * (TANK_HEIGHT - FISH_HEIGHT - 2 * PADDING) + PADDING
)

// Computed properties
const isPaused = computed(() => props.hovered === String(props.fish.id))
const isDead = computed(() => props.fish.health === HealthStatusEnum.DEAD)
const fishPosition = computed(() =>
  isDead.value ? `${PADDING}px` : `${verticalPosition.value}px`
)
</script>

<template>
  <div
    class="fish"
    :class="{
      'swim-left': isSwimmingLeft && !isDead,
      'swim-right': !isSwimmingLeft && !isDead,
      'dead': isDead,
      'paused': isPaused,
      'hovered': hovered === String(fish.id),
    }"
  >
    <img
      :src="fish.fishImage"
      class="fish-image"
      :alt="`${fish.name} fish`"
    />
  </div>
</template>

<style scoped>
/* CSS Variables */
.fish {
  --y-pos: v-bind('fishPosition');
  --duration: v-bind('swimDuration + "s"');
  --start-pos: v-bind('startingPosition + "px"');

  position: absolute;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 1;
}

/* Base styles */
.fish-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* State modifiers */
.hovered {
  z-index: 100;
  pointer-events: auto;
}

.paused {
  animation-play-state: paused !important;
}

.dead {
  z-index: 0;
  transform: translate(var(--start-pos), var(--y-pos)) rotate(180deg);
  transition: transform 2s ease-out, filter 2s ease-out;
  filter: grayscale(70%) opacity(0.75);
}

/* Animation classes */
.swim-right {
  animation: swimRight var(--duration) linear infinite;
}

.swim-left {
  animation: swimLeft var(--duration) linear infinite;
}

/* Swimming animations */
@keyframes swimRight {
  0% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(1);
  }
  45% {
    transform: translate(1000px, var(--y-pos)) scaleX(1);
  }
  50% {
    transform: translate(1000px, var(--y-pos)) scaleX(-1);
  }
  95% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(-1);
  }
  100% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(1);
  }
}

@keyframes swimLeft {
  0% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(-1);
  }
  45% {
    transform: translate(0, var(--y-pos)) scaleX(-1);
  }
  50% {
    transform: translate(0, var(--y-pos)) scaleX(1);
  }
  95% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(1);
  }
  100% {
    transform: translate(var(--start-pos), var(--y-pos)) scaleX(-1);
  }
}
</style>
