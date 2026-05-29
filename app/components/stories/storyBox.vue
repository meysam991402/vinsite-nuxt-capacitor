<template>
  <div
    ref="storyContent"
    @keydown="stopStory"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    :style="`transform: rotateX(${rotateBox}deg) scale(${scale});`"
    class="max-w-full sm:max-w-[600px] lg:max-w-[800px] h-screen sm:h-[90vh] overflow-hidden relative"
  >
    <button
      class="prev w-[30%] md:w-[20%] z-20 absolute top-0 right-0 h-full bg-transparent"
      @click="setCurrentSlide('prev')"
    ></button>
    <div class="w-full h-full relative">
      <div class="absolute z-30 right-0 w-full">
        <div class="flex px-2 items-center gap-1 h-10 w-full top-0">
          <button
            v-for="(item, index) in list?.items"
            :key="item.id ?? index"
            @click="changeCurrentIndex(index)"
            class="h-0.5 relative bg-[#ffffffa5]"
            :class="{
              '!bg-[#fff]': currentSlide > index,
              active: currentSlide == index,
            }"
            :style="{
              width: `calc(100% / ${list?.items.length})`,
              '--time': maxTimePlay + 'ms',
            }"
          ></button>
        </div>
        <div class="flex items-center justify-between gap-3 mx-2">
          <div class="flex items-center gap-3.5">
            <figure class="size-14 overflow-hidden rounded-full flex">
              <NuxtImg
                v-if="list?.cover_image?.url"
                class="w-full h-full"
                :src="list?.cover_image?.url ?? ''"
                :alt="list?.title ?? ''"
                decoding="async"
                format="webp"
                loading="lazy"
              />
              <ShareSkeleton v-else class="w-full h-full" />
            </figure>
            <h6 class="text-white">{{ list?.title ?? "" }}</h6>
          </div>
          <button @click="emit('closeModal')">
            <IconsArrowTop class="*:stroke-white -rotate-90 w-7 h-w-7" />
          </button>
        </div>
      </div>
      <template v-for="(item, index) in list?.items" :key="item.id ?? index">
        <StoriesStory
          class="h-full flex items-center justify-center"
          @durationVideos="durationVideos"
          v-if="currentSlide == index"
          :option="item"
          :parentId="parentId"
        />
      </template>
    </div>
    <button
      class="next w-[30%] md:w-[20%] z-20 absolute top-0 left-0 h-full bg-transparent"
      @click="setCurrentSlide('next')"
    ></button>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const emit = defineEmits(["closeModal", "onSlideChange", "changeOpacity"]);
let props = defineProps({
  list: Object,
  parentId: Number,
  indexStories: {
    type: Number,
    defaults: 0,
  },
});
let rotateBox = ref(0);
let opacity = ref(1);
let scale = ref(1);
let maxTimePlay = ref(100000000);
let baseTimePlay = ref(100000000);
function durationVideos(time) {
  if (+time > baseTimePlay.value) {
    maxTimePlay.value = time;
    startInterval(props.list?.items.length - 1);
  } else {
    maxTimePlay.value = baseTimePlay.value;
    startInterval(props.list?.items.length - 1);
  }
}
let currentSlide = ref(0);

let intervalId = null; // اینجا تعریف می‌کنیم که دسترسی بهش تو همه تابع‌ها باشه

// پاک کردن تایمر اسلاید
function clearExistingInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
// شروع اسلاید
function startInterval(count) {
  clearExistingInterval();
  intervalId = setInterval(() => {
    if (currentSlide.value < count) {
      currentSlide.value += 1;
    } else {
      clearExistingInterval();
      emit("onSlideChange", { activeIndex: props.indexStories + 1 });
    }
  }, maxTimePlay.value);
}
function stopStory() {
  clearExistingInterval();
}
// بازدن دکمه های که در بالای صفحه مشخص میشه چقدر زمان یک اسلاید پر شده اگه چند اسلاید جلوتر زده بشه میره اون اسلاید
function changeCurrentIndex(index) {
  currentSlide.value = index;
  startInterval(props.list?.items.length - 1);
}
// براساس ایکه دکمه ققبل یا بعد رو میزنی صرفا یک اسلاید میره جلو
function setCurrentSlide(type) {
  if (type === "next") {
    if (currentSlide.value < props.list?.items.length - 1) {
      currentSlide.value++;
      startInterval(props.list?.items.length - 1);
    } else {
      emit("onSlideChange", { activeIndex: props.indexStories + 1 });
    }
  } else {
    if (currentSlide.value == 0) {
      emit("onSlideChange", { activeIndex: props.indexStories - 1 });
    } else if (currentSlide.value > 0) {
      currentSlide.value -= 1;
      startInterval(props.list?.items.length - 1);
    }
  }
}
const startY = ref(0);
const diffY = ref(0);
const startX = ref(0);

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY;
  startX.value = e.touches[0].clientX;
};

const onTouchMove = (e) => {
  const currentY = e.touches[0].clientY;
  diffY.value = currentY - startY.value;
  emit("changeOpacity", opacity.value);
  if (diffY.value < 0) {
    rotateBox.value = Math.abs(diffY.value) > 90 ? 90 : diffY.value;
    scale.value = 1 - Math.abs(diffY.value) / 200;
    opacity.value = 1 - Math.abs(diffY.value) / 200;
    if (Math.abs(diffY.value) > 90) {
      emit("closeModal");
    }
  }
};
const onTouchEnd = () => {
  startY.value = 0;
  diffY.value = 0;
  rotateBox.value = 0;
  opacity.value = 1;
  scale.value = 1;
  emit("changeOpacity", opacity.value);
};
onMounted(() => {
  startInterval(props.list?.items.length - 1);
});

onBeforeUnmount(() => {
  clearExistingInterval();
});
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
  animation-duration: var(--time);
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
}
</style>
