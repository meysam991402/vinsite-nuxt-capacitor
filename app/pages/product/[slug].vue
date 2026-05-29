<template>
  <Head>
    <Title>
      {{ store.product?.meta_title ?? "" }}
    </Title>
    <Meta name="description" :content="store.product?.meta_description ?? ''" />
    <Meta
      name="robots"
      :content="shouldNoIndex ? 'noindex, nofollow' : 'index, follow'"
    />
    <Link rel="canonical" :href="store.product?.canonical_tag ?? ''" />
  </Head>
  <ShareNotFoundPage v-if="ErrorNotFound" />
  <template v-else>
    <div v-if="loading || !ready" class="">
      <div
        class="container flex flex-col lg:items-stretch lg:flex-row mt-10 gap-6"
      >
        <div class="lg:w-[34%] relative flex flex-col gap-1 w-full">
          <ShareSkeleton class="h-[400px] sm:h-[450px] lg:h-[550px] w-full" />
          <div class="flex gap-2 items-center w-full">
            <ShareSkeleton
              v-for="index in 4"
              :key="index"
              class="h-[80px] w-[80px]"
            />
          </div>
        </div>
        <div class="grow overflow-hidden pt-4 sm:pt-8">
          <div class="border-b border-gray-300 w-full pb-4">
            <div class="flex w-full items-center gap-2 justify-between">
              <ShareSkeleton class="w-36 h-5 mb-2" />
              <div class="hidden lg:flex items-center gap-2">
                <ShareSkeleton class="w-14 h-14" />
                <ShareSkeleton class="w-14 h-14" />
              </div>
            </div>
            <ShareSkeleton class="w-36 h-5" />
          </div>
          <div class="flex flex-col gap-4 mt-4">
            <template v-for="value in 2" :key="value">
              <ShareSkeleton class="w-20 h-4" />
              <div class="flex gap-4 items-center">
                <ShareSkeleton
                  v-for="value in 4"
                  :key="value"
                  class="w-16 h-8"
                />
              </div>
            </template>
            <ShareSkeleton class="w-20 h-4" />
            <ShareSkeleton class="w-56 h-12" />
          </div>
        </div>
      </div>
      <div class="mt-12 container w-full">
        <div class="flex gap-4 items-center justify-center mb-4 mx-auto">
          <ShareSkeleton v-for="value in 3" :key="value" class="w-20 h-8" />
        </div>
        <ShareSkeleton
          v-for="value in 2"
          :key="value"
          class="w-full h-8 mb-4"
        />
      </div>
    </div>
    <template v-else-if="product">
      <ProductDetailContent />
      <ProductDetailInformations />
    </template>
    <ProductDetailRelatedProducts />
  </template>
</template>
<script setup>
const store = useProductStore();
const route = useRoute();
const storeUser = useUserStore();
const login = computed(() => storeUser.getLogin);
const ErrorNotFound = computed(() => store.getErrorNotFound);
const product = computed(() => store.getProduct);
const loading = computed(() => store.getLoading);
const shouldNoIndex =
  Object.keys(route.query).length > 0 || store.product?.meta_robots === 1;
const ready = ref(false);
// watch(
//   () => login.value,
//   (newVal) => {
//     if (login.value == true) {
//       store.requestProduct(slug ?? "");
//     }
//   },
// );
onMounted(() => {
  ready.value = true;
});
const slug = route.params.slug;
useAsyncData(
  () => `product-fetch-${new Date()}`,
  async () => {
    await store.requestProduct(slug ?? "");
    return { fetched: true };
  },
  {
    lazy: false,
  },
);
</script>
