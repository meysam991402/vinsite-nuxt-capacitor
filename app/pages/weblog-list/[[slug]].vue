<script setup>
const store = useWeblogStore();
const posts = computed(() => store.getWeblogData);
const loading = computed(() => store.getLoading);
const ErrorNotFound = computed(() => store.getErrorNotFound);
const settingStore = useSettingsStore();
const settings = computed(() => settingStore.getSettingsData);
const title = computed(
  () => settings.value?.main_informations?.meta_title_posts ?? "",
);
const description = computed(
  () => settings.value?.main_informations?.meta_description_posts ?? "",
);
const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug || "");
const ready = ref(false);
const breadCrump = ref([{ title: "لیست مقالات", link: "" }]);
useAsyncData(
  () => `posts-fetch-${slug.value}-${route.query.page || 1}`,
  async () => {
    await store.setWeblog(route.query ?? {}, slug.value);
    return { fetched: true };
  },
);
watch([() => route.query.page, () => route.params.slug], async () => {
  currentPage.value = route.query.page || 1;
  await store.setWeblog(route.query ?? {}, route.params.slug ?? "");
});
onMounted(() => {
  ready.value = true;
});
useSeoMeta({
  title: title.value,
  description: description.value,
});
watch(settings, (newSettings) => {
  useSeoMeta({
    title: newSettings?.main_informations?.meta_title_posts?.text ?? "",
    description:
      newSettings?.main_informations?.meta_description_posts?.text ?? "",
  });
});
</script>
<template>
  <section>
    <BreadCrump :list="breadCrump" />
    <section
      class="container mt-8 lg:mt-10 grid grid-cols-12 gap-4 items-start min-h-[60vh]"
    >
      <div
        v-if="loading || !ready"
        class="col-span-12 lg:col-span-8 xl:col-span-9 grid grid-cols-12 gap-4 md:gap-6"
      >
        <ShareSkeleton
          v-for="index in 11"
          :key="index"
          class="h-[220px] sm:h-[240px] lg:h-[280px] col-span-6 lg:col-span-4"
        />
      </div>
      <ShareNotFoundPage
        v-else-if="ErrorNotFound"
        class="col-span-12 lg:col-span-8 xl:col-span-9 mt-16!"
      />
      <div
        v-else
        class="col-span-12 lg:col-span-8 xl:col-span-9 grid grid-cols-12 gap-4 md:gap-6"
      >
        <template v-if="posts?.data && posts?.data?.length">
          <div
            class="col-span-6 lg:col-span-4"
            v-for="(post, index) in posts?.data"
            :key="post?.id ?? index"
          >
            <WeblogCard :post="post" />
          </div>
          <div
            v-if="posts?.last_page > 1"
            class="col-span-12 paginate flex justify-center mt-8"
          >
            <SharePagination :data="posts" />
          </div>
        </template>
        <h4
          v-if="posts?.data && !posts?.data?.length"
          class="text-center w-full"
        >
          مقاله ای برای نمایش یافت نشد
        </h4>
      </div>

      <WeblogAside />
    </section>
  </section>
</template>
