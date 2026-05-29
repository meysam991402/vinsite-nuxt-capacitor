<template>
  <div class=" ">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-2xl text-right w-full mb-4">
        کد تایید را وارد کنید
      </h2>
      <button
        class="flex items-center gap-1 font-bold text-green28 text-nowrap"
        type="button"
        @click.self="editMobile()"
      >
        <span class="flex">
          <!-- فرض بر وجود کامپوننت IconsEdit -->
          <IconsEdit />
        </span>
        ویرایش شماره
      </button>
    </div>

    <!-- فرم با رویداد submit.prevent -->
    <form @submit.prevent="validateToken()">
      <label class="text-sm sm:text-base text-gray-700">
        کد تایید برای شماره
        <span class="font-bold text-black px-1">{{ mobile ?? "" }}</span>
        پیامک شد
      </label>
      <p class="text-sm sm:text-base text-gray-700">
        شما میتوانید بعد از
        <span class="font-bold text-black px-1">{{ time }}</span>
        ثانیه، مجدد درخواست پیامک دهید
      </p>

      <div
        class="inputsVerify flex items-center justify-center gap-3.5 flex-row-reverse mt-4"
      >
        <!-- استفاده از v-for برای ساخت ورودی‌ها -->
        <!-- ref را به یک آرایه برای دسترسی آسان به المان‌های DOM اختصاص می‌دهیم -->
        <input
          v-for="(digit, index) in codeDigits"
          :key="index"
          type="text"
          maxlength="1"
          @input="handleInput(index, $event)"
          @keydown.delete="handleDelete(index, $event)"
          :ref="
            (el) => {
              inputRefs[index] = el;
            }
          "
          v-model="codeDigits[index]"
          class="rounded-xl text-center w-[50px] h-[50px] p-1.5 bg-transparent border border-solid outline-none border-gray-500 focus:border-black"
          :class="{
            'border-red-500': hasError,
            'border-red-500': errors && errors.length,
            'border-green-700!': errors == null && codeDigits[index] != '',
          }"
          :autofocus="index === 0"
        />
      </div>

      <template v-if="errors && errors.length">
        <p
          v-for="(error, index) in errors"
          :key="index"
          class="text-center mt-4 text-xs sm:text-sm text-[#B34614] flex items-center justify-center gap-1"
        >
          <span class="flex -translate-y-0.5">
            <IconsWarning />
          </span>
          <span>
            {{ error }}
          </span>
        </p>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
        <button
          @click="validateToken()"
          type="button"
          class="font-bold w-full py-3 bg-black text-white rounded-xl"
          :class="{
            'cursor-not-allowed opacity-50':
              disabled || time === 0 || !isCodeComplete,
          }"
          :disabled="disabled || time === 0 || !isCodeComplete"
        >
          <!-- فرض بر وجود کامپوننت ShareLoaderBtn -->
          <ShareLoaderBtn
            message="درحال پردازش ..."
            v-if="disabled"
          ></ShareLoaderBtn>
          <span v-else>ورود</span>
        </button>
        <button
          type="button"
          @click="againCode()"
          :class="{
            'cursor-not-allowed opacity-50': time > 0 || disabledToken,
          }"
          :disabled="time > 0 || disabledToken"
          class="font-bold w-full py-3 rounded-xl text-white bg-black"
        >
          <ShareLoaderBtn v-if="disabledToken"></ShareLoaderBtn>
          <span v-else> ارسال مجدد کد </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import conv2EnNum from "~/utils/persionNum";
import makeArry from "~/utils/errorString.js";
// import { ofetch } from "ofetch";
let store = useUserStore();
let cookie = useCookie("auth");
let storecarts = useCartStore();
let base = useRuntimeConfig();

let props = defineProps({
  mobile: String,
});
// --- State Management ---
let disabled = ref(false);
let disabledToken = ref(false);
let codeDigits = ref(["", "", "", ""]); // استفاده از آرایه برای نگهداری ارقام کد
let errors = ref(null);
let time = ref(30);
let timeInterval = null;
const INPUT_COUNT = 4;
let emit = defineEmits(["changeStep"]);

// رفرنس آرایه برای نگهداری المان‌های DOM ورودی‌ها (برای مدیریت فوکوس)
const inputRefs = ref([]);

// بررسی کامل بودن کد
const isCodeComplete = computed(() => {
  return codeDigits.value.every((digit) => digit.length === 1);
});

// بررسی وجود خطا
const hasError = computed(() => {
  return !!errors.value;
});

// --- Timer Logic ---
function timeReqAgain() {
  if (time.value > 0) {
    time.value -= 1;
  } else {
    timeStop();
    disabledToken.value = false;
  }
}

function timeStart() {
  time.value = 30; // تنظیم مجدد زمان
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(timeReqAgain, 1000);
}

function timeStop() {
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = null;
}

// مدیریت تغییر ورودی (تایپ یک رقم)
function handleInput(index, event) {
  // فیلتر کردن ورودی‌ها تا فقط یک رقم باشند
  const value = event.target.value.slice(-1);
  codeDigits.value[index] = value;

  // اگر رقم وارد شد و فیلد آخر نیست، به فیلد بعدی فوکوس کن
  if (value && index < INPUT_COUNT - 1) {
    nextTick(() => {
      // این بخش، مشکل "Cannot set properties of null" را حل می‌کند
      // با استفاده از رفرنس Vue و nextTick، اطمینان حاصل می‌شود که DOM به‌روز شده و المان وجود دارد.
      inputRefs.value[index + 1]?.focus();
    });
  }

  // اگر کد کامل شد، بلافاصله آن را ارسال کن
  if (isCodeComplete.value) {
    validateToken();
  }

  // حذف پیام خطا در صورت وارد شدن هر کاراکتر
  errors.value = null;
}

// مدیریت Backspace
function handleDelete(index, event) {
  // اگر فیلد کنونی خالی است، به فیلد قبلی برو
  if (codeDigits.value[index] === "" && index > 0) {
    nextTick(() => {
      inputRefs.value[index - 1]?.focus();
    });
  }
}

// اعتبارسنجی فرم (در اینجا فقط اعتبارسنجی خالی نبودن ورودی‌ها)
function validateForm() {
  if (!isCodeComplete.value) {
    errors.value = ["لطفاً کد تأیید 4 رقمی را کامل وارد کنید."];
    return false;
  }
  errors.value = null;
  return true;
}

function editMobile() {
  timeStop();
  resetForm();
  emit("changeStep", { current: "verifyToken", next: "loginRegister" });
}

async function againCode() {
  resetForm();
  errors.value = null;
  disabledToken.value = true;
  let fd = new FormData();
  fd.append("mobile", conv2EnNum(props.mobile));

  try {
    let res = await $fetch(`${base.public.apiBaseUrl}/customer/token`, {
      method: "POST",
      body: fd,
    });

    useNuxtApp().$toast.success(res.message, {
      autoClose: 2000,
      dangerouslyHTMLString: true,
      rtl: true,
    });
    // شبیه‌سازی موفقیت:
    timeStart();
    disabledToken.value = false;
  } catch (error) {
    disabledToken.value = false;
    errors.value = makeArry(error?.response?._data?.message ?? "");
  } finally {
    disabledToken.value = false;
  }
}

function validateToken() {
  if (!validateForm()) {
    return;
  }

  // تبدیل آرایه کد به یک رشته و سپس به انگلیسی
  const code = codeDigits.value.join("");
  sendToken(conv2EnNum(code));
}

async function sendToken(code) {
  disabled.value = true;

  let fd = new FormData();
  fd.append("mobile", conv2EnNum(props.mobile));
  fd.append("sms_token", code);
  await $fetch(`${base.public.apiBaseUrl}/customer/verify-login`, {
    method: "POST",
    body: fd,
  })
    .then((res) => {
      if (res.success == true) {
        cookie.value = `Bearer ${res.data.data.access_token}`;
        // const headers = {
        //   authorization: `Bearer ${res.data.data.access_token}`,
        // };
        // globalThis.$fetch = ofetch.create({
        //   headers: headers,
        // });
        // ست کردن وضعیت لاگین کاربر
        store.setLogin(true);
        // ست کردن اطلاعات پروفایل کاربر
        store.setProfile(res.data.data.customer);
        storecarts.setCartsCount(res.data.data.carts_count);
        // بستن مودال لاگین
        store.setLoginModal(false);
        useNuxtApp().$toast.success(res.message, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
        timeStop();
        resetForm();
      }
    })
    .catch((error) => {
      disabled.value = false;
      errors.value = makeArry(error?.response?.message ?? "");

      disabled.value = false;
    })
    .finally(() => {
      disabled.value = false;
    });
}

function resetForm() {
  codeDigits.value = ["", "", "", ""];
  errors.value = null;
}

// --- Lifecycle Hooks ---
onMounted(() => {
  timeStart();
  // فوکوس روی اولین المان هنگام mount
  if (inputRefs.value[0]) {
    inputRefs.value[0].focus();
  }
});

onUnmounted(() => {
  timeStop(); // مطمئن شوید تایمر هنگام خروج متوقف می‌شود
});
</script>

<style scoped>
/* افزودن استایل errorInput به صورت مستقیم در اینجا */
.errorInput {
  border-color: #ef4444 !important; /* رنگ قرمز Tailwind */
}
</style>
