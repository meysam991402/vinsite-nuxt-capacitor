<script setup>
const store = useColorsRangeStore();
let colorsRange = computed(() => store.getColorsRangeData);
if (!colorsRange.value) {
  useAsyncData(
    async () => {
      await store.setColorsRange();
      return { fetched: true };
    },
    { lazy: false },
  );
}
let loading = computed(() => store.getLoading);
let ready = ref(false);
let route = useRoute();
let router = useRouter();
let selectedColors = ref([]);
let showModal = ref(false);
//انتخاب رنگ ها و ریختن اون ها توی ارایه
function colorSelected(index) {
  const id = colorsRange.value[index].id;
  const exists = selectedColors.value.includes(id);
  if (exists) {
    // اگر قبلا انتخاب شده بود، حذفش کنیم
    selectedColors.value = selectedColors.value.filter((item) => item !== id);
  } else {
    // اگر نبود، اضافه‌اش کنیم
    selectedColors.value.push(id);
  }
  let colorIds = selectedColors.value.toString();
  //اضافه کردن ان به query
  router.push({
    name: route.name,
    params: route.params,
    query: {
      ...route.query,
      color_range_ids: colorIds,
    },
  });
}
onMounted(() => {
  ready.value = true;
  //چک کنه اگه این query هست
  // بیاد اون ایدی های موجود رو فعال کنه
  if (route.query.color_ranges_ids) {
    let colorIdString = route.query.color_range_ids;
    selectedColors.value = colorIdString.split(",").map((id) => {
      return Number(id.trim());
    });
  }
});
</script>
<template>
  <div
    v-if="loading || !ready"
    class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
  >
    <h4
      class="w-p-100 pb-2 border-b-1 border-b-gray-200 text-base font-bold text-neutral-600"
    >
      برند ها
    </h4>
    <ul class="grid grid-cols-4 gap-x-3 gap-y-4 px-1">
      <ShareSkeleton v-for="index in 5" :key="index" class="w-12 h-12" />
    </ul>
  </div>
  <div
    v-else-if="colorsRange && colorsRange?.length"
    class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
  >
    <h4
      class="pb-2 border-b border-b-gray-200 text-base font-bold text-neutral-600"
    >
      رنگ‌ها
    </h4>
    <ul class="grid grid-cols-4 gap-x-3 gap-y-4 px-1">
      <button
        type="button"
        @click="colorSelected(index)"
        v-for="(color, index) in colorsRange"
        :key="color?.id ?? index"
        class="col-span-1 flex flex-col gap-1 items-center group"
      >
        <figure
          :class="
            selectedColors.includes(color?.id ?? '')
              ? 'border-2 border-green-700'
              : 'border border-neutral-400'
          "
          class="p-1 relative h-10 w-10 flex rounded-lg overflow-hidden group-hover:border-green-700 transition-all duration-300"
        >
          <NuxtImg
            :class="{
              'brightness-110': selectedColors.includes(color?.id ?? ''),
            }"
            format="webp"
            loading="lazy"
            decoding="async"
            :src="color?.logo?.url"
            class="w-full h-full"
            :alt="color?.title??''"
          />
          <IconsTick
            :class="
              selectedColors.includes(color?.id ?? '')
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
            "
            class="size-6 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-linear"
          />
        </figure>
        <span
          class="text-sm text-neutral-600 group-hover:text-black transition-all duration-300"
        >
          {{ color?.title ?? "" }}
        </span>
      </button>
    </ul>

    <button
      @click="showModal = true"
      type="button"
      class="w-full flex items-center justify-between mt-2 group"
    >
      <span
        class="text-base font-bold text-neutral-500 group-hover:text-black transition-all duration-300"
      >
        جزییات رنگ‌ها
      </span>
      <IconsArrow
        class="text-neutral-500 group-hover:text-black transition-all duration-300 size-4"
      />
    </button>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModal = false" v-if="showModal">
        <ProductListAsideColorsModal
          @close="showModal = false"
          :colorsRange="colorsRange"
        />
      </Modal>
    </Transition>
  </Teleport>
</template>
