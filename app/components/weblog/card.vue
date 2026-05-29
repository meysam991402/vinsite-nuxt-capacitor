<template>
  <article
    class="w-full group bg-white hover:bg-gray-100/70 transition-all duration-500 rounded-t-xl overflow-hidden"
  >
    <nuxt-link :to="`/weblog-detail/${post?.slug ?? ''}`" class="">
      <figure class="w-full d-flex overflow-hidden">
        <NuxtImg
          :src="post?.image?.url ?? ''"
          :alt="post?.title"
          format="webp"
          loading="lazy"
          decoding="async"
          class="w-full group-hover:scale-105 transition-all duration-500"
        />
      </figure>
      <div class="blog-details flex flex-col gap-1 px-3 pb-3 mt-2">
        <div class="flex gap-1 px-2 items-center text-neutral-500">
          <span class="text-sm"> تاریخ انتشار: </span>
          <time class="text-sm" :datetime="post?.published_at ?? ''">{{
            persianDate(post?.published_at ?? "")
          }}</time>
        </div>
        <h4 class="font-bold text-base line-clamp-1">
          {{ post?.title ?? "" }}
        </h4>
        <p class="line-clamp-2 text-sm text-neutral-600">
          {{ post?.summary ?? "" }}
        </p>
      </div>
    </nuxt-link>
  </article>
</template>
<script setup>
import persianDate from "../../utils/setDatePersian.js";
defineProps({
  post: Object,
});
</script>
