<template>
  <div class="mt-4">
    <h4 class="font-bold text-sm lg:text-base mb-3">تعداد</h4>
    <div class="flex items-center justify-between w-[180px] rounded-lg border border-solid border-gray-400" :class="{
      'opacity-50 cursor-not-allowed! *:cursor-not-allowed!':
        selectedVariety == null,
    }">
      <button :class="{
        'opacity-50 cursor-not-allowed! ':
          selectedVariety == null ||
          quantity == selectedVariety.store.balance,
      }" :disabled="selectedVariety == null || quantity == selectedVariety.store.balance
          " class="p-3 flex" @click="changQuantityUser('plus')">
        <IconsPlus class="size-5" />
      </button>
      <span class="grow text-center font-bold">{{ quantity }}</span>
      <button :disabled="selectedVariety == null || quantity <= 1" :class="{
        'cursor-not-allowed opacity-50':
          selectedVariety == null || quantity <= 1,
      }" class="p-3 flex" @click="changQuantityUser('minus')">
        <IconsMinus class="size-5" />
      </button>
    </div>
  </div>
</template>
<script setup>
let store = useProductStore();
let selectedVariety = computed(() => store.getSelectedVariety);
let emit = defineEmits("changQuantity");
let quantity = ref(1);
onMounted(() => {
  emit("changQuantity", quantity.value);
});
function changQuantityUser(type) {
  if (type == "plus") {
    quantity.value += 1;
  } else {
    if (quantity.value > 1) {
      quantity.value -= 1;
    }
  }
  emit("changQuantity", quantity.value);
}
</script>
