<template>
  <section class="container flex items-center gap-4">
    <div
      class="flex w-full mt-6 mb-4 sm:mb-0 items-center gap-3.5 overflow-auto"
      v-if="loading || !ready"
    >
      <ShareSkeleton
        v-for="index in 5"
        :key="index"
        class="min-w-[80px] lg:min-w-28 min-h-[80px] lg:min-h-28 rounded-[50%]!"
      />
    </div>
    <swiper
      v-else-if="stories.length"
      :modules="modules"
      :breakpoints="breakpoints"
      class="w-full mt-6 mb-4 sm:mb-0"
    >
      <SwiperSlide
        v-for="(item, index) in stories"
        :key="item.id ?? index"
        class="flex justify-center items-center"
      >
        <div
          class="active-story"
          :class="{
            'read-story':
              readStories.findIndex((itemIndex) => itemIndex == index) != -1,
          }"
        >
          <figure
            class="min-w-[80px] lg:min-w-24 min-h-[80px] lg:min-h-24 rounded-[50%] overflow-hidden relative story-box"
            @click="checkShowModal(item, index)"
          >
            <NuxtImg
              v-if="item?.cover_image?.url"
              class="w-full cursor-pointer h-full rounded-full"
              :src="item?.cover_image?.url"
              decoding="async"
              fetchpriority="high"
              format="webp"
              loading="eager"
              :alt="item?.title"
            />
            <ShareSkeleton
              v-else
              class="min-w-[80px] lg:min-w-24 min-h-[80px] lg:min-h-24 cursor-pointer rounded-full!"
            />
          </figure>
        </div>
      </SwiperSlide>
    </swiper>
  </section>
  <Transition name="fade">
    <StoriesModal
      v-if="showStories"
      :indexStories="indexStories"
      :list="stories"
      @closeModal="showStories = false"
    />
  </Transition>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
const store = useStoriesStore();
const readStories = computed(() => store.getReadStories);
const stories = computed(() => store.getStories);
const loading = computed(() => store.getLoadingStories);
const modules = [];
let ready = ref(false);
const breakpoints = ref({
  200: {
    slidesPerView: 2.5,
    spaceBetween: 10,
  },
  300: {
    slidesPerView: 3.5,
    spaceBetween: 10,
  },
  468: {
    slidesPerView: 4.5,
    spaceBetween: 10,
  },
  520: {
    slidesPerView: 5.5,
    spaceBetween: 10,
  },

  640: {
    slidesPerView: 6.5,
    spaceBetween: 10,
  },
  764: {
    slidesPerView: 7,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 8,
    spaceBetween: 15,
  },
  1150: {
    slidesPerView: 9,
    spaceBetween: 15,
  },
  1300: {
    slidesPerView: 10,
    spaceBetween: 15,
  },
});
if (stories.value == null) {
  useAsyncData(
    () => `Stories-fetch-${new Date()}`,
    async () => {
      await store.setStories();
      return { fetched: true };
    },
    { lazy: false },
  );
}

const showStories = ref(false);
let listStory = ref(null);
let indexStories = ref(0);

function checkShowModal(data, index) {
  listStory.value = data;

  indexStories.value = index;
  data?.items.length ? (showStories.value = true) : false;
  store.setReadStories(index);
}
onMounted(() => {
  ready.value = true;
});
</script>
<style scoped>
.active-story {
  display: inline-block;
  padding: 3px;
  border-radius: 50%;

  background: linear-gradient(45deg, #feda75 20%, #fa7e1e, #d62977, #962fbf);
}

.active-story.read-story {
  background: #c3c3c3;
  filter: grayscale(1);
}

.fade-enter-active {
  animation: fadeModal 0.5s ease 1;
}

.fade-leave-to {
  animation: fadeModal 0.5s ease 1 reverse;
}

@keyframes fadeModal {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
