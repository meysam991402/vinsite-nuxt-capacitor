<template>
  <button @click="addLike" v-if="login">
    <IconsLike class="text-white" :class="{ 'fill-red-500! ': like }" />
  </button>
</template>
<script setup>
import makeArry from "~/utils/errorString.js";
let base = useRuntimeConfig();
let storeLogin = useUserStore();
let login = computed(() => storeLogin.getLogin);
let props = defineProps({
  isFavorite: {
    type: Boolean,
    default: false,
  },
  productId: Number,
});
let like = ref(props.isFavorite || false);
let disabled = ref(false);
let cookie = useCookie("auth");
async function addLike() {
  if (login.value) {
    let fd = new FormData();
    let url = `${base.public.apiBaseUrl}/customer/favorites`;
    let method = like.value ? "DELETE" : "POST";
    if (!like.value) {
      fd.append("product_id", props.productId);
    } else {
      url = `${base.public.apiBaseUrl}/customer/favorites/${props.productId}`;
    }
    try {
      let res = await $fetch(`${url}`, {
        headers: {
          authorization: cookie.value,
        },
        method: method,
        body: fd,
      });
      useNuxtApp().$toast(res.message, {
        type: "success",
        theme: "colored",
        autoClose: 2000,
      });
      like.value = !like.value;
    } catch (error) {
      let errors = [];
      if (error?.response?._data) {
        errors = makeArry(error?.response?._data?.message ?? "");
      } else if (error?.response?.message) {
        errors = makeArry(error?.response?.message ?? "");
      }
      errors.forEach((error) => {
        useNuxtApp().$toast(error, {
          type: "error",
          theme: "colored",
          autoClose: 2000,
        });
      });
    } finally {
      disabled.value = false;
    }
  } else {
    useNuxtApp().$toast.error(
      "کاربر گرامی لطفا ابتدا وارد حساب کاربری خود شوید ",
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
      },
    );
    storeLogin.setLoginModal(true);
  }
}
</script>
