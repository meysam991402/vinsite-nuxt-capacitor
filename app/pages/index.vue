<template>

  <Head>
    <Title>
      {{ title.value ?? "" }}
    </Title>
    <Meta name="description" :content="description.value ?? ''" />
    <!-- <Meta
      name="google-site-verification"
      content="yOxa4CiwLPsSXAvRFinWAzSwHqALKzdGncs7sAtC_14"
    /> -->
    <Link rel="canonical" :href="canonical.value ?? ''" />
  </Head>
  <button @click="isOpen = true">open modal</button>
  <ModalTest :modelValue="isOpen" />
  <!-- <Stories /> -->
  <HomeTopSwiper />
  <HomeCategories />
  <HomeNewProducts />
  <!-- <HomeMostSales /> -->

  <!-- <Banners
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 lg:mt-10"
    :banners="[
      { ...(advertisements?.top_banner_right ?? null) },
      { ...(advertisements?.top_banner_center ?? null) },
      { ...(advertisements?.top_banner_left ?? null) },
      
    ]"
  /> -->
  <template v-for="(category, index) in category_products?.length
    ? category_products
    : []" :key="category?.id ?? index">
    <HomeCategoryProducts :data="category" />
    <!-- <ShareBannerProducts :data="category" /> -->
  </template>
  <template v-for="(recommendation, index) in recommendations?.length
    ? recommendations
    : []" :key="recommendation?.id ?? index">
    <HomeRecommendations :data="recommendation" />
    <ShareBannerProducts :data="recommendation" />
  </template>
  <!-- <template
    v-for="(recommendation, index) in recommendations?.length
      ? recommendations
      : []"
    :key="recommendation?.id ?? index"
  >
    <HomeMostDiscounts :data="recommendation" />
  </template> -->
  <template v-for="(flash, index) in flashes?.length ? flashes : []" :key="recommendation?.id ?? index">
    <HomeFlashes :data="flash" />
    <ShareBannerProducts :data="flash" />
  </template>
  <!-- <Banners
    class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-10"
    :banners="[
      { ...(advertisements?.bottom_banner_right ?? null) },
      { ...(advertisements?.bottom_banner_left ?? null) },
    ]"
  /> -->
  <HomeBrands />
  <HomeWeblogHome />
</template>
<script setup>
const homeStore = useHomeStore();
const isOpen = ref(false)
const category_products = computed(() => homeStore.getCategoryProducts);
const recommendations = computed(() => homeStore.getRecommendations);
const flashes = computed(() => homeStore.getFlashes);
const storeUser = useUserStore();
const settingStore = useSettingsStore();
const settings = computed(() => settingStore.getSettingsData);
const title = ref(settings.value?.main_informations?.meta_title_home ?? "");
const description = ref(
  settings.value?.main_informations?.meta_description_home ?? "",
);
const canonical = ref(
  settings.value?.main_informations?.canonical_tag_home ?? "",
);
const login = computed(() => storeUser.getLogin);
watch(
  () => login.value,
  (newVal) => {
    if (login.value == true) {
      homeStore.setHome();
    }
  },
);
useAsyncData(
  () => `home-fetch`,
  async () => {
    await homeStore.setHome();
    return { fetched: true };
  },
  { lazy: false },
);
// if (import.meta.server) {
//   console.log("✅ این کد در سرور اجرا شد")
// }

// if (import.meta.client) {
//   console.log("✅ این کد در مرورگر اجرا شد")
// }
</script>
