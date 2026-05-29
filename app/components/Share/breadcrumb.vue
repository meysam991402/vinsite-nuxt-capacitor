<template>
  <section class="flex itms-center gap-2 md:gap-3 container mt-8 lg:mt-10">
    <nuxt-link to="/" class="text-sm md:text-base hover:text-gray-6d">
      خانه
    </nuxt-link>
    <IconDoubleChevron class="size-5" />
    <nuxt-link :to="linkCat" class="text-sm md:text-base hover:text-gray-6d">
      {{ category }}
    </nuxt-link>
    <IconDoubleChevron v-if="title" class="size-5" />
    <nuxt-link
      v-if="title"
      :to="linkTitle"
      class="text-sm md:text-base hover:text-gray-6d line-clamp-1"
    >
      {{ title }}
    </nuxt-link>
  </section>
</template>
<script setup>
let props = defineProps(["category", "title", "linkCat", "linkTitle"]);
</script>
