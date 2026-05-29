<template>
  <article
    class="w-full relative border border-solid border-gray-300 rounded-xl overflow-hidden p-1.5 h-full"
  >
    <ShareBtnFavorite
      :productId="product?.id ?? ''"
      :isFavorite="product?.is_favorite"
      class="absolute top-2 right-2 z-10 backdrop-blur-[5px] bg-white/60! rounded-full p-1"
    />
    <NuxtLink :to="`/product/${product?.slug ?? ''}`" class="w-full">
      <ProductCardDiscount
        :price="product?.final_price"
        v-if="
          product && product?.final_price && product?.final_price?.discount != 0
        "
      />
      <figure class="w-full">
        <NuxtImg
          v-if="product?.main_image?.url"
          class="w-full rounded-lg"
          :src="product?.main_image?.url ?? ''"
          format="webp"
          loading="lazy"
          decoding="async"
          alt="pro-mobile"
        />
        <ShareSkeleton
          v-else
          class="w-full h-[150px] sm:h-[200px] md:h-[250px]"
        />
      </figure>
      <div class="px-2 py-3">
        <h3
          class="line-clamp-1 font-bold mb-1.5 text-sm md:text-base text-gray-700"
        >
          {{ product?.title ?? "" }}
        </h3>
        <ProductCardPrice
          class="text-wrap"
          :price="product?.final_price"
          v-if="product && product?.final_price"
        />
      </div>
    </NuxtLink>
  </article>
</template>
<script setup>
defineProps({
  product: Object,
});
</script>
