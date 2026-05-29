<template>
  <div class="flex items-center justify-between gap-6 mb-4 md:mb-6">
    <h2
      v-if="data?.title"
      class="text-xl sm:text-2xl text-neutral-700 font-bold"
    >
      {{ data?.title ?? "" }}
    </h2>
    <span
      v-if="data?.title && line"
      class="grow h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 hidden sm:block"
    ></span>
    <NuxtLink
      class="text-sm sm:text-base hover:text-gray-700 border border-solid border-gray-400 hover:border-black py-1 px-3 rounded-lg"
      v-if="data?.title_link"
      :to="data?.link ?? '/'"
      >{{ data?.title_link ?? "" }}</NuxtLink
    >
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    default: {
      title: null,
      title_link: null,
      link: null,
    },
  },
  line: {
    type: Boolean,
    default: true,
  },
});
</script>
