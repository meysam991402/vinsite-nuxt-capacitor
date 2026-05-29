<template>
  <swiper
    :autoplay="
      autoplay
        ? {
            delay: 2500,
            disableOnInteraction: false,
          }
        : false
    "
    :breakpoints="breakpoints"
    :speed="2000"
    :loop="loop && ready ? true : false"
    :navigation="navigation"
    :centeredSlides="centeredSlides"
    :pagination="
      pagination
        ? {
            clickable: true,
          }
        : false
    "
    @swiper="onSwiper"
    :modules="modules"
    class="mySwiper slider"
  >
    <slot />
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const modules = ref([Autoplay, Pagination, Navigation]);
let ready = ref(false);
defineProps({
  breakpoints: {
    type: Object,
    default: {
      300: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  navigation: {
    type: Boolean,
    default: false,
  },
  centeredSlides: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },

  loop: {
    type: Boolean,
    default: false,
  },
});
function onSwiper(swiper) {
  swiper.update(); // این کار می‌کنه اسلایدها بعد از لود آپدیت بشن
}
onMounted(() => {
  ready.value = true;
});
</script>

<style></style>
