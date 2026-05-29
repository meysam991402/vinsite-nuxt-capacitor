<script setup>
let router = useRouter();
const { $swal } = useNuxtApp();

const storeCarts = useCartStore();
let carts = computed(() => storeCarts.getCarts);
let cartsCount = computed(() => storeCarts.getCartsCount);
let cartsLoading = computed(() => storeCarts.getCartsLoading);
let disabled = ref(false);
storeCarts.requestCarts();

function deleteAllProductsInCart() {
  $swal
    .fire({
      title: `آیا میخواهید  تمامی محصولات  را از سبد خرید خود حذف کنید؟`,

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
        storeCarts.deleteAllCarts();
      }
    });
}
function nextStep() {
  if (carts.value && carts.value.length) {
    router.push("/orders-list/step2");
  } else {
    disabled.value = true;
  }
}
</script>

<template>
  <template v-if="cartsLoading">
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 mt-8">
      <div class="mt-1 w-full lg:w-7/12 flex flex-col gap-5 px-1">
        <ShareSkeleton class="w-full h-36" v-for="i in 6" :key="i" />
      </div>
      <div
        class="sticky top-24 w-full lg:w-5/12 flex flex-col mt-3 lg:mt-0 gap-2 h-fit"
      >
        <ShareSkeleton class="w-full h-56" />
      </div>
    </div>
  </template>
  <section class="shipping-cart mt-12 gap-3 mb-4" v-else>
    <div
      v-if="carts && carts.length"
      class="flex flex-col lg:flex-row w-full gap-4 lg:gap-8 mt-1"
    >
      <div class="product-list mt-1 w-full lg:w-7/12 flex flex-col gap-5 px-1">
        <div class="shippingCart-info flex justify-between">
          <div class="flex items-center gap-3 text-primary-300">
            <h5 class="font-bold text-md">سبد خرید شما</h5>
            <span class="text-sm text-primary-400"
              >{{ cartsCount ?? 0 }} کالا</span
            >
          </div>
          <button
            @click="deleteAllProductsInCart"
            class="delete-allProducts group flex items-center gap-1 hover:text-red-600"
            type="button"
          >
            <span class="text-sm">حذف کل سبد خرید</span>

            <IconsTrash
              class="w-[23px] h-[23px] stroke-gray-400 group-hover:stroke-red-600"
            />
          </button>
        </div>
        <OrdersListCartItem
          v-for="(product, index) in carts"
          :key="product?.id ?? index"
          :cart="product"
        />
      </div>
      <div
        class="price-details sticky top-24 w-full lg:w-5/12 flex flex-col mt-3 lg:mt-0 gap-2 h-fit bg-neutral-50 rounded-lg p-5"
      >
        <h6 class="text-lg font-bold text-primary-300">صورت حساب</h6>
        <OrdersListFactor />
        <button
          @click="nextStep"
          :class="{ 'opacity-50 cursor-not-allowed': disabled }"
          :disabled="disabled"
          to="/orders-list/step2"
          class="flex justify-center w-full md:w-1/2 lg:w-4/5 mx-auto font-extrabold py-2 mt-5 rounded-md bg-black text-white hover:bg-neutral-700 active:translate-y-0.5"
        >
          <span v-if="disabled">درحال بارگزاری</span>
          <span v-else>ادامه فرآیند خرید</span>
        </button>
      </div>
    </div>
    <div
      v-else
      class="empty-cart mt-10 lg:mt-20 flex flex-col gap-4 justify-center items-center"
    >
      <IconsEmptyCart class="size-[200px]" />
      <h2 class="text-lg font-bold text-gray-600 text-center">
        سبد خرید شما خالیست!
      </h2>
    </div>
  </section>
</template>
