<template>
  <div class="w-[95%] sm:w-[500px] min-h-[300px] p-4 bg-white rounded-2xl">
    <h4
      class="flex items-center gap-1 text-lg font-bold border-b border-b-solid border-b-gray-300 pb-2"
    >
      <span class="flex">
        <IconsCoins />
      </span>
      <span> شارژ کیف پول </span>
    </h4>
    <form class="flex flex-col mt-2">
      <label for="price" class="text-sm sm:text-base">مبلغ بر حسب تومان:</label>

      <ShareInputPrice @onEnter="withdraw" @enterPrice="enterPrice" />
      <p
        v-if="disabledMessaage"
        class="text-center mt-4 text-orange-600 text-sm sm:text-base"
      >
        حداقل مبلغ قابل شارژ 10,000 تومان میباشد!
      </p>
    </form>

    <div class="mt-6">
      <h5 class="text-sm sm:text-base">انتخاب درگاه:</h5>
      <OrdersListGateways class="mt-2" />
    </div>
    <div class="flex items-center justify-center gap-4 mt-6">
      <button
        @click="increaseWallet"
        :disabled="disabled || loading"
        :class="{
          'cursor-not-allowed opacity-50': disabled || loading,
        }"
        class="text-sm sm:text-base bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition-all duration-300"
      >
        <ShareLoaderBtn
          message="درحال پردازش ..."
          v-if="loading"
        ></ShareLoaderBtn>
        <span v-else>افزایش</span>
      </button>
      <button
        @click="store.setModalWalletRecharge(false)"
        class="text-sm sm:text-base bg-gray-200 px-4 py-1 rounded-md hover:bg-gray-300 transition-all duration-300"
      >
        بستن
      </button>
    </div>
    <div id="formContainer" ref="formContainer" class="hidden"></div>
  </div>
</template>
<script setup>
const store = useWalletStore();
const storeCarts = useCartStore();
const { $swal } = useNuxtApp();
let selectedGateway = computed(() => storeCarts.getSelectedGateway);
let loading = computed(() => store.getLoadingDeopsits);
let disabledMessaage = ref(true);
let disabled = ref(true);
let amount = ref(null);
function enterPrice(e) {
  amount.value = Number(e);
  if (amount.value >= 10000) {
    disabledMessaage.value = false;
    disabled.value = false;
  } else {
    disabled.value = true;
    disabledMessaage.value = true;
  }
}
function increaseWallet() {
  if (selectedGateway.value == null) {
    $swal.fire({
      title: "کاربر گرامی ابتدا باید درگاه بانکی خود را انتخاب کنید",

      icon: "warning",
      confirmButtonColor: "#047d04",

      confirmButtonText: "باشه",
    });
    return;
  }
  let params = {
    amount: amount.value != null ? amount.value : 0,
    driver_name: selectedGateway.value?.driver,
  };
  // store.requestDeopsits(params);
  useAsyncData(
    () => `increase-fetch-${new Date()}`,
    async () => {
      await store.requestDeopsits(params);
      return { fetched: true };
    },
    { lazy: false },
  );
}
</script>
