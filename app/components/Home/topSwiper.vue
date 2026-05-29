<script setup>
import { SwiperSlide } from "swiper/vue";
const homeStore = useHomeStore();
let sliders = computed(() => homeStore.getSliders);
let loading = computed(() => homeStore.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
const breakpoints = ref({
  300: {
    slidesPerView: 1,
    spaceBetween: 5,
  },
});
</script>

<template>
  <section class="container lg:mt-5">
    <ShareSkeleton
      v-if="loading || !ready"
      class="h-[235px] sm:h-[245px] md:h-[340px] lg:h-[377px] w-full"
    />
    <template v-else-if="sliders && sliders.length">
      <Slider
        class="lg:rounded-xl topSlider w-full"
        :pagination="true"
        :breakpoints="breakpoints"
      >
        <SwiperSlide
          class=""
          v-for="(slide, index) in sliders"
          :key="slide?.id ?? index"
        >
          <figure class="w-full d-flex">
            <!-- :to="slide?.link_url ?? ''" -->
            <ShareDynamicLinker
              :item="slide?.link"
              class="w-full d-flex lg:rounded-xl overflow-hidden"
            >
              <NuxtImg
                class="w-full hidden lg:flex"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                format="webp"
                :src="slide?.desktop_image?.url ?? ''"
                :alt="slide?.image_alt ?? ''"
              />
              <NuxtImg
                class="w-full flex lg:hidden"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                format="webp"
                :src="slide?.mobile_image?.url ?? ''"
                :alt="slide?.image_alt ?? ''"
              />
            </ShareDynamicLinker>
          </figure>
        </SwiperSlide>
      </Slider>
    </template>
  </section>
</template>
<style>
.topSlider .swiper-pagination {
  top: 20px !important;
  padding-right: 20px;
  height: fit-content;
  width: fit-content !important;
  right: 0;
}

.topSlider .swiper-pagination-bullet-active {
  background-color: white;
  width: 15px;
  border-radius: 10px;
}
</style>
