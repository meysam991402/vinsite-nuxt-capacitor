<!-- <template>
  <figure v-if="banner" class="w-full flex">
    <NuxtLink :to="banner?.link ?? '/'" class="w-full flex">
      <NuxtImg
        v-if="banner?.picture"
        class="w-full rounded-lg"
        :src="banner?.picture ?? ''"
        format="webp"
        loading="lazy"
        :alt="banner?.slug ?? ''"
      />
      <ShareSkeleton v-else class="w-full h-[200px]" />
    </NuxtLink>
  </figure>
</template>
<script setup>
defineProps({
  banner: Object,
});
</script> -->

<template>
  <section class="container" v-if="banners && banners.length">
    <BannersCard
      :banner="banner"
      v-for="(banner, index) in banners"
      :key="`banner_${index}`"
    />
  </section>
</template>
<script setup>
defineProps({
  banners: Array,
});
</script>
