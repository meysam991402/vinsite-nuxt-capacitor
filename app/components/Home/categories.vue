<script setup>
import { SwiperSlide } from "swiper/vue";
let dataTitleBox = ref({
  title: "دسته بندی ها",
  link: "/product-list",
  title_link: "مشاهده بیشتر",
});
const homeStore = useHomeStore();
let categories = computed(() => homeStore.getSpecialCategories);
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
const breakpoints = ref({
  300: {
    slidesPerView: 2.4,
    spaceBetween: 10,
  },

  480: {
    slidesPerView: 3.2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 4.2,
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
  1280: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  1400: {
    slidesPerView: 8,
    spaceBetween: 20,
  },
});
</script>
<template>
  <section class="container mt-8 mt-lg-10">
    <ShareTitleBox :data="dataTitleBox" v-if="loading || !ready" />
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6"
      v-if="loading || !ready"
    >
      <ShareSkeleton
        v-for="index in 2"
        :key="index"
        class="h-[148px] sm:h-[168px] sm:hidden w-full"
      />
      <ShareSkeleton
        v-for="index in 4"
        :key="index"
        class="h-[148px] sm:h-[168px] hidden sm:inline-block lg:h-[188px] w-full"
      />
    </div>
    <template v-else-if="categories && categories.length">
      <ShareTitleBox :data="dataTitleBox" />
      <Slider :breakpoints="breakpoints" class="w-full p-1!">
        <SwiperSlide
          class=""
          v-for="(category, index) in categories"
          :key="category?.id ?? index"
        >
          <nuxt-link
            :to="`/${category?.slug ?? ''}`"
            class="w-full d-flex d-flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(121,121,121,0.25)] bg-white p-6 hover:bg-gray-100/60 transition-all duration-300"
          >
            <figure class="w-full d-flex mb-2 rounded-full overflow-hidden">
              <NuxtImg
                class="w-full"
                format="webp"
                decoding="async"
                loading="lazy"
                :src="category?.image?.url ?? ''"
                :alt="category?.title ?? ''"
              />
            </figure>
            <span
              class="line-clamp-1 text-nowrap font-base text-neutral-600 text-center"
            >
              {{ category?.title ?? "" }}
            </span>
          </nuxt-link>
        </SwiperSlide>
      </Slider>
    </template>
  </section>
</template>
