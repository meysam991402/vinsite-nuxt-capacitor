<template>
  <h3 class="mb-2 text-base sm:text-lg font-bold text-center">ورود | عضویت</h3>
  <p class="text-center text-sm sm:text-base">
    کاربر گرامی لطفا شماره موبایل خود را وارد کنید
  </p>
  <form class="w-full mt-6" @submit.prevent="sendMobile">
    <input
      type="tel"
      placeholder="09---------"
      v-model="mobile"
      @input="checkMobile"
      ref="inputMobile"
      class="w-full text-center border outline-none border-gray-400 p-2 rounded-lg"
    />
    <template v-if="errors && errors.length">
      <p
        class="mt-3 sm:mt-4 text-[#B34614] flex items-center justify-center text-sm gap-1"
        v-for="(error, index) in errors"
        :key="index"
      >
        <span class="flex -translate-y-0.5">
          <IconsWarning />
        </span>
        <span>
          {{ error }}
        </span>
      </p>
    </template>
    <button
      :class="{
        'cursor-not-allowed opacity-50': disabled,
      }"
      :disabled="disabled"
      class="py-2 rounded-lg font-bold mt-3 sm:mt-4 w-full bg-black text-white"
    >
      <ShareLoaderBtn
        message="درحال پردازش ..."
        v-if="disabled"
      ></ShareLoaderBtn>
      <span v-else>ارسال</span>
    </button>
  </form>
</template>
<script setup>
import conv2EnNum from "~/utils/persionNum";
import makeArry from "~/utils/errorString.js";
let base = useRuntimeConfig();
let errors = ref(null);
let mobile = ref(null);
let disabled = ref(false);
let emit = defineEmits(["changeStep", "setMobile"]);
let inputMobile = ref(null);
function sendMobile() {
  if (checkMobile()) {
    requestToken();
  }
}
async function requestToken() {
  let fd = new FormData();
  fd.append("mobile", conv2EnNum(mobile.value));
  disabled.value = true;

  try {
    let res = await $fetch(`${base.public.apiBaseUrl}/customer/token`, {
      method: "POST",
      body: fd,
    });

    emit("changeStep", { current: "loginRegister", next: "verifyToken" });
    emit("setMobile", mobile.value);
  } catch (error) {
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
  }
}
function checkMobile() {
  let status = false;
  if (mobile.value == null) {
    errors.value = ["کاربر گرامی لطفا شماره موبایل خود را وارد کنید"];
  } else if (mobile.value.toString().length != 11) {
    errors.value = ["کاربر گرامی تعداد ارقام موبایل 11 رقم میباشد"];
  } else {
    errors.value = null;
    status = true;
  }
  return status;
}
onMounted(() => {
  inputMobile.value.focus();
});
</script>
