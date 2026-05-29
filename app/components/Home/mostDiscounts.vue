<template>
  <section class="mt-8 lg:mt-10">
    <div class="container">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6"
        v-if="loading || !ready"
      >
        <ShareSkeleton
          v-for="index in 2"
          :key="index"
          class="h-[253px] sm:h-[270px] sm:hidden w-full"
        />
        <ShareSkeleton
          v-for="index in 3"
          :key="index"
          class="h-[290px] lg:h-[320px] hidden sm:inline-block w-full"
        />
      </div>
      <template v-else-if="data && data?.products.length">
        <div
          class="flex sm:hidden justify-between items-center mb-4 w-auto p-6 bg-[#f20832] mask-size-full mask-no-repeat mask-[url('assets/images/homePage/instant-discount-responsive.svg')] bg-[url('assets/images/homePage/special-offer-bg-responsive.jpg')] bg-no-repeat bg-cover"
        >
          <IconsPercent class="col-span-1 size-20" />
          <div class="flex flex-col col-span-3 gap-4 items-center">
            <h2 class="text-xl font-bold text-white text-center">
              تخفیفات ویژه
            </h2>
            <client-only>
              <vue3-flip-countdown
                dir="ltr"
                :flipAnimation="true"
                :showLabels="true"
                countdownSize="16px"
                labelSize="14px"
                mainColor="var(--color-black)"
                labelColor="var(--color-white)"
                secondFlipColor="var(--color-black)"
                secondFlipBackgroundColor="var(--color-gray-200)"
                mainFlipBackgroundColor="var(--color-white)"
                :labels="{
                  days: 'روز',
                  hours: 'ساعت',
                  minutes: 'دقیقه',
                  seconds: 'ثانیه',
                }"
                :deadline="'2026-05-19 08:05'"
              />
            </client-only>
            <nuxt-link
              :to="`/product-recommendation/${data?.slug}` ?? '/'"
              class="text-white w-fit bg-red-700 hover:bg-red-800 ease-linear duration-300 rounded-xl text-sm py-2 px-4 flex gap-1 justify-center items-center"
            >
              <span>مشاهده همه</span>
              <IconsArrow class="animate-ping" />
            </nuxt-link>
          </div>
        </div>
        <div class="flex gap-4 md:gap-6 overflow-hidden rounded-2xl">
          <div
            class="hidden sm:flex bg-[#f20832] mask-[size:100%] mask-no-repeat mask-[url('assets/images/homePage/instant-discount.svg')] bg-[url('assets/images/homePage/special-offer-bg.jpg')] bg-no-repeat bg-cover min-w-[210px] md:min-w-[240px] flex-col py-6 px-3 md:px-6 gap-4 items-center justify-center"
          >
            <h2 class="text-2xl font-bold text-white text-center">
              تخفیفات ویژه
            </h2>
            <IconsPercent class="w-28 h-24" />
            <client-only>
              <vue3-flip-countdown
                dir="ltr"
                :flipAnimation="true"
                :showLabels="true"
                countdownSize="16px"
                labelSize="14px"
                mainColor="var(--color-black)"
                labelColor="var(--color-white)"
                secondFlipColor="var(--color-black)"
                secondFlipBackgroundColor="var(--color-gray-200)"
                mainFlipBackgroundColor="var(--color-white)"
                :labels="{
                  days: 'روز',
                  hours: 'ساعت',
                  minutes: 'دقیقه',
                  seconds: 'ثانیه',
                }"
                :deadline="'2026-05-19 08:05'"
              />
            </client-only>
            <nuxt-link
              :to="`/product-recommendation/${data?.slug}` ?? '/'"
              class="text-white bg-red-700 hover:bg-red-800 ease-linear duration-300 rounded-xl text-sm py-2 px-4 flex gap-1 justify-center items-center"
            >
              <span>مشاهده همه</span>
              <IconsArrow class="animate-ping" />
            </nuxt-link>
          </div>
          <Slider
            :breakpoints="breakpoints"
            :loop="false"
            class="group flex-grow-1"
          >
            <SwiperSlide
              class="h-auto!"
              v-for="(product, index) in data.products"
              :key="product?.id ?? index"
            >
              <ProductCard
                :product="product"
                class="group-hover:not-[:hover]:scale-[.95] transition-all duration-300 ease-linear bg-white"
              />
            </SwiperSlide>
          </Slider>
        </div>
      </template>
    </div>
  </section>
</template>
<script setup>
import { SwiperSlide } from "swiper/vue";
const homeStore = useHomeStore();
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
defineProps({
  data: Object,
});
const breakpoints = ref({
  200: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  360: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  520: {
    slidesPerView: 2.6,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3.1,
    spaceBetween: 10,
  },
  1200: {
    slidesPerView: 3.5,
    spaceBetween: 10,
  },
  1300: {
    slidesPerView: 4.1,
    spaceBetween: 15,
  },
});
</script>
<style>
.flip-card__bottom {
  border: unset !important;
  border-top: unset !important;
}
@media (max-width: 767px) {
  .flip-clock__card .flip-card {
    font-size: 14px !important;
  }
  .flip-clock__slot {
    font-size: 12px !important;
  }
}
@media screen and (max-width: 640px) {
  .flip-clock {
    margin: unset !important;
  }
}
</style>
