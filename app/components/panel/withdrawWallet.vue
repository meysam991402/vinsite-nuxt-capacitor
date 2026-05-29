<template>
  <div class="w-[95%] sm:w-[500px] p-4 bg-white rounded-2xl">
    <h4
      class="flex items-center gap-1 text-lg font-bold border-b border-b-solid border-b-gray-300 pb-2"
    >
      <span class="flex">
        <IconsCoins />
      </span>
      <span> برداشت از کیف پول </span>
    </h4>
    <form @submit.prevent="withdraw" class="flex flex-col mt-2">
      <label for="price" class="text-sm sm:text-base">مبلغ بر حسب تومان:</label>

      <ShareInputPrice @onEnter="withdraw" @enterPrice="enterPrice" />
    </form>
    <p
      v-if="disabledMessaage"
      class="text-center mt-4 text-orange-600 text-sm sm:text-base"
    >
      حداقل مبلغ قابل برداشت 10,000 تومان میباشد!
    </p>
    <div class="flex items-center justify-center gap-4 mt-6">
      <button
        @click="withdraw"
        :disabled="disabled"
        :class="{
          'cursor-not-allowed opacity-50': disabled,
        }"
        class="text-sm sm:text-base bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-all duration-300"
      >
        <ShareLoaderBtn
          message="درحال پردازش ..."
          v-if="loading"
        ></ShareLoaderBtn>
        <span v-else>برداشت</span>
      </button>
      <button
        @click="emit('close')"
        class="text-sm sm:text-base bg-gray-200 px-4 py-1 rounded-md hover:bg-gray-300 transition-all duration-300"
      >
        بستن
      </button>
    </div>
  </div>
</template>
<script setup>
// import { nextTick } from "vue";
import makeArry from "~/utils/errorString.js";
const store = useUserStore();
const storeWallet = useWalletStore();
let route = useRoute();
let cookie = useCookie("auth");
let base = useRuntimeConfig();
let amount = ref(null);
let errors = ref(null);
let disabledMessaage = ref(true);
let disabled = ref(true);
let loading = ref(false);

const emit = defineEmits("close");

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
async function withdraw() {
  if (amount.value && amount.value >= 10000) {
    disabled.value = true;
    loading.value = true;
    try {
      let fd = new FormData();
      fd.append("amount", amount.value);

      const data = await $fetch(
        `${base.public.apiBaseUrl}/customer/withdraws`,
        {
          method: "POST",
          body: fd,
          headers: {
            authorization: cookie.value,
          },
        },
      );
      useNuxtApp().$toast.success(data?.message, {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      });

      useAsyncData(
        () => `Profile-fetch-${new Date()}`,
        async () => {
          await store.requestProfile();
          return { fetched: true };
        },
        { lazy: false },
      );
      useAsyncData(
        () => `Withdraws-fetch-${new Date()}`,
        async () => {
          await storeWallet.requestWithdraws(route.query);
          return { fetched: true };
        },
        { lazy: false },
      );
      emit("close");
    } catch (error) {
      console.error("❌ خطا در گرفتن داده از /api/settings", error);
      console.log("❌ خطا در گرفتن داده از /api/settings", error.response);
      errors.value = makeArry(error?.response?._data?.message ?? "");
      errors.value.forEach((error) => {
        useNuxtApp().$toast.error(error, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
      });
    } finally {
      disabled.value = false;
      loading.value = false;
    }
  } else {
    useNuxtApp().$toast.error("حداقل مبلغ قابل برداشت 10,000 تومان میباشد!", {
      autoClose: 2000,
      dangerouslyHTMLString: true,
      rtl: true,
    });
  }
}
</script>
