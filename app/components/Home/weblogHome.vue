<script setup>
import { SwiperSlide } from "swiper/vue";
const homeStore = useHomeStore();
let posts = computed(() => homeStore.getPostsData);
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
let dataTitleBox = ref({
  title: "وبلاگ",
  link: "/weblog-list",
  title_link: "مشاهده بیشتر",
});
const breakpoints = ref({
  300: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },

  480: {
    slidesPerView: 2.2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.8,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3.2,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 3.5,
    spaceBetween: 15,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
});
</script>
<template>
  <section class="container mt-8 mt-lg-10 weblog-swiper">
    <ShareTitleBox v-if="loading || !ready" :data="dataTitleBox" />
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6" v-if="loading || !ready">
      <ShareSkeleton v-for="index in 2" :key="index" class="h-[220px] sm:h-[240px] sm:hidden w-full" />
      <ShareSkeleton v-for="index in 3" :key="index" class="h-[260px] lg:h-[280px] hidden sm:inline-block w-full" />
    </div>
    <template v-else-if="posts && posts.length">
      <ShareTitleBox :data="dataTitleBox" />
      <Slider :breakpoints="breakpoints" class="w-full pb-4!">
        <SwiperSlide class="" v-for="(post, index) in posts" :key="post?.id ?? index">
          <WeblogCard :post="post" />
        </SwiperSlide>
      </Slider>
    </template>
  </section>
</template>
<!-- <style>
.weblog-swiper .swiper-pagination {
  bottom: -10px;
}
</style> -->
