<template>
  <div class="skeleton overflow-hidden rounded-lg cursor-wait!"></div>
</template>
<style scoped>
.skeleton {
  background-image: linear-gradient(
    to right,
    #d6d7d8 0%,
    #e2e3e4 10%,
    #d6d7d8 20%,
    #d6d7d8 100%
  );
  background-size: 200% 100%;
  animation: bgAnimation 1.2s linear infinite;
  opacity: 0.6;
}
@keyframes bgAnimation {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
</style>
