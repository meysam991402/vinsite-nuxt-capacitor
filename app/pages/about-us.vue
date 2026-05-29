<script setup>
const store = useSettingsStore();
let settings = computed(() => store.getSettingsData);
let loading = computed(() => store.getLoading);
let ready = ref(false);
const breadCrump = ref([{ title: "درباره ما", link: "" }]);

onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <BreadCrump :list="breadCrump" />
  <section class="container mt-8 lg:mt-10 min-h-[50vh]">
    <div v-if="loading || !ready" class="w-full text-base">
      <ShareSkeleton
        class="w-full h-64 sm:h-75 lg:h-80 rounded-xl shadow-lg border border-gray-200 mb-10"
      />
      <ShareSkeleton
        v-for="value in 20"
        :key="value"
        class="w-full h-4 rounded-xl shadow-lg border border-gray-200 mb-5"
      />
    </div>
    <div
      class="text-base leading-10 about-us"
      v-else-if="settings?.about_us_page?.description"
      v-html="settings?.about_us_page?.description ?? ''"
    ></div>
  </section>
</template>
<style>
.about-us p img {
  margin: 0 auto;
}
</style>
