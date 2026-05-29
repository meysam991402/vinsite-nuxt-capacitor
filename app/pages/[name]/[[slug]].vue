<script setup>
const store = useProductsStore();
const products = computed(() => store.getProducts);
const categories = computed(() => store.getCategories);
const loading = computed(() => store.getLoading);
const settingStore = useSettingsStore();
const settings = computed(() => settingStore.getSettingsData);
const route = useRoute();
const router = useRouter();
const ErrorNotFound = computed(() => store.getErrorNotFound);
const slug = route.params.name == "product-list" ? "" : route.params.name;
const showModal = ref(false);
const ready = ref(false);
const storeUser = useUserStore();
const login = computed(() => storeUser.getLogin);
const breadCrump = ref([{ title: "محصولات", link: "/product-list" }]);

const shouldNoIndex = computed(() => {
  if (Object.keys(route.query).length > 0) return true;
  if (store?.categories?.meta_robots === 1) return true;
  if (settings.value?.main_informations?.meta_robots_products === 1)
    return true;
  return false;
});
watch(
  () => login.value,
  (newVal) => {
    if (login.value == true) {
      store.setProducts(route.query ?? {}, slug ?? "");
    }
  },
);
useAsyncData(
  () => `products-fetch-${slug}-${JSON.stringify(route.query)}`,
  async () => {
    await store.setProducts(route.query ?? {}, slug ?? "");
    return { fetched: true };
  },
  {
    lazy: false,
  },
);
// function changePage(activePage) {
//   router.push({
//     name: route.name,
//     params: route.params,
//     query: { ...route.query, page: activePage },
//   });
// }
watch(
  () => ({
    currentSlug: route.params.slug,
    currentQuery: route.query,
  }),
  async (newValues, oldValues) => {
    const { currentQuery, currentSlug } = newValues;
    currentPage.value = route.query.page || 1;

    await store.setProducts(currentQuery ?? {}, currentSlug ?? "");
  },
  {
    immediate: false,
  },
);
onMounted(() => {
  ready.value = true;
});
</script>
<template>

  <Head>
    <Title>
      {{
        store?.categories?.meta_title ||
        settings?.main_informations?.meta_title_products ||
        ""
      }}
    </Title>
    <Meta name="description" :content="store?.categories?.meta_description ||
      settings?.main_informations?.meta_description_products ||
      ''
      " />
    <Meta name="robots" :content="shouldNoIndex ? 'noindex, nofollow' : 'index, follow'" />
    <Link rel="canonical" :href="store?.categories?.canonical_tag ||
      settings?.main_informations?.canonical_tag_products ||
      ''
      " />
  </Head>
  <ShareNotFoundPage v-if="ErrorNotFound" />
  <template v-else>
    <BreadCrump :list="breadCrump" />

    <section class="container mt-8 lg:mt-10 grid grid-cols-12 gap-4">
      <ProductListAside />
      <div class="col-span-12 lg:col-span-8 xl:col-span-8 flex flex-col gap-4">
        <button type="button" @click="showModal = true"
          class="flex lg:hidden bg-neutral-900 w-fit hover:bg-neutral-700 text-white text-sm font-medium rounded-md mt-3 py-2.5 px-6 transition-all duration-200 items-center justify-center shadow-sm hover:shadow-md">
          فیلتر ها
        </button>
        <ProductListSorting />
        <div class="grid grid-cols-12 gap-2 lg:gap-3">
          <template v-if="loading || !ready">
            <ShareSkeleton v-for="index in 24" :key="index"
              class="col-span-6 md:col-span-4 h-[220px] sm:h-[240px] md:h-[300px] 2xl:h-[468px] w-full" />
          </template>
          <template v-else-if="products && products?.data && products?.data?.length">

            <div class="col-span-6 md:col-span-4" v-for="(product, index) in products?.data"
              :key="product?.id ?? index">
              <ProductCard :product="product" />
            </div>
          </template>
        </div>
        <h4 v-if="products && !products?.data?.length" class="text-center font-bold w-full mt-10">
          محصولی برای نمایش یافت نشد
        </h4>
        <div v-if="products?.last_page > 1" class="paginate flex justify-center mt-8">
          <SharePagination :data="products" />
        </div>
      </div>
    </section>
    <Teleport to="body">
      <Transition name="fade">
        <Modal @close="showModal = false" v-if="showModal">
          <ProductListFilterMobile @close="showModal = false" />
        </Modal>
      </Transition>
    </Teleport>
  </template>
</template>
