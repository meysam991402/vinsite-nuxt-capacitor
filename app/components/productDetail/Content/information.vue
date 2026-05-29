<template>
  <div class="grow overflow-hidden pt-4 sm:pt-8">
    <div class="border-b border-gray-300 w-full pb-4">
      <div class="flex w-full items-center gap-2 justify-between">
        <h1 class="font-bold text-base sm:text-lg lg:text-xl">
          {{ product?.title ?? "" }}
        </h1>
        <div class="hidden lg:flex items-center gap-2">
          <ShareBtnFavorite :isFavorite="product?.is_favorite" :productId="product?.id" />
          <ShareBtnShare :title="product?.title ?? ''" />
        </div>
      </div>
      <ProductCardPrice class="w-fit gap-2 mt-4" them="detail-card" :price="productPrice" v-if="productPrice" />
    </div>

    <div class="flex flex-col gap-4 mt-4" v-if="product && attributes">
      <ProductDetailContentVarieties />
    </div>
    <div class="flex items-end justify-between">
      <ProductDetailContentAddQuantity @changQuantity="changQuantity" />
      <ProductDetailContentAddBuy class="mt-8 hidden lg:flex" />
    </div>
    <p v-if="selectedVariety" class="mt-4 text-green-600"
      :class="{ 'text-red-600': selectedVariety?.store?.balance == 0 }">
      {{ `موجودی در انبار ${selectedVariety?.store?.balance ?? "-"} عدد` }}
    </p>
    <div
      class="w-full fixed block lg:hidden bg-white inset-shadow-2xs inset-shadow-gray-300 bottom-0 py-4 px-2 left-0 z-800">
      <div class="flex lg:hidden items-center justify-between">
        <ProductCardPrice class="w-fit gap-2 flex-wrap" them="detail-card" :price="productPrice" v-if="productPrice" />
        <ProductDetailContentAddBuy class="flex lg:hidden" />
      </div>
      <template v-if="errorMessage.length">
        <p class="mt-3 sm:mt-4 text-red-600 flex items-center justify-center text-xs gap-1"
          v-for="(error, index) in errorMessage" :key="index">
          <span class="flex -translate-y-0.5">
            <IconsWarning class="stroke-red-600" />
          </span>
          <span>
            {{ error }}
          </span>
        </p>
      </template>
    </div>
  </div>
</template>
<script setup>
let store = useProductStore();
let storeCart = useCartStore();
let product = computed(() => store.getProduct);
let attributes = computed(() => store.productAttributes);
let productPrice = computed(() => store.getProductPrice);
let selectedVariety = computed(() => store.getSelectedVariety);
let errorMessage = computed(() => storeCart.getErrorMessages);
function changQuantity(quantity) {
  store.setSelectedQuantity(quantity);
}
</script>
