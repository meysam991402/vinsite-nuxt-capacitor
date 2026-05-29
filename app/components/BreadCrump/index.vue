<template>
  <section class="container flex gap-1 items-center mt-8 lg:mt-10">
    <ul class="flex items-center">
      <li>
        <nuxt-link to="/" class="flex">
          <IconsHome class="size-8" />
        </nuxt-link>
      </li>
      <template v-if="list.length">
        <li v-for="(item, index) in list" :key="`item-${index}`" class="flex items-center">
          <span v-if="index != list.length" class="flex">
            <IconsArrow class="size-4" />
          </span>
          <nuxt-link :to="item?.link ?? ''" v-if="index != list.length - 1"
            class="text-sm md:text-base text-neutral-600 hover:text-black hover:font-bold transition-all duration-300">
            {{ item?.title ?? "" }}
          </nuxt-link>
          <p v-else
            class="text-sm md:text-base  line-clamp-1  text-neutral-600 hover:text-black hover:font-bold transition-all duration-300">
            {{ item?.title ?? "" }}
          </p>
        </li>
      </template>
    </ul>
    <!-- <span>
      <IconsArrow class="size-4" />
    </span>
    <span v-if="titleLink2">
      <IconsArrow class="size-4" />
    </span>
    <nuxt-link :to="link2 ?? ''"
      class="text-sm md:text-base text-neutral-600 hover:text-black hover:font-bold transition-all duration-300">
      {{ titleLink2 ?? "" }}
    </nuxt-link> -->
  </section>
</template>
<script setup>
let props = defineProps({
  link1: String,
  titleLink1: String,
  link2: String,
  titleLink2: String,

  list: {
    type: Array,
    default: [],
  },
});
</script>
