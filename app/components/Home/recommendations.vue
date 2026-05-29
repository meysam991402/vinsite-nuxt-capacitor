<template>
  <section class="mt-8 lg:mt-10">
    <div class="container p-5 lg:p-8 bg-neutral-100 rounded-2xl">
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
        <ShareTitleBox
          :line="false"
          :data="{
            title: data?.label ?? '',
            link: `/product-recommendation/${data?.id}` ?? '/',
            title_link: 'مشاهده بیشتر',
          }"
        />
        <div class="flex gap-4 items-center">
          <figure
            class="w-28 min-w-28 sm:w-40 sm:min-w-40 md:w-56 md:min-w-56 xl:w-72 flex rounded-xl overflow-hidden"
          >
            <NuxtImg
              format="webp"
              loading="lazy"
              class="w-full flex md:hidden"
              :src="data?.mobile_main_image?.url ?? ''"
              :alt="data?.label ?? ''"
            />
            <NuxtImg
              format="webp"
              loading="lazy"
              class="w-full hidden md:flex"
              :src="data?.desktop_main_image?.url ?? ''"
              :alt="data?.label ?? ''"
            />
          </figure>
          <Slider
            :breakpoints="breakpoints"
            :loop="data.products?.length >= 5 ? true : false"
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
    slidesPerView: 1.2,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },
  520: {
    slidesPerView: 2.1,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2.6,
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
