<script setup>
const storeCarts = useCartStore();
const storeUser = useUserStore();
const wallet = computed(() => storeUser.getWallet);
let slectedPayment = ref("internet-payment");
const router = useRouter();
// const formContainer = ref(null);
if (process.client) {
  const previouslyLoaded = sessionStorage.getItem("page-loaded");
  // اگر قبلاً این صفحه لود شده باشد و الان دوباره لود شود ⇒ یعنی رفرش
  if (previouslyLoaded === "yes") {
    sessionStorage.removeItem("page-loaded");
    router.replace("/orders-list");
  } else {
    // اولین بار ورود → علامت بزنیم
    sessionStorage.setItem("page-loaded", "yes");
  }
}
const paymentMethods = [
  { id: "internet-payment", label: "پرداخت اینترنتی" },
  {
    id: "wallet-payment",
    label: "پرداخت از کیف پول ",
    amount: wallet.value?.balance ?? 0,
  },
];
const loadingPay = computed(() => storeCarts.getLoadingPay);
const transferPortal = computed(() => storeCarts.getTransferPortal);
function pay() {
  storeCarts.payCarts(slectedPayment.value == "wallet-payment" ? true : false);
}

onUnmounted(() => {
  if (process.client) {
    sessionStorage.removeItem("page-loaded");
  }
});
</script>

<template>
  <section class="flex flex-col lg:flex-row mb-4 mt-12 gap-5 lg:gap-8">
    <div class="w-full flex flex-col lg:w-7/12 bg-neutral-50 px-3 py-5 rounded-md gap-3 lg:mt-0 mb-0">
      <div class="flex flex-col gap-3">
        <div class="flex items-center">
          <IconsPaymentSvg class="size-8 *:fill-gray-500" />
          <span class="text-lg font-bold text-gray-500">شیوۀ پرداخت خود را انتخاب کنید.</span>
        </div>

        <form class="payment-way flex flex-col px-2 pb-2 border-b border-gray-300">
          <div v-for="(method, index) in paymentMethods" :key="method?.id ?? index"
            class="flex gap-2 items-center pb-1">
            <input :disabled="method.id == 'wallet-payment' && method?.amount == 0" type="radio"
              class="size-5 cursor-pointer accent-green-700" :id="method?.id ?? ''" name="pay" v-model="slectedPayment"
              :value="method?.id ?? ''" :checked="method.id == slectedPayment" />
            <!-- :checked="method?.id == slectedPayment" -->
            <label :for="method?.id ?? ''" class="cursor-pointer"
              :class="{ 'opacity-50 cursor-not-allowed!': method.id == 'wallet-payment' && method?.amount == 0 }">
              {{ method?.label ?? "" }}
              <span v-if="method?.id == 'wallet-payment'">
                (موجودی فعلی: {{ method?.amount.toLocaleString() ?? "" }} تومان)
              </span>
            </label>
          </div>
        </form>
        <div class="portal flex flex-col justify-between gap-3 py-3 border-b border-gray-300">
          <h6 class="text-lg text-neutral-700">
            پرداخت با کلیه کارت های اعتباری شرکت
          </h6>
          <OrdersListGateways />
          <!-- <div class="flex gap-4">
            <button
              v-for="(portal, index) in portals"
              :key="portal?.id ?? index"
              type="button"
              @click="selectPortal(index)"
              :class="{
                'border-2 border-green-500 border-solid': index === indexPortal,
              }"
              class="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] relative rounded-md overflow-hidden"
            >
              <figure class="w-full relative">
                <NuxtImg
                  v-if="index === indexPortal"
                  format="webp"
                  class="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="/images/order/tick-box.db941cf5.svg"
                  alt="tick"
                />
                <NuxtImg
                  format="webp"
                  class="w-full h-full"
                  :src="portal?.image ?? ''"
                  :alt="portal?.alt ?? ''"
                />
              </figure>
            </button>
          </div> -->
        </div>
      </div>
      <OrdersListSummary />
      <!-- <div class="flex flex-col gap-1">
        <div class="flex items-center mb-1">
          <IconsOrderSvg class="size-7 *:fill-gray-500" />
          <span class="text-md font-bold text-gray-500">خلاصه سفارش</span>
        </div>

        <div class="flex gap-2 pe-2 text-sm">
          <span class="text-gray-600">آدرس:</span>
          <span>جام جم 16 مجتمع ارنیکا</span>
        </div>
        <div class="flex gap-2 pe-2 text-sm">
          <span class="text-gray-600">شماره تماس:</span>
          <span>09331498232</span>
        </div>

        <div class="orders flex flex-col gap-1 pe-2">
          <span class="text-gray-600 text-sm">سبد خرید:</span>
          <div class="order-items flex gap-2">
            <figure
              v-for="(item, index) in orderItems"
              :key="item?.id ?? index"
              class="relative border border-neutral-400 w-16 flex rounded-md overflow-hidden"
            >
              <NuxtImg
                format="webp"
                class="w-full"
                :src="item?.image ?? ''"
                :alt="item?.alt ?? ''"
              />
              <span
                class="absolute bottom-0 left-0 bg-gray-100 p-1 text-neutral-600 text-xs rounded-sm"
              >
                {{ item?.quantity ?? "" }}
              </span>
            </figure>
          </div>
        </div>
      </div> -->
    </div>
    <div class="w-full lg:w-5/12 sticky top-4 col-lg-4 flex flex-col gap-3">
      <div class="price-details bg-neutral-50 rounded-md flex flex-col p-5 gap-2">
        <h6 class="text-lg font-bold text-primary-300">صورت حساب</h6>
        <OrdersListFactor />
        <button :disabled="loadingPay || transferPortal" :class="{
          'opacity-50 cursor-not-allowed': loadingPay || transferPortal,
        }"
          class="flex mt-5 justify-center w-full md:w-1/2 lg:w-4/5 mx-auto font-extrabold py-2 rounded-md bg-black text-white hover:bg-neutral-700 active:translate-y-0.5"
          @click="pay">
          <span v-if="transferPortal">درحال انتقال به درگاه</span>
          <span v-else-if="loadingPay">درحال بارگزاری</span>
          <span v-else>پرداخت</span>
        </button>
        <!-- <div class="flex justify-between">
          <span class="text-md text-gray-600">مجموع قیمت ها :</span>
          <div class="flex items-center gap-1">
            <span class="text-lg text-gray-600">{{
              totalPrice.toLocaleString()
            }}</span>
            <span class="text-md text-gray-600">تومان</span>
          </div>
        </div>
        <div class="flex justify-between">
          <span class="text-md font-bold text-green-500">تخفیف:</span>
          <div class="flex items-center gap-1">
            <span class="text-lg text-green-500">{{
              totalPrice.toLocaleString()
            }}</span>
            <span class="text-md text-green-500">تومان</span>
          </div>
        </div>
        <div class="flex justify-between text-neutral-500">
          <span class="text-md">هزینه ارسال:</span>
          <span class="text-md">رایگان</span>
        </div>
        <div class="flex justify-between">
          <span class="text-lg text-red-600">پرداخت نهایی:</span>
          <div class="flex items-center gap-1">
            <span class="text-lg font-bold text-red-600">{{
              totalPrice.toLocaleString()
            }}</span>
            <span class="text-lg text-red-600">تومان</span>
          </div>
        </div> -->
      </div>
    </div>
    <div id="formContainer" ref="formContainer" class="hidden"></div>
  </section>
</template>
