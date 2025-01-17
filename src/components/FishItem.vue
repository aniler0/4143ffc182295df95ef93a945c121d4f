<script setup lang="ts">
import { onMounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)
const prevX = ref(0)
const isMovingLeft = ref(false)

const updatePosition = () => {
  prevX.value = x.value
  const newX = Math.random() * 80
  const newY = Math.random() * 80

  // Determine direction based on X movement
  isMovingLeft.value = newX < prevX.value

  x.value = newX
  y.value = newY
  setTimeout(updatePosition, Math.random() * 3000 + 2000)
}

onMounted(() => {
  updatePosition()
})
</script>

<template>
  <div class="fish-container">
    <div class="fish">
      <div class="eye"></div>
    </div>
  </div>
</template>

<style scoped>
.fish-container {
  position: absolute;
  transform-origin: center;
}

.fish {
  position: relative;
  width: 120px;
  height: 60px;
  background: linear-gradient(45deg, #ff6b6b, #ff8787);
  border-radius: 50px 80px 20px 50px;
  transform: rotateY(180deg);
}

.fish::before {
  content: '';
  position: absolute;
  top: 15px;
  right: -20px;
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #ff6b6b, #ff8787);
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.fish::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  width: 10px;
  height: 40px;
  background: linear-gradient(45deg, #ff6b6b, #ff8787);
  border-radius: 50%;
  transform: rotate(45deg);
}

.eye {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  top: 15px;
  left: 25px;
}

.eye::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background: black;
  border-radius: 50%;
  top: 3px;
  left: 3px;
}
</style>
