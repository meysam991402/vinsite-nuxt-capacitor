<template>
  <button class="relative" @click="checkLogin(login)">
    <IconsBuy
      :class="
        login
          ? quantity != null && quantity > 0
            ? 'w-7 h-7 sm:w-8 sm:h-8 text-green-700'
            : 'w-6 h-6 sm:w-7 sm:h-7'
          : 'w-6 h-6 sm:w-7 sm:h-7'
      "
      :quantity="quantity"
    />
  </button>
</template>
<script setup>
const store = useUserStore();
const storeCarts = useCartStore();
let router = useRouter();
let login = computed(() => store.login);
let quantity = computed(() => storeCarts.getCartsCount);
function checkLogin(login) {
  if (login) {
    router.push("/orders-list");
  } else {
    store.setLoginModal(true);
  }
}
</script>
