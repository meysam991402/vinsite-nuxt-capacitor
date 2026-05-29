<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  // تعداد بخش‌ها
  parts: { type: Number, default: 4 },
  // طول هر بخش
  lengthPerPart: { type: Number, default: 4 },

  // فرض: از بیرون شماره کارت با v-model پاس داده میشه
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

// آرایه ورودی‌ها به تعداد props.parts
const inputs = ref(Array(props.parts).fill(""));

function focusInput(i) {
  const el = document.getElementById(`bank-input-${i}`);
  if (el) el.focus();
}

function handleInput(e, index) {
  let value = e.target.value;

  // فقط عدد
  value = value.replace(/\D/g, "");

  // محدود کردن طول
  if (value.length > props.lengthPerPart) {
    value = value.slice(0, props.lengthPerPart);
  }

  inputs.value[index] = value;

  // رفتن به باکس بعدی
  if (value.length === props.lengthPerPart && index < props.parts - 1) {
    focusInput(index + 1);
  }

  emit("update:modelValue", inputs.value.join(""));
}

function handleKeydown(e, index) {
  const value = inputs.value[index];

  // برگشت به باکس قبلی در صورت پاک کردن
  if (e.key === "Backspace" && value.length === 0 && index > 0) {
    focusInput(index - 1);
  }
}

// تبدیل شماره کارت (رشته) به بخش‌ها و ریختن در inputs
function setFromModelValue(cardNumber) {
  const digits = String(cardNumber ?? "").replace(/\D/g, "");

  // فقط به طول مورد نظر محدود می‌کنیم
  const maxLen = props.parts * props.lengthPerPart;
  const trimmed = digits.slice(0, maxLen);

  const next = Array(props.parts).fill("");
  for (let i = 0; i < props.parts; i++) {
    const start = i * props.lengthPerPart;
    const end = start + props.lengthPerPart;
    next[i] = trimmed.slice(start, end);
  }
  inputs.value = next;
}

// وقتی modelValue تغییر کرد، inputs هم آپدیت شوند
watch(
  () => props.modelValue,
  (val) => {
    setFromModelValue(val);
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex justify-center items-center flex-row-reverse border w-full">
    <input
      class="w-full text-center"
      placeholder="----"
      v-for="(item, i) in inputs"
      :key="i"
      :id="`bank-input-${i}`"
      type="text"
      inputmode="numeric"
      :maxlength="lengthPerPart"
      v-model="inputs[i]"
      @input="handleInput($event, i)"
      @keydown="handleKeydown($event, i)"
    />
  </div>
</template>
