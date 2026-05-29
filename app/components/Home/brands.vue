<template>
  <section class="mt-8 lg:mt-10">
    <div class="container">
      <ShareTitleBox
        :data="dataTitleBox"
        :line="false"
        v-if="loading || !ready"
      />
      <div
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
        v-if="loading || !ready"
      >
        <ShareSkeleton
          v-for="index in 2"
          :key="index"
          class="h-[100px] sm:h-[120px] sm:hidden w-full"
        />
        <ShareSkeleton
          v-for="index in 4"
          :key="index"
          class="h-[120px] md:h-[130px] lg:h-[150px] hidden sm:inline-block w-full"
        />
      </div>
      <template v-else-if="brands && brands.length">
        <ShareTitleBox :data="dataTitleBox" :line="false" />
        <Slider :breakpoints="breakpoints" class="group">
          <SwiperSlide
            class="h-auto!"
            v-for="(brand, index) in brands"
            :key="brand?.id ?? index"
          >
            <figure class="w-full flex">
              <nuxt-link
                class="flex w-full"
                :to="`/product-list?brand_id=${brand?.id ?? ''}`"
              >
                <NuxtImg
                  format="webp"
                  decoding="async"
                  loading="lazy"
                  :src="brand?.logo?.url"
                  :alt="brand?.name"
                />
              </nuxt-link>
            </figure>
          </SwiperSlide>
        </Slider>
      </template>
    </div>
  </section>
</template>
<script setup>
import { SwiperSlide } from "swiper/vue";
const homeStore = useHomeStore();
let brands = computed(() => homeStore.getBrandsData);
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
let dataTitleBox = ref({
  title: "برند ها",
});
const breakpoints = ref({
  200: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  360: {
    slidesPerView: 3.2,
    spaceBetween: 15,
  },
  480: {
    slidesPerView: 3.8,
    spaceBetween: 15,
  },
  520: {
    slidesPerView: 4.3,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 4.8,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 5.2,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
  1200: {
    slidesPerView: 6.5,
    spaceBetween: 20,
  },
  1300: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
});
</script>
