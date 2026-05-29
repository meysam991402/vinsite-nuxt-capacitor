<template>
  <button
    @click="store.setModalWalletRecharge(true)"
    class="text-sm bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition-all duration-300"
  >
    افزودن اعتبار
  </button>
</template>
<script setup>
const store = useWalletStore();
</script>
