<template>
  <div class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2">
    <h4 class="w-p-100 pb-2 border-b-1 border-b-gray-200 text-base font-bold text-neutral-600">
      قیمت
    </h4>

    <div class="range-input relative mt-4">
      <div class="slider h-1.5 relative bg-neutral-200 rounded-full">
        <div class="h-full absolute w-full bg-neutral-300 rounded-full z-10"></div>

        <div ref="progressRef" class="progress h-full absolute bg-black rounded-full transition-all duration-200 z-20"
          :style="progressStyle"></div>
      </div>

      <input ref="minInputRef" type="range"
        class="range-min absolute w-full h-1.5 top-0.5 bg-transparent pointer-events-none appearance-none cursor-pointer z-30"
        :min="minValue" :max="maxValue" :value="internalMinPrice" @input="handleMinInput" :step="PRICE_GAP" />
      <input ref="maxInputRef" type="range"
        class="range-max absolute w-full h-1.5 top-0.5 bg-transparent pointer-events-none appearance-none cursor-pointer z-30"
        :min="minValue" :max="maxValue" :value="internalMaxPrice" @input="handleMaxInput" :step="PRICE_GAP" />
    </div>
    <div class="price-text flex justify-between mt-3">
      <div class="flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-900">
        <span>از قیمت:</span>
        <span class="text-neutral-600">{{
          formatPrice(internalMinPrice)
        }}</span>
        <span class="text-neutral-600">تومان</span>
      </div>
      <div class="flex items-center gap-1 text-sm font-semibold text-neutral-900">
        <span>تا:</span>
        <span class="text-neutral-600">{{
          formatPrice(internalMaxPrice)
        }}</span>
        <span class="text-neutral-600">تومان</span>
      </div>
    </div>
    <button type="button"
      class="apply-filter-btn bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-medium rounded-md mt-3 py-2.5 px-6 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md w-full md:w-auto"
      @click="applyFilter">
      اعمال فیلتر
    </button>
  </div>
</template>
<script setup>
const store = useProductsStore();
const priceRange = computed(() => store.getPriceFilter);
const titleSearch = computed(() => store.getTitleSearch);
let route = useRoute();
let router = useRouter();
const { addQuery } = useAddQuery();
const minInputRef = ref();
const maxInputRef = ref();
const progressRef = ref();
const PRICE_GAP = 100000;
const MIN_PRICE = priceRange.value?.min_price ?? 0;
const MAX_PRICE = priceRange.value?.max_price ?? 0;
const internalMinPrice = ref(MIN_PRICE);
const internalMaxPrice = ref(MAX_PRICE);
const minValue = ref(MIN_PRICE);
const maxValue = ref(MAX_PRICE);
const progressStyle = computed(() => {
  const rangeWidth = MAX_PRICE - MIN_PRICE;
  const minPercent = ((internalMinPrice.value - MIN_PRICE) / rangeWidth) * 100;
  const maxPercent = ((internalMaxPrice.value - MIN_PRICE) / rangeWidth) * 100;
  return {
    left: `${100 - maxPercent}%`,
    right: `${minPercent}%`,
  };
});
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const updateSlider = () => {
  nextTick(() => {
    if (progressRef.value) {
      const rangeWidth = MAX_PRICE - MIN_PRICE;
      const minPercent =
        ((internalMinPrice.value - MIN_PRICE) / rangeWidth) * 100;
      const maxPercent =
        ((internalMaxPrice.value - MIN_PRICE) / rangeWidth) * 100;
      progressRef.value.style.left = `${100 - maxPercent}%`;
      progressRef.value.style.right = `${minPercent}%`;
    }
  });
};
const handleMinInput = (e) => {
  let minVal = parseInt(e.target.value);
  const maxVal = internalMaxPrice.value;

  if (maxVal - minVal < PRICE_GAP) {
    internalMinPrice.value = maxVal - PRICE_GAP;
  } else {
    internalMinPrice.value = minVal;
  }
  updateSlider();
};
const handleMaxInput = (e) => {
  const minVal = internalMinPrice.value;
  let maxVal = parseInt(e.target.value);

  if (maxVal - minVal < PRICE_GAP) {
    internalMaxPrice.value = minVal + PRICE_GAP;
  } else {
    internalMaxPrice.value = maxVal;
  }
  updateSlider();
};
const applyFilter = () => {
  addQuery({
    title: titleSearch.value,
    min_price: internalMinPrice.value,
    max_price: internalMaxPrice.value,
  });
  // router.push({
  //   name: route.name,
  //   params: route.params,
  //   query: {
  //     ...route.query,
  //     title: titleSearch.value,
  //     min_price: internalMinPrice.value,
  //     max_price: internalMaxPrice.value,
  //   },
  // });
};
watch([internalMinPrice, internalMaxPrice], updateSlider, {
  immediate: true,
});
//چک کن اگه کوییری برای قیمت ها بود عدد های رنج قیمت را با انها یکی کن
onMounted(() => {
  if (route.query.min_price) {
    internalMinPrice.value = route.query.min_price;
  }
  if (route.query.max_price) {
    internalMaxPrice.value = route.query.max_price;
  }
});
</script>
<style scoped>
input[type="range"]::-webkit-slider-thumb {
  height: 14px;
  width: 14px;
  border-radius: 50% !important;
  background: black;
  pointer-events: auto;
  appearance: none;
  cursor: pointer;
  margin-top: -5px;
}

input[type="range"]::-moz-range-thumb {
  height: 14px;
  width: 14px;
  border-radius: 50% !important;
  background: black;
  pointer-events: auto;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-moz-range-track {
  height: 5px;
  background: transparent;
  border-radius: 3px;
}
</style>
