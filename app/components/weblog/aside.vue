<template>
  <aside
    class="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4 lg:sticky top-1.5"
  >
    <div
      v-if="loading || !ready"
      class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
    >
      <h4
        class="text-base font-bold text-neutral-600 pb-2 border-b border-b-gray-200"
      >
        دسته بندی
      </h4>
      <ul class="flex flex-col gap-2 mt-2">
        <ShareSkeleton v-for="index in 4" :key="index" class="h-4 w-full" />
      </ul>
    </div>
    <div
      v-else-if="categories && categories?.length"
      class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
    >
      <h4
        class="text-base font-bold text-neutral-600 pb-2 border-b border-b-gray-200"
      >
        دسته بندی
      </h4>
      <ul class="flex flex-col gap-2 mt-2">
        <li
          v-for="(category, index) in categories"
          :key="category?.id ?? index"
        >
          <nuxt-link
            :to="`/weblog-list/${category?.slug ?? ''}`"
            class="flex items-center gap-2 group"
          >
            <IconsArrow
              class="text-neutral-500 size-4 group-hover:text-black duration-300 ease-linear"
            />
            <span
              class="text-sm md:text-base group-hover:text-neutral-500 duration-300 ease-linear"
            >
              {{ category?.title ?? "" }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- <div
      class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
      v-if="recentsBlogs && recentsBlogs?.length"
    >
      <h4
        class="text-base font-bold text-neutral-600 pb-2 border-b border-b-gray-200"
      >
        مطالب اخیر
      </h4>
      <ul class="flex flex-col gap-3 mt-2">
        <li v-for="(item, index) in recentsBlogs" :key="item?.id ?? index">
          <nuxt-link
            :to="`/weblog-list/${item?.slug ?? ''}`"
            class="flex items-center gap-2 group"
          >
            <figure class="rounded-lg overflow-hidden flex w-36">
              <NuxtImg
                class="w-full"
                :src="item?.image?.url"
                format="webp"
                :alt="item?.title ?? ''"
              />
            </figure>
            <div class="flex flex-col gap-1 grow">
              <span
                class="text-sm line-clamp-1 md:text-base group-hover:text-neutral-500 duration-300 ease-linear"
              >
                {{ item?.title ?? "" }}
              </span>
              <div class="flex justify-between items-center">
                <time class="text-sm text-neutral-500" datetime="1404/03/04"
                  >1404/03/04</time
                >
                <span class="text-sm text-neutral-600">بیشتر...</span>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div> -->
  </aside>
</template>
<script setup>
const store = usePostCategoriesStore();
let categories = computed(() => store.getPostCategoriesData);
let loading = computed(() => store.getLoading);
let ready = ref(false);
if (categories.value == null) {
  useAsyncData(
    async () => {
      await store.setPostCategories();
      return { fetched: true };
    },
    { lazy: false },
  );
}
onMounted(() => {
  ready.value = true;
});
</script>
