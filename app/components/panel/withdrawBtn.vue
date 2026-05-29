<template>
  <button
    @click="checkWallet"
    class="text-sm bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition-all duration-300"
  >
    برداشت
  </button>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModal = false" v-if="showModal">
        <PanelWithdrawWallet @close="showModal = false" />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
const userStore = useUserStore();

const { $swal } = useNuxtApp();
const profile = computed(() => userStore.getProfile);
function checkWallet() {
  if (profile.value) {
    if (!profile.value?.card_number) {
      $swal.fire({
        title:
          "کاربر گرامی لطفا ابتدا از قسمت اطلاعات حساب کاربری و ویرایش، شماره کارت بانکی خود را وارد کنید",

        icon: "warning",
        confirmButtonColor: "#047d04",

        confirmButtonText: "باشه",
        // cancelButtonText: "خیر",
      });
      return;
    }

    if (profile.value.wallet?.main_balance >= 10000) {
      showModal.value = true;
    } else {
      if (profile.value?.wallet?.main_balance < 10000) {
        $swal.fire({
          title: "کاربر گرامی حداقل موجودی کیف پول شما باید 10,000 تومان باشد",

          icon: "warning",
          confirmButtonColor: "#047d04",

          confirmButtonText: "باشه",
          // cancelButtonText: "خیر",
        });
      }
    }
  }
}
let showModal = ref(false);
</script>
