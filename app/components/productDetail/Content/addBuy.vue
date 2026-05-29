<template>
  <div class="flex-col items-center">
    <button ref="addBtn" @click="addToCard" :disabled="translateStatus(productStatus).disable || disabled" :class="[
      { 'bg-black! opacity-100': productStatus == 'available' },
      translateStatus(productStatus).style,
      { 'opacity-50!': disabled },
    ]" class="py-2 px-4 lg:px-8 text-sm lg:text-base text-nowrap bg-black text-white rounded-lg">
      <span v-if="disabled">
        <ShareLoaderBtn />
      </span>
      <template v-else>
        <span v-if="productStatus == 'available'"> افزودن به سبد خرید </span>
        <span v-else>
          {{ translateStatus(productStatus)?.title ?? "" }}
        </span>
      </template>
    </button>
    <template v-if="errorMessage.length">
      <p class="mt-3 sm:mt-4 text-red-600 hidden sm:flex items-center justify-center text-sm gap-1"
        v-for="(error, index) in errorMessage" :key="index">
        <span class="flex -translate-y-0.5">
          <IconsWarning class="stroke-red-600" />
        </span>
        <span>
          {{ error }}
        </span>
      </p>
    </template>
    <Teleport to="body">
      <Transition name="fade">
        <Modal @close="storeCart.setModalDetail(false)" v-if="modalDetail">
          <div class="p-5 w-[95%] sm:w-[500px] max-w-[95%] sm:max-w-[500px] bg-white rounded-3xl">
            <div class="flex items-center justify-between border-b border-b-gray-400 pb-2">
              <h4 class="text-lg font-bold">به سبد خرید اضافه شد</h4>
              <button @click="storeCart.setModalDetail(false)">
                <IconsDeleted color="#000" class="w-6 h-6" />
              </button>
            </div>
            <div class="flex items-center gap-5 border-b border-b-gray-400 pb-2 mt-2">
              <figure class="w-[80px] min-[350px]:w-[100px] sm:w-[190px]">
                <NuxtImg format="webp" decoding="async" loading="lazy" class="w-full" :src="mainImage?.url ?? ''"
                  :alt="route?.slug ?? ''" />
              </figure>

              <div class="grow">
                <h3 class="mb-1.5 text-center font-bold  text-sm sm:text-base">
                  {{ selectedVariety?.product_title ?? "" }}
                </h3>
                <ul class="flex flex-col gap-1.5">
                  <li class="w-full flex justify-center">
                    <ProductCardPrice class="w-fit gap-2 flex-wrap **:text-sm **:sm:text-base" them="detail-card"
                      :price="selectedVariety?.final_price ?? {}" v-if="selectedVariety?.final_price" />
                  </li>
                  <li v-for="(item, index) in selectedVariety?.attributes.length
                    ? selectedVariety?.attributes
                    : []" :key="item?.id ?? index" class="flex gap-1 w-full text-sm sm:text-base">
                    <span class="text-gray-500">{{
                      `${item?.label ?? ""} :`
                    }}</span>
                    <span>{{ item?.pivot?.value ?? "" }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full flex justify-between gap-2 items-center mt-2.5">
              <button class="bg-blue-600 text-white px-2.5 py-1 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                @click="storeCart.setModalDetail(false)">
                ادامه فرایند خرید
              </button>
              <button class="bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 text-sm sm:text-base"
                @click="changeRoute">
                رفتن به سبد خرید
              </button>
            </div>
          </div>
        </Modal>
      </Transition>
    </Teleport>
  </div>
</template>
<script setup>
import translateStatus from "~/utils/tarnslateStatus";
let router = useRouter();
let route = useRoute();
let storeLogin = useUserStore();
let storeVariety = useProductStore();
let storeCart = useCartStore();
let login = computed(() => storeLogin.getLogin);
let selectedVariety = computed(() => storeVariety.getSelectedVariety);
let selectedQuantity = computed(() => storeVariety.getSelectedQuantity);
let productStatus = computed(() => storeVariety.getProductStatus);
let mainImage = computed(() => storeVariety.getMainImage);
let modalDetail = computed(() => storeCart.getModalDetail);
let disabled = computed(() => storeCart.getDisabledBtn);
let errorMessage = computed(() => storeCart.getErrorMessages);
// let counter = ref(1);
// watch(()=>route,(newVal)=>{

// })
onMounted(() => {
  storeCart.setErrorMessages([]);
});
function changeRoute() {
  storeCart.setModalDetail(false);
  router.push("/orders-list");
}
let addBtn = ref(null);
if (process.client) {
  watch(
    () => login.value,
    (newLogin, oldLogin) => {
      // فقط وقتی از لاگ‌آوت به لاگین واقعی برویم

      if (!oldLogin && newLogin && selectedVariety.value) {
        // counter.value++;
        setTimeout(() => {
          addBtn.value.click();
          // storeCart.addToCart(selectedVariety.value, selectedQuantity.value);
        }, 300);
      }
    },
  );
}
function addToCard() {
  if (selectedVariety.value == null) {
    storeCart.setErrorMessages([
      "کاربر گرامی لطفا تنوع های محصول مورد نظر رو انتخاب کنید ",
    ]);

    useNuxtApp().$toast.warning(
      "کاربر گرامی لطفا تنوع های محصول مورد نظر رو انتخاب کنید ",
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      },
    );
  } else if (selectedVariety.value.store.balance == 0) {
    useNuxtApp().$toast.error(
      "کاربر گرامی محصول انتخاب شده در انبار موجود نمباشد ",
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
      },
    );
  } else if (!login.value) {
    useNuxtApp().$toast.error(
      "کاربر گرامی لطفا ابتدا وارد حساب کاربری خود شوید ",
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
      },
    );
    storeLogin.setLoginModal(true);
  } else {
    storeCart.addToCart(selectedVariety.value, selectedQuantity.value);
  }
}
</script>
