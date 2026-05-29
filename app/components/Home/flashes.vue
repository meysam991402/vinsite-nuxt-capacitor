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
      <template v-else-if="data && data?.products?.length">
        <div class="flex overflow-hidden items-stretch rounded-2xl">
          <div
            class="relative flex min-w-[150px] md:min-w-[250px] flex-col py-6 px-3 md:px-6 gap-6 items-center justify-center bg-cyan-900 before:absolute border-l-4 border-l-white border-dashed before:z-10 before:-top-5 before:-left-5 before:bg-white before:w-10 before:h-10 before:rounded-full after:absolute after:z-10 after:-bottom-5 after:-left-5 after:bg-white after:w-10 after:h-10 after:rounded-full"
          >
            <h2 class="text-lg md:text-xl font-bold text-white text-center">
              {{ data?.title }}
            </h2>
            <figure
              class="w-36 min-w-36 sm:w-44 sm:min-w-44 md:w-56 md:min-w-56 flex rounded-xl overflow-hidden"
            >
              <NuxtImg
                format="webp"
                loading="lazy"
                class="w-full flex md:hidden"
                :src="data?.mobile_image?.url ?? ''"
                :alt="data?.label ?? ''"
              />
              <NuxtImg
                format="webp"
                loading="lazy"
                class="w-full hidden md:flex"
                :src="data?.desktop_image?.url ?? ''"
                :alt="data?.label ?? ''"
              />
            </figure>
            <client-only>
              <vue3-flip-countdown
                dir="ltr"
                :flipAnimation="true"
                :showLabels="true"
                countdownSize="16px"
                labelSize="14px"
                mainColor="var(--color-cyan-900)"
                labelColor="var(--color-cyan-200)"
                secondFlipColor="var(--color-cyan-100)"
                mainFlipBackgroundColor="var(--color-cyan-50)"
                secondFlipBackgroundColor="var(--color-cyan-600)"
                :labels="{
                  days: 'روز',
                  hours: 'ساعت',
                  minutes: 'دقیقه',
                  seconds: 'ثانیه',
                }"
                :deadline="data?.end_at"
              />
            </client-only>
          </div>
          <Slider
            :breakpoints="breakpoints"
            :loop="false"
            class="group flex-grow-1 bg-cyan-100/30 p-6! pr-0! sm:pr-6!"
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
            <SwiperSlide class="h-auto!">
              <nuxt-link
                :to="`/flashes/${data?.slug}` ?? '/'"
                class="text-cyan-900 w-full bg-cyan-700/10 rounded-xl text-base md:text-lg h-full flex gap-1 justify-center items-center"
              >
                <span>مشاهده همه</span>
                <IconsArrow class="animate-ping" />
              </nuxt-link>
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
    spaceBetween: 6,
  },

  400: {
    slidesPerView: 1.1,
    spaceBetween: 6,
  },
  480: {
    slidesPerView: 1.5,
    spaceBetween: 10,
  },
  520: {
    slidesPerView: 1.9,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.2,
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
  .flip-card__back-bottom,
  .flip-card__back:after,
  .flip-card__back:before,
  .flip-card__bottom,
  .flip-card__top {
    width: 26px !important;
    font-size: 14px !important;
  }
  .flip-clock__slot {
    font-size: 10px !important;
  }
}
</style>
