<script setup>
const store = useRecommendationStore();
const products = computed(() => store.getRecommendationData);
const ErrorNotFound = computed(() => store.getErrorNotFound);
let loading = computed(() => store.getLoading);
const route = useRoute();
const router = useRouter();
let ready = ref(false);
const breadCrump = ref([{ title: "محصولات", link: "" }]);

let id = route.params.id;
useAsyncData(
  () => `recomendations-fetch-${id}`,
  async () => {
    await store.setRecommendation(route.query ?? {}, id);
    return { fetched: true };
  },
  {
    lazy: false,
  },
);

watch(
  () => ({
    currentId: route.params.id,
    currentQuery: route.query,
  }),
  async (newValues, oldValues) => {
    const { currentQuery, currentId } = newValues;
    currentPage.value = route.query.page || 1;
    await store.setRecommendation(currentQuery ?? {}, currentId ?? "");
  },
  {
    immediate: false,
    deep: true,
  },
);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <BreadCrump :list="breadCrump" />
  <ShareNotFoundPage v-if="ErrorNotFound" />
  <template v-else>
    <section class="container mt-8 lg:mt-10">
      <div class="grid grid-cols-12 gap-4 lg:gap-6">
        <template v-if="loading || !ready">
          <ShareSkeleton
            v-for="index in 24"
            :key="index"
            class="col-span-6 md:col-span-4 lg:col-span-3 h-[220px] sm:h-[240px] md:h-[350px] 2xl:h-[400px] w-full"
          />
        </template>
        <div
          v-else-if="products && products?.data && products?.data?.length"
          class="col-span-6 md:col-span-4 lg:col-span-3"
          v-for="(product, index) in products?.data"
          :key="product?.id ?? index"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      <h4
        v-if="products && products?.data && !products?.data?.length"
        class="text-center font-bold w-full mt-10"
      >
        محصولی برای نمایش یافت نشد
      </h4>
      <div
        v-if="products?.last_page > 1"
        class="paginate flex justify-center mt-8"
      >
        <SharePagination :data="products" />
      </div>
    </section>
  </template>
</template>
