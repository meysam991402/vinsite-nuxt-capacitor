<template>
  <figure
    v-if="banner"
    class="w-full flex overflow-hidden before:left-[-100%] relative before:absolute hover:before:left-[150%] before:transition-all before:duration-200 before:ease-linear before:w-8 before:h-[200%] before:bg-white/30 before:top-1/2 before:-translate-y-1/2 before:rotate-45"
  >
    <NuxtLink :to="banner?.link_url ?? '/'" class="w-full flex">
      <NuxtImg
        v-if="banner?.desktop_image?.url"
        class="w-full rounded-lg hidden lg:flex"
        :src="banner?.desktop_image?.url ?? ''"
        format="webp"
        loading="lazy"
        decoding="async"
        :alt="banner?.label ?? ''"
      />
      <NuxtImg
        v-if="banner?.mobile_image?.url"
        class="w-full rounded-lg flex lg:hidden"
        :src="banner?.mobile_image?.url ?? ''"
        format="webp"
        loading="lazy"
        decoding="async"
        :alt="banner?.label ?? ''"
      />
      <ShareSkeleton v-else class="w-full h-[200px]" />
    </NuxtLink>
  </figure>
</template>
<script setup>
defineProps({
  banner: Object,
});
</script>
