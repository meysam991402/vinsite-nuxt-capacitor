<template>
  <article
    :class="{
      'pointer-events-none opacity-50 cursor-not-allowed!': deleteLoader,
    }"
    v-if="cart"
    class="product-item bg-neutral-50 flex flex-col p-4 gap-2 relative rounded-lg shadow-md"
  >
    <button
      @click="deleteAproduct()"
      class="delete-product group absolute left-[15px] top-[15px] rounded-full"
      type="button"
    >
      <IconsTrash
        class="w-[20px] h-[20px] stroke-gray-400 group-hover:stroke-red-600"
      />
    </button>
    <div class="flex gap-2 items-center">
      <figure>
        <a to="/product-detail" class="flex w-32 rounded-lg overflow-hidden">
          <NuxtImg
            format="webp"
            decoding="async"
            loading="lazy"
            class="product-item-img w-full"
            :src="
              cart?.variety?.images.length
                ? cart?.variety?.images[0]?.url
                : cart?.variety?.product?.main_image?.url
            "
            :alt="cart?.variety?.product?.title ?? ''"
          />
        </a>
      </figure>

      <div class="flex flex-col gap-2 justify-between pt-4 pb-4">
        <h3 class="text-md lg:text-lg font-bold text-gray-700">
          {{ cart?.variety?.product?.title ?? "" }}
        </h3>
        <p
          class="text-sm lg:text-md text-gray-500"
          v-for="(item, index) in makeArry(cart?.variety?.name ?? '')"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="price flex justify-around rounded-sm border border-gray-200">
      <ProductCardPrice
        class="w-fit gap-2 mt-4"
        them="detail-card"
        :price="cart?.variety?.final_price ?? {}"
        v-if="cart?.variety?.final_price"
      />

      <div class="counter flex justify-center items-center text-lg gap-4">
        <button
          type="button"
          :disabled="cart?.quantity >= cart?.variety?.quantity || countLoader"
          :class="{
            'opacity-40 cursor-not-allowed':
              cart?.quantity >= cart?.variety?.quantity || countLoader,
          }"
          class="add-btn flex justify-center items-center border border-gray-200 text-neutral-500 P-2 text-xl"
          @click="counter('increment', cart?.id)"
        >
          <IconsPlus class="size-5 lg:size-6" />
        </button>

        <span v-if="countLoader" class="loader"></span>
        <span v-else class="count text-sm lg:text-md">{{
          cart?.quantity ?? ""
        }}</span>
        <button
          type="button"
          class="remove-btn flex justify-center items-center border border-gray-200 text-neutral-500 P-2 text-xl"
          @click="counter('decrement', cart?.id)"
          :disabled="cart?.quantity == 1 || countLoader"
          :class="{
            'opacity-40 cursor-not-allowed': cart?.quantity == 1 || countLoader,
          }"
        >
          <IconsMinus class="size-5 lg:size-6" />
        </button>
      </div>
    </div>
  </article>
</template>
<script setup>
import makeArry from "~/utils/errorString.js";
const { $swal } = useNuxtApp();
const storeCarts = useCartStore();
let countLoader = computed(() => storeCarts.getCountLoader);
let deleteLoader = computed(() => storeCarts.getDeleteLoader);
let props = defineProps({
  cart: Object,
});

function counter(type, id) {
  storeCarts.updateCarts(id, type);
}
function deleteAproduct() {
  $swal
    .fire({
      title: `آیا میخواهید محصول ${props.cart?.variety?.product?.title ?? ""} را از سبد خرید خود حذف کنید؟`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b34614",
      cancelColor: "#ff0000",
      cancelButtonColor: "#047d04",
      confirmButtonText: "بله حذف کن",
      cancelButtonText: "خیر",
    })
    .then((result) => {
      if (result.isConfirmed) {
        storeCarts.deleteCarts(props?.cart?.id);
      }
    });
}
</script>
