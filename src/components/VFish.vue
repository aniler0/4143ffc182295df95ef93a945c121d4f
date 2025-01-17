<script setup lang="ts"></script>

<template>
  <div class="fish">
    <div class="eye"></div>
  </div>
</template>

<style scoped>
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
