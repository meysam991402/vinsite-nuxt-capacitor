<template>
  <BreadCrump :list="breadCrump" />
  <section class="container min-h-[65vh]">
    <h2 class="font-bold mt-4 sm:mt-6 flex items-center gap-2">
      <span class="text-lg lg:text-xl">تعداد نتایج : </span>

      <ShareSkeleton v-if="loading || !ready" class="h-4 w-6" />
      <span v-else class="text-base lg:text-lg">{{
        searchItems?.total ?? ""
      }}</span>
    </h2>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6"
      v-if="loading || !ready"
    >
      <ShareSkeleton
        v-for="index in 8"
        :key="index"
        class="h-[250px] sm:h-[325px] w-full"
      />
    </div>
    <template v-else>
      <div
        v-if="
          searchItems && searchItems?.products && searchItems?.products?.length
        "
      >
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6"
        >
          <ProductCard
            v-for="(product, index) in searchItems?.products"
            :key="product?.id ?? `product-${index}`"
            :product="product"
            class=""
          />
        </div>
      </div>
      <div v-else class="min-h-[65vh] grid place-items-center">
        <h4 class="flex gap-1">
          <span>محصولی برای جستجوی</span>
          <span class="font-bold">{{ route.query.q }}</span>
          <span>یافت نشد</span>
        </h4>
      </div>
    </template>
  </section>
</template>
<script setup>
const store = useSearchStore();
const searchItems = computed(() => store.getSearchItems);
let loading = computed(() => store.getLoading);
let route = useRoute();
let ready = ref(false);
const breadCrump = ref([{ title: "نتایج جستوجو", link: "" }]);
onMounted(() => {
  ready.value = true;
});
watch(
  () => route.query,
  (newVal) => {
    store.setSearch(route?.query?.q ?? "");
  },
);
useAsyncData(
  () => `Search-fetch-${new Date()}`,
  async () => {
    await store.setSearch(route?.query?.q ?? "");
    return { fetched: true };
  },
  { lazy: false },
);
</script>
