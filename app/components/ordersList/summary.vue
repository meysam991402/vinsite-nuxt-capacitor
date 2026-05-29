<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center mb-1">
      <IconsOrderSvg class="size-7 *:fill-gray-500" />
      <span class="text-md font-bold text-gray-500">خلاصه سفارش</span>
    </div>
    <div class="flex gap-2 pe-2 text-sm">
      <span class="text-gray-600">آدرس:</span>
      <span>{{ selectedAddress?.address ?? "انتخاب نشده" }}</span>
    </div>
    <div class="flex gap-2 pe-2 text-sm">
      <span class="text-gray-600">شماره تماس:</span>
      <span>{{ selectedAddress?.mobile ?? "انتخاب نشده" }}</span>
    </div>

    <div class="orders flex flex-col gap-1 pe-2">
      <span class="text-gray-600 text-sm">سبد خرید:</span>
      <div class="order-items flex gap-2" v-if="carts && carts.length">
        <figure
          v-for="(item, index) in carts"
          :key="item?.id ?? index"
          class="relative border border-neutral-400 w-16 flex rounded-md overflow-hidden"
        >
          <NuxtImg
            format="webp"
            decoding="async"
            loading="lazy"
            class="w-full"
            :src="
              item?.images?.length
                ? item?.images[0]?.url
                : (item?.variety?.product?.main_image?.url ?? '')
            "
            :alt="item?.variety?.name ?? ''"
          />
          <span
            class="absolute bottom-0 left-0 bg-gray-100 p-1 text-neutral-600 text-xs rounded-sm"
          >
            {{ item?.quantity ?? "" }}
          </span>
        </figure>
      </div>
    </div>
  </div>
</template>
<script setup>
const storeCarts = useCartStore();
let carts = computed(() => storeCarts.getCarts);
let selectedAddress = computed(() => storeCarts.getSelectedAddress);
</script>
