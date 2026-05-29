<template>
  <div class="w-full lg:w-[34%] relative">
    <div
      class="absolute bg-white/60 rounded-full py-2 px-1 backdrop-blur-[5px] top-2 left-2 z-50 flex lg:hidden flex-col items-center gap-2"
    >
      <ShareBtnFavorite />
      <ShareBtnShare />
    </div>
    <div>
      <swiper
        :speed="2000"
        @swiper="onSwiper"
        :modules="modules"
        class="mySwiper slider"
      >
        <SwiperSlide
          class="cursor-zoom-in"
          v-for="(item, index) in allImagesProduct"
          :key="index"
          @click="showImg(index)"
        >
          <figure class="w-full flex">
            <NuxtImg
              format="webp"
              decoding="async"
              loading="lazy"
              class="w-full"
              :src="item?.url ?? ''"
              :alt="route?.slug ?? ''"
            />
          </figure>
        </SwiperSlide>
      </swiper>
      <!-- <figure
        class="w-full flex"
        @click="showImg(currentIndex)"
        v-if="mainImage"
      >
        <NuxtImg
          format="webp"
          decoding="async"
          loading="lazy"
          class="w-full"
          :src="mainImage?.url ?? ''"
          alt="test"
        />
      </figure> -->
      <VueEasyLightbox
        :visible="visible"
        :moveDisabled="false"
        :pinchDisabled="false"
        :imgs="allImagesProduct.map((i) => i.url)"
        :index="currentIndex"
        @hide="visible = false"
      />
    </div>
    <div class="w-full overflow-auto flex items-center gap-4 py-4">
      <figure
        class="w-full flex min-w-[80px] max-w-[80px] p-1 opacity-60 rounded-md overflow-hidden"
        v-for="(item, index) in allImagesProduct"
        :key="index"
        @click="setMainImage(item, index)"
        @mouseenter="setMainImage(item, index)"
        :class="{
          'border border-solid border-black opacity-100': activeImage == index,
        }"
      >
        <NuxtImg
          format="webp"
          decoding="async"
          loading="lazy"
          class="w-full rounded-md overflow-hidden"
          :src="item?.url ?? ''"
          :alt="route?.slug ?? ''"
        />
      </figure>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
const store = useProductStore();
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// const product = computed(() => store.getProduct);
// const selectedVariety = computed(() => store.getSelectedVariety);
const mainImage = computed(() => store.getMainImage);
let route = useRoute();
let allImagesProduct = computed(() => store.getAllImagesProduct);
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
const modules = ref([]);
const visible = ref(false);
const currentIndex = ref(0);
const activeImage = ref(0);
const thumbsSwiper = ref(null);
function onSwiper(swiper) {
  thumbsSwiper.value = swiper;
}
watch(
  () => mainImage.value,
  (newImage) => {
    let index = allImagesProduct.value.findIndex(
      (item) => item.id == newImage.id,
    );
    thumbsSwiper.value.slideTo(index);
    activeImage.value = index;
    currentIndex.value = index;
  },
);
function showImg(i) {
  currentIndex.value = i;
  visible.value = true;
}
function setMainImage(item, index) {
  activeImage.value = index;
  currentIndex.value = index;
  store.setMainImage(item);
  thumbsSwiper.value.slideTo(index);
}
</script>
