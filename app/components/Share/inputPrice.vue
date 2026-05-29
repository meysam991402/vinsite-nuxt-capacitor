<template>
  <input
    ref="priceRef"
    type="text"
    id="price"
    class="border mt-2 border-gray-400 px-1.5 py-1 rounded-lg"
    :value="formattedPrice"
    @input="handleInput"
    @blur="handleBlur"
    @keydown="handleKeydown"
    @keypress.enter="keypressUser"
  />
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
const emit = defineEmits(["enterPrice", "onEnter"]);
let priceRef = ref(null);
const price = ref(""); // برای نگهداری مقدار عددی خام
const formattedPrice = ref(""); // برای نمایش مقدار قالب‌بندی شده
function keypressUser() {
  emit("onEnter");
}
// تابع قالب‌بندی عدد سه رقم سه رقم با کاما
function formatPrice(value) {
  if (!value) return "";
  // فقط اعداد را نگه می‌داریم
  let num = String(value).replace(/\D/g, "");
  // سه رقم سه رقم جدا می‌کنیم
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleInput(event) {
  const rawValue = event.target.value;
  // مقدار خام (فقط عدد) را در price ذخیره می‌کنیم

  price.value = rawValue.replace(/\D/g, "");
  // مقدار قالب‌بندی شده برای نمایش در input
  formattedPrice.value = formatPrice(price.value);
  emit("enterPrice", price.value);

  // اگر می‌خواهید مقدار خام را به والد بفرستید، می‌توانید از emit استفاده کنید
  //   emit('update:modelValue', price.value);
}

function handleBlur() {
  // هنگام خروج از فوکوس، اگر مبلغ خالی بود، نمایش را به "" برمی‌گردانیم
  // وگرنه مقدار قالب‌بندی شده را نگه می‌داریم.
  if (!price.value) {
    formattedPrice.value = "";
  } else {
    formattedPrice.value = formatPrice(price.value);
  }
}

onMounted(() => {
  nextTick(() => {
    if (priceRef.value) {
      priceRef.value.focus();
    }
  });
});
function handleKeydown(event) {
  // جلوگیری از ورود بعضی کلیدهای غیرمجاز
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

  if (allowedKeys.includes(event.key)) return;

  // فقط عددها مجازند
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}
</script>
