<template>
  <div
    id="modal"
    :style="`opacity:${opacity}`"
    class="w-[100vw] h-[100vh] grid place-items-center fixed top-0 right-0 z-1000 bg-black"
    @click.self="emit('closeModal')"
  >
    <div
      class="max-w-screen min-w-screen sm:max-w-[600px] lg:max-w-[800px] sm:min-w-[400px] lg:min-w-[600px] h-screen sm:h-[90vh]"
    >
      <swiper
        :modules="modules"
        :slides-per-view="1"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          v-for="(slide, index) in list"
          :key="index"
          :initial-slide="CurrentIndex"
        >
          <StoriesStoryBox
            v-if="index == CurrentIndex"
            @closeModal="emit('closeModal')"
            class="meysam"
            @changeOpacity="changeOpacity"
            @onSlideChange="onSlideChange"
            :indexStories="CurrentIndex"
            :list="slide"
            :parentId="slide.id"
          />
        </SwiperSlide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
const store = useStoriesStore();
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCube, Pagination, Navigation } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";
const modules = [EffectCube, Pagination, Navigation];
const emit = defineEmits(["closeModal"]);
let props = defineProps({
  list: Array,
  indexStories: {
    type: Number,
    defaults: 0,
  },
});
let opacity = ref(1);
let CurrentIndex = ref(props.indexStories);
let swiperObject = ref(null);
function changeOpacity(e) {
  opacity.value = e;
}
const onSwiper = (swiper) => {
  swiperObject.value = swiper;
  swiperObject.value.slideTo(CurrentIndex.value);
};
function onSlideChange(slide) {
  let index = slide.activeIndex;
  if (index < 0) {
    // emit("closeModal")
  } else if (index <= props.list.length - 1) {
    CurrentIndex.value = index;
    swiperObject.value.slideTo(CurrentIndex.value);
    store.setReadStories(index);
  } else {
    emit("closeModal");
  }
}
</script>
<style scoped>
button.active::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 100%;
  background-color: #fff;
  animation: moveSlide linear forwards;
  animation-duration: v-bind(maxTimePlay + "ms");
}

@keyframes moveSlide {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
<style>
.swiper-cube {
  overflow: hidden;
}

.swiper-cube .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: #fff;
  /* این پس‌زمینه ممکن است لازم باشد یا نباشد */
}
</style>
