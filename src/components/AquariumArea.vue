<script setup lang="ts">
import FishItem from '@/components/Fish/FishItem.vue';

</script>

<template>
  <div class="aquarium-container">
    <div class="aquarium">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <FishItem />
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

.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: rise 4s infinite;
  bottom: 0;
}

.bubble:nth-child(1) { left: 20%; animation-delay: 0s; }
.bubble:nth-child(2) { left: 50%; animation-delay: 1s; }
.bubble:nth-child(3) { left: 80%; animation-delay: 2s; }

@keyframes rise {
  0% {
    bottom: -20px;
    transform: scale(0.5);
  }
  100% {
    bottom: 100%;
    transform: scale(1.5);
  }
}
</style>