<template>
  <section id="modal"
    class="w-screen h-screen fixed top-0 right-0 bg-black/25 backdrop-blur-lg z-996 grid place-items-center"
    @click.self="emit('close')">
    <button class="flex absolute left-[2%] top-[2%]" @click="emit('close')">
      <IconsDeleted color="#fff" class="w-8 h-8" />
    </button>
    <slot />
  </section>
</template>
<script setup>
const emit = defineEmits("close");
</script>
