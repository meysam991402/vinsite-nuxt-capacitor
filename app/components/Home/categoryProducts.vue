<template>
  <section class="mt-8 lg:mt-10">
    <div class="container">
      <ShareTitleBox
        v-if="loading || !ready"
        :data="{
          title: 'محصولات',
          link: '/',
          title_link: 'مشاهده بیشتر',
        }"
      />
      <div
        v-if="loading || !ready"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6"
      >
        <ShareSkeleton
          v-for="index in 2"
          :key="index"
          class="h-[321px] sm:h-[325px] sm:hidden w-full"
        />
        <ShareSkeleton
          v-for="index in 3"
          :key="index"
          class="h-[370px] lg:h-[350px] hidden sm:inline-block w-full"
        />
      </div>
      <template v-else-if="data && data?.products.length">
        <ShareTitleBox
          :data="{
            title: data?.title ?? '',
            link: `product-list/${data?.slug}` ?? '/',
            title_link: 'مشاهده بیشتر',
          }"
        />
        <Slider :breakpoints="breakpoints" class="group">
          <SwiperSlide
            class="h-auto!"
            v-for="(product, index) in data.products"
            :key="product?.id ?? index"
          >
            <ProductCard
              :product="product"
              class="group-hover:not-[:hover]:scale-[.95] transition-all duration-300 ease-linear"
            />
          </SwiperSlide>
        </Slider>
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
    slidesPerView: 1.4,
    spaceBetween: 10,
  },
  360: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  520: {
    slidesPerView: 2.3,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.8,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 3.8,
    spaceBetween: 10,
  },
  1200: {
    slidesPerView: 4.3,
    spaceBetween: 10,
  },
  1300: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
});
</script>
