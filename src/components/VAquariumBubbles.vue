<template>
  <div class="bubbles">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
  </div>
</template>
<style>
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

.bubble:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
}
.bubble:nth-child(2) {
  left: 50%;
  animation-delay: 1s;
}
.bubble:nth-child(3) {
  left: 80%;
  animation-delay: 2s;
}

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
