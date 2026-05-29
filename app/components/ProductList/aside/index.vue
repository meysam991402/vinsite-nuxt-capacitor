<template>
  <aside class="col-span-4 xl:col-span-4 hidden lg:flex flex-col gap-4 sticky top-4">
    <ProductListAsideSearchBox />
    <ProductListAsideCategories />
    <ProductListAsideCheckBoxInputs :items="brandsData" :loading="loading" title="برندها" />
    <ProductListAsideColors />
    <!-- <ProductListAsideCheckBoxInputs :items="sizes" title="سایزها" /> -->
    <ProductListAsideAvailable />
    <ProductListAsidePriceRange />
  </aside>
</template>
<script setup>
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
</script>
