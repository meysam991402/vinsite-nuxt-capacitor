<template>
  <div
    v-if="sorting && sorting?.length"
    class="sorting w-full bg-neutral-100/50 overflow-auto rounded-xl p-2 lg:p-4 flex flex-col lg:flex-row gap-2 lg:gap-4 shadow-sm border border-gray-100"
  >
    <span class="text-base font-bold text-neutral-800 whitespace-nowrap"
      >مرتب سازی براساس:</span
    >
   
    <div class="sorting-list flex items-center gap-2">
      <template v-if="loading || !ready">
        <ShareSkeleton v-for="index in 4" :key="index" class="w-16 h-5" />
      </template>
      <template
      v-for="(item, index) in sorting"
        v-else-if="sorting && sorting?.length"
        :key="item?.id ?? index"
      >
        <button
          type="button"
          @click="sortingOption(item?.name ?? '')"
          class="sorting-btn relative pb-2 text-nowrap text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-all duration-200 group before:content-[''] before:absolute before:-bottom-1 before:left-0 before:right-0 before:h-[3px] before:bg-black before:rounded before:w-0 before:transition-all before:duration-300 before:origin-left before:z-10 hover:before:w-full"
          :class="{
            'text-neutral-900': activeSort === item?.name??'',
            ' before:w-full':activeSort=== item?.name??'',
          }"
          :data-active="activeSort=== item?.name??''"
        >
          {{ item?.label ?? "" }}
        </button>
        <!-- Divider فقط برای ایتم‌های غیرآخر -->
        <div
          v-if="index < sorting.length - 1"
          class="w-px h-6 bg-gray-300"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup>
const store = useProductsStore();
const sorting = computed(() => store.getSorting);
const activeSort = computed(() => store.getActiveSort);
const loading = computed(() => store.getLoading);
const ready = ref(false);
const route = useRoute();
const router = useRouter();
const sortingOption = (name) => {
  store.setActiveSort(name)
  router.push({
    name: route.name,
    params: route.params,
    query: {
      ...route.query,
      sort_by: name,
    },
  });
};

onMounted(() => {
  ready.value = true;
  store.setActiveSort(route?.query?.sort_by??null)
});
</script>
