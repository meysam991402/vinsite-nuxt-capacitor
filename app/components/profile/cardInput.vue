<template>
  <div class="card-input">
    <input type="tel" v-for="(digit, index) in cardDigits" :key="index" v-model="cardDigits[index]"
      @input="onInput(index, $event)" maxlength="4" class="card-digit" placeholder="----" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const cardDigits = ref(["", "", "", ""]);

// Watch for changes in modelValue and update cardDigits
watch(
  () => props.modelValue,
  (newValue) => {
    const chunks = newValue.match(/.{1,4}/g) || [];
    cardDigits.value = chunks.concat(new Array(4 - chunks.length).fill(""));
  }
);

const emit = defineEmits(["update:modelValue"]);

const onInput = (index, event) => {
  // Map for converting Persian digits to English
  const persianToEnglish = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  // Get the current input value and filter out non-numeric characters
  let inputValue = event.target.value;
  const numericValue = inputValue
    .replace(/\D/g, "") // Remove non-digits
    .replace(/[۰-۹]/g, (match) => persianToEnglish[match]); // Convert Persian digits to English

  cardDigits.value[index] = numericValue;

  if (numericValue.length === 4 && index < 3) {
    const nextInput = document.querySelectorAll(".card-digit")[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }

  // Update the modelValue in the parent component
  emit("update:modelValue", cardDigits.value.join(""));
};
</script>

<style scoped>
.card-input {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  gap: 10px;
  background: var(--color-eai);
  border-radius: 0.375rem;
  border: 1px solid #d4d4d8;
}

.card-digit {
  width: 80px;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  padding: 8px;
  background-color: unset;
}

@media screen and (max-width: 768px) {
  .card-digit {
    width: 25%;
  }
}
</style>
