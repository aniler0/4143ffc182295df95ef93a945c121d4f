<template>
  <div class="loading-container">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for basic spinner
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #b6b6b6;
  border-top: 5px solid #6a6a6a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>