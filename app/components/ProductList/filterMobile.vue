<template>
  <section class="w-[95%] sm:w-[500px] md:w-[600px] max-h-10/12 overflow-auto rounded-xl p-4 sm:p-6 bg-white">
    <div class="flex justify-between items-center pb-2 border-b-1 border-b-neutral-200">
      <span class="textbase font-bold">فیلتر ها</span>
      <button type="button" @click="emit('close')">
        <IconsDeleted />
      </button>
    </div>
    <div class="flex flex-col gap-4 mt-2">
      <ProductListAsideSearchBox />
      <ProductListAsideCategories />
      <ProductListAsideCheckBoxInputs :items="brandsData" :loading="loading" title="برندها" />
      <ProductListAsideColors />
      <!-- <ProductListAsideCheckBoxInputs :items="sizes" title="سایزها" /> -->
      <ProductListAsideAvailable />
      <ProductListAsidePriceRange />
    </div>
  </section>
</template>
<script setup>
const route = useRoute()
const emit = defineEmits("close");
const brandsStore = useBrandsStore();
let brandsData = computed(() => brandsStore.getBrandsData);
let loading = computed(() => brandsStore.getLoading);
if (!brandsData.value) {
  useAsyncData(
    async () => {
      await brandsStore.setBrands();
      return { fetched: true };
    },
    { lazy: false },
  );
}
watch(() => route.query, (newQuery) => {
  emit('close')
})
</script>
