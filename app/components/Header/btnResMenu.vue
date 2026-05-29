<template>
  <button class="flex lg:hidden" @click="showResMenu = true">
    <IconsResMenu />
  </button>
  <HeaderMenusResMenu
    @close="showResMenu = false"
    :class="{ open: showResMenu }"
  />
</template>
<script setup>
let showResMenu = ref(false);
</script>
