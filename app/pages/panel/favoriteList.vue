<template>
  <section>
    <div class="mb-8">
      <h3 class="text-lg lg:text-xl font-semibold text-center">
        لیست علاقه مندی ها
      </h3>
      <span
        class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3"
      >
      </span>
    </div>
    <button
      v-if="favorites && favorites?.length"
      type="button"
      @click="deleteAll"
      :disabled="disabled"
      :class="{
        'cursor-not-allowed opacity-50': disabled,
      }"
      class="bg-black text-white text-base rounded-lg p-2 mb-6"
    >
      <ShareLoaderBtn
        message="درحال پردازش ..."
        v-if="disabled"
      ></ShareLoaderBtn>
      <span> حذف همه ی علاقه مندی ها</span>
    </button>
    <div
      v-if="!ready || loading"
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
    >
      <ShareSkeleton
        v-for="value in 4"
        :key="value"
        class="h-[250px] lg:h-[300px] w-full"
      />
    </div>
    <div v-else-if="favorites && favorites?.length">
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        <ProductCard
          v-for="(product, index) in favorites"
          :key="product?.id ?? index"
          :product="product?.product"
          class="group-hover:not-[:hover]:scale-[.95] transition-all duration-300 ease-linear"
        />
      </div>
    </div>
    <h4 class="mt-2 text-center font-semibold text-sm lg:text-base" v-else>
      اطلاعاتی برای نمایش وجود ندارد
    </h4>
  </section>
</template>
<script setup>
const store = useUserStore();
let favorites = computed(() => store.getFavorites);
let loading = computed(() => store.getLoading);
let base = useRuntimeConfig();
let cookies = useCookie("auth");

useAsyncData(
  () => `Favorites-fetch${new Date()}`,
  async () => {
    await store.reqFavorites();
    return { fetched: true };
  },
  { lazy: false },
);

let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
let disabled = ref(false);
async function deleteAll() {
  await $fetch(`${base.public.apiBaseUrl}/customer/favorites/destroy/all`, {
    method: "DELETE",
    headers: {
      authorization: cookies.value,
    },
  })
    .then((res) => {
      useNuxtApp().$toast(res.message, {
        type: "success",
        theme: "colored",
        autoClose: 2000,
      });
      store.reqFavorites();
    })
    .catch((error) => {
      useNuxtApp().$toast(error.data.message, {
        type: "error",
        theme: "colored",
        autoClose: 2000,
      });
    })
    .finally(() => {
      disabled.value = false;
    });
}
</script>
