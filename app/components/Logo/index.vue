<template>
  <figure class="flex">
    <NuxtLink class="w-full flex" to="/">
      <ShareSkeleton
        v-if="loading || !ready"
        class="h-8 md:h-12 w-36 md:w-52"
      />
      <NuxtImg
        v-else-if="informations?.logo"
        format="wepb"
        decoding="async"
        loading="eager"
        class="w-full"
        :src="informations?.logo ?? ''"
        alt="لوگو"
      />
    </NuxtLink>
  </figure>
</template>
<script setup>
const store = useSettingsStore();
const informations = computed(() => store.getMainInformations);
const loading = computed(() => store.getLoading);
const ready = ref(false);
onMounted(() => {
  ready.value = true;
});
</script>
