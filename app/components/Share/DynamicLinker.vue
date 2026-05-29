<template>
  <NuxtLink v-if="item?.url == null" :target="item?.new_tab ? '_blank' : '_self'"
    :to="linkResolver(item?.type, item?.slug, item?.url)">
    <slot></slot>
  </NuxtLink>
  <a v-else :target="item?.new_tab ? '_blank' : '_self'" :href="item?.url ?? '/'">
    <slot></slot>

  </a>


</template>
<script setup>
import linkResolver from "@/utils/linkResolver.js"
const props = defineProps({
  item: Object,
});
</script>
