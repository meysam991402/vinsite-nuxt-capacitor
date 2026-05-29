<template>
  <template>
    <div
      class="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      <!-- بک‌گراند تار با عکس اصلی -->
      <div
        class="absolute inset-0 bg-cover bg-center blur-2xl opacity-50"
        :style="{ backgroundImage: `url(${option?.file?.url})` }"
        v-if="option?.file?.url"
      ></div>
      <!-- محتوای اصلی (عکس یا ویدیو) -->
      <div class="relative z-10 w-full h-full flex items-center justify-center">
        <figure
          v-if="option?.file?.type === 'image'"
          class="w-full h-full flex items-center justify-center"
        >
          <img
            class="max-w-full max-h-full select-none object-contain brightness-75"
            @load="onLoadedMetadata"
            :src="option?.file?.url"
            :alt="option?.file?.title"
            loading="lazy"
          />
          <!-- <NuxtImg class="max-w-full max-h-full select-none object-contain brightness-75"
                        @load="onLoadedMetadata" :src="option?.url ?? ''" :alt="option?.title ?? ''" decoding="async"
                        format="webp" loading="lazy" /> -->
        </figure>
        <video
          v-else-if="option?.file?.type === 'video'"
          class="max-w-full brightness-75 max-h-full select-none object-contain"
          ref="videoPlayer"
          :src="option?.file?.url"
          @loadedmetadata="onLoadedMetadata"
          playsinline
        >
          <!-- نیازی به source جدا نیست اگر src روی خود video tag باشه -->
        </video>
      </div>
      <!-- المان‌های دیگه مثل لینک و لایک -->
      <div
        class="absolute z-50 bottom-[8%] px-2 w-full flex items-center justify-between gap-2"
      >
        <a
          :href="option?.link ?? ''"
          class="text-white text-sm md:text-base line-clamp-1"
        >
          {{ option?.title ?? "" }}
        </a>
        <StoriesLike :option="option" :parentId="parentId" />
      </div>
    </div>
  </template>
</template>
<script setup>
let props = defineProps({
  option: Object,
  parentId: Number,
});
const emit = defineEmits("durationVideos");
let videoPlayer = ref(null);
const duration = ref(0);
const onLoadedMetadata = () => {
  if (props.option?.type == "video") {
    if (videoPlayer.value.duration > 180) {
      duration.value = 180 * 1000;
    } else {
      duration.value = videoPlayer.value?.duration * 1000;
    }
  } else {
    duration.value = 10000;
  }
  emit("durationVideos", duration.value);
};
onMounted(() => {
  if (props.option?.type == "video") {
    videoPlayer.value.play();
  }
});
</script>
