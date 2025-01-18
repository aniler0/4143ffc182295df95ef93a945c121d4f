<script setup lang="ts">
import type { IFish } from '@/types/fish'
import { ref, computed } from 'vue'
import { HealthStatusEnum } from '@/types/fish'

const props = defineProps<{
  fish: IFish
}>()

const emit = defineEmits(['fishHovered'])

const TANK_HEIGHT = 550
const FISH_HEIGHT = 100
const PADDING = 50
const SWIM_DURATION = 9

const swimDuration = ref(SWIM_DURATION)
const startingPosition = ref(Math.random() * 1000)
const verticalPosition = ref(Math.random() * (TANK_HEIGHT - FISH_HEIGHT - 2 * PADDING) + PADDING)
const isSwimmingLeft = ref(Math.random() > 0.5)
const isHovered = ref(false)

const isDead = computed(() => props.fish.health === HealthStatusEnum.Dead)

// Use top padding for dead fish
const fishPosition = computed(() => 
  isDead.value ? PADDING + 'px' : verticalPosition.value + 'px'
)

const handleFishHover = (event: MouseEvent) => {
  isHovered.value = true
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  emit('fishHovered', {
    fish: props.fish,
    position: {
      x: rect.right,
      y: rect.top
    }
  })
}

const handleFishLeave = () => {
  isHovered.value = false
}
</script>

<template>
  <div
    class="fish"
    :class="{
      'swim-left': isSwimmingLeft && !isDead,
      'swim-right': !isSwimmingLeft && !isDead,
      'dead': isDead,
      'paused': isHovered || isDead,
    }"
    @mouseenter="handleFishHover"
    @mouseleave="handleFishLeave"
  >
    <img :src="fish.fishImage" class="fish-image" alt="fish" />
  </div>
</template>

<style scoped>
.fish {
  --y-pos: v-bind('fishPosition');
  --duration: v-bind('swimDuration + "s"');
  --start-pos: v-bind('startingPosition + "px"');

  position: absolute;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.fish-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.paused {
  animation-play-state: paused !important;
}

.dead {
  transform: translate(var(--start-pos), var(--y-pos)) rotate(180deg);
  transition: transform 2s ease-out, filter 2s ease-out;
  filter: grayscale(70%) opacity(0.75);
}

.swim-right {
  animation: swimRight var(--duration) linear infinite;
}

.swim-left {
  animation: swimLeft var(--duration) linear infinite;
}

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
