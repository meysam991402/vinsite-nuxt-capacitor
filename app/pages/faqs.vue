<script setup>
const store = useFaqsStore();
let faqs = computed(() => store.getFaqsData);
let loading = computed(() => store.getLoading);
let ready = ref(false);
const breadCrump = ref([{ title: "سوالات متداول", link: "" }]);
if (!faqs.value) {
  useAsyncData(
    async () => {
      await store.setFaqs();
      return { fetched: true };
    },
    { lazy: false },
  );
}
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <BreadCrump :list="breadCrump" />
  <section class="container mt-8 lg:mt-10 min-h-[50vh]">
    <div class="relative w-fit flex mx-auto">
      <IconsQuestions class="size-12 absolute -left-16 -top-5 sm:-top-8" />
      <IconsQuestions
        class="size-12 absolute -right-16 -bottom-5 sm:-bottom-8"
      />
      <h2 class="font-bold text-2xl md:text-3xl text-center text-neutral-600">
        سوالات متداول
      </h2>
    </div>
    <div class="mt-8 w-full 2xl:w-[80%] flex flex-col gap-5 mx-auto">
      <template v-if="loading || !ready">
        <ShareSkeleton
          v-for="value in 6"
          :key="value"
          class="h-14 w-full mb-3"
        />
      </template>
      <template v-else-if="faqs && faqs.length">
        <details
          v-for="(item, index) in faqs"
          :key="item?.id ?? index"
          class="group/item bg-neutral-100 p-4 rounded-lg"
          name="list"
        >
          <summary class="flex items-center justify-between cursor-pointer">
            <p class="font-bold text-base md:text-lg text-neutral-600">
              {{ item?.question ?? "" }}
            </p>
            <span class="flex">
              <IconsArrow
                class="w-4 h-4 group-open/item:-rotate-90 transition-all duration-300 text-neutral-600"
              />
            </span>
          </summary>
          <p class="text-sm md:text-base pt-3">
            {{ item?.answer ?? "" }}
          </p>
        </details>
      </template>
      <h2
        v-else-if="faqs && !faqs.length"
        class="font-bold text-xl md:text-2xl text-center text-neutral-500 pt-10"
      >
        داده ای برای نمایش وجود ندارد
      </h2>
    </div>
  </section>
</template>
