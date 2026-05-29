<template>
  <div
    v-if="loading || !ready"
    class="grid grid-cols-1 gap-4 sm:gap-8 mt-8 lg:mt-10 container"
  >
    <ShareSkeleton class="h-[120px] md:h-[185px] w-full" />
  </div>
  <div
    v-else-if="data?.image_display_mode_number != 0"
    :class="{
      'grid-cols-1': data?.image_display_mode_number == 1,
      'grid-cols-2 sm:grid-cols-2': data?.image_display_mode_number == 2,
      'grid-cols-2 lg:grid-cols-4': data?.image_display_mode_number == 4,
    }"
    class="grid mt-8 lg:mt-10 container gap-4 sm:gap-8"
  >
    <figure
      class="w-full flex"
      v-for="(item, index) in data?.desktop_images"
      :key="item?.id ?? index"
    >
      <NuxtImg
        class="w-full rounded-lg hidden md:flex"
        :src="item?.url ?? ''"
        format="webp"
        loading="lazy"
        decoding="async"
        :alt="item?.label ?? ''"
      />
      <NuxtImg
        class="w-full rounded-lg flex md:hidden"
        :src="data?.mobile_images[index]?.url ?? ''"
        format="webp"
        loading="lazy"
        decoding="async"
        :alt="item?.label ?? ''"
      />
    </figure>
  </div>
</template>
<script setup>
const homeStore = useHomeStore();
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
defineProps({
  data: Object,
});
</script>
