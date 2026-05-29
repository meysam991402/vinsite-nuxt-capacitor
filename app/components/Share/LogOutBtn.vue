<template>
  <button @click="showModal()" class="w-full flex items-center justify-start">
    <slot></slot>
    <span>
      {{ title ?? "خروج از حساب" }}
    </span>
  </button>
</template>
<script setup>
// import makeArry from "../../utils/errorString.js";

const { $swal } = useNuxtApp();
let router = useRouter();
let route = useRoute();
let store = useUserStore();
let storecarts = useCartStore();
let base = useRuntimeConfig();
let cookie = useCookie("auth");
defineProps({
  title: {
    type: String,

    defaulte: " خروج از حساب",
  },
});
const showModal = () => {
  $swal
    .fire({
      title: "آیا میخواهید خارج شوید؟",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b34614",
      cancelColor: "#ff0000",
      cancelButtonColor: "#047d04",
      confirmButtonText: "بله خارج شو",
      cancelButtonText: "خیر",
    })
    .then((result) => {
      if (result.isConfirmed) {
        resetAuth();
      }
    });
};
async function resetAuth() {
  await $fetch(`${base.public.apiBaseUrl}/customer/logout`, {
    method: "POST",
    headers: {
      authorization: cookie.value,
    },
  })
    .then((res) => {
      if (res.success) {
        useNuxtApp().$toast.success(res.message, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
        });
        if (
          route.path.includes("panel") ||
          route.path.includes("orders-list")
        ) {
          router.push("/");
        }
        cookie.value = null;
        store.setLogin(false);
        store.setProfile(null);
        storecarts.setCartsCount(null);
        storecarts.setCarts(null);
      }
    })
    .catch((error) => {
      useNuxtApp().$toast.error(error?.response?.data?.message, {
        autoClose: 2000,
        dangerouslyHTMLString: true,
      });
    });
}
</script>
