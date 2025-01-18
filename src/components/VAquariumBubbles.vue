<template>
  <div class="bubbles">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
  </div>
</template>
<style>
.bubble {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: rise 4s infinite;
  bottom: 0;
}

.bubble:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
  width: 25px; /* Unique size */
  height: 25px;
}
.bubble:nth-child(2) {
  left: 50%;
  animation-delay: 1s;
  width: 15px; /* Unique size */
  height: 15px;
}
.bubble:nth-child(3) {
  left: 80%;
  animation-delay: 2s;
  width: 20px; /* Unique size */
  height: 20px;
}

@keyframes rise {
  0% {
    bottom: -20px;
    transform: scale(0.8); /* Adjusted scale */
  }
  100% {
    bottom: 100%;
    transform: scale(2); /* Increased scale */
  }
}
</style>
