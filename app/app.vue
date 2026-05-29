<!-- <template>
  <nuxt-layout>
    {{ profile }}
    <NuxtPage></NuxtPage>
    <ClientOnly>
      <button
        type="button"
        @click="scrollTop"
        :class="scrollEnabled ? 'bottom-2' : '-bottom-14'"
        class="animate-bounce z-10 fixed rounded-full bg- h-11 w-11 left-3.5 border-4 border-neutral-200 bg-neutral-500 flex items-center justify-center transition-all duration-500 ease-linear"
      >
        <IconsArrowTop class="*:stroke-white w-7 h-w-7" />
      </button>
    </ClientOnly>
  </nuxt-layout>
</template>
<script setup>
import { ofetch } from "ofetch";
const storeSettings = useSettingsStore();
const store = useUserStore();
let settings = computed(() => storeSettings.getSettingsData);
let cookie = useCookie("auth");
let profile = computed(() => store.getProfile);

if (cookie.value) {
  if (profile.value == null) {
    useAsyncData(
      async () => {
        (`profile-${new Date()}`, await store.requestProfile());
        return { fetched: true };
      },
      { lazy: false },
    );
  }
  const headers = {
    authorization: cookie.value,
  };

  globalThis.$fetch = ofetch.create({
    headers: headers,
  });
  // storeProfile.setProfile();
  store.setLogin(true);
}
// if (!settings.value) {
useAsyncData(
  async () => {
    (`setting-${new Date()}`, await storeSettings.setSettings());
    return { fetched: true };
  },
  { lazy: false },
);
// }
const SCROLL_THRESHOLD = 500;
const scrollEnabled = ref(false);
const handleScroll = () => {
  if (process.client) {
    if (window.scrollY > SCROLL_THRESHOLD) {
      scrollEnabled.value = true;
    } else {
      scrollEnabled.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function scrollTop() {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
</script> -->
<template>
  <NuxtLayout>
    <main>
      <NuxtPage />
      <ClientOnly>
        <button type="button" :class="[
          {
            'bottom-20! lg:bottom-2':
              scrollEnabled && route.name == 'product-slug',
          },
          {
            'bottom-16 lg:bottom-2':
              scrollEnabled && route.name != 'produc-slug',
          },
          { '-bottom-14': !scrollEnabled },
        ]"
          class="animate-bounce z-10 fixed rounded-full h-10 w-10 sm:h-11 sm:w-11 left-3.5 border-4 border-neutral-200 bg-neutral-500 flex items-center justify-center transition-all duration-500 ease-linear"
          @click="scrollTop">
          <IconsArrowTop class="*:stroke-white w-7 h-w-7" />
        </button>
      </ClientOnly>
    </main>
  </NuxtLayout>
</template>

<script setup>
const storeSettings = useSettingsStore();
const store = useUserStore();
const storeCarts = useCartStore();
const route = useRoute();
let carts = computed(() => storeCarts.getCarts);
let settings = computed(() => storeSettings.getSettingsData);
let cookie = useCookie("auth");
let cookieLikes = useCookie("likes");
let profile = computed(() => store.getProfile);
const SCROLL_THRESHOLD = 500;
const scrollEnabled = ref(false);
if (!cookieLikes.value) {
  cookieLikes.value = [];
}
if (settings.value == null) {
  useAsyncData(
    async () => {
      await storeSettings.setSettings();
      return { fetched: true };
    },
    { lazy: false },
  );
}
if (cookie.value) {
  if (profile.value == null) {
    store.requestProfile();
  }
  if (carts.value == null) {
    storeCarts.requestCarts();
  }
  // const headers = {
  //   authorization: cookie.value,
  // };

  // globalThis.$fetch = ofetch.create({
  //   headers: headers,
  // });
  // storeProfile.setProfile();
  store.setLogin(true);
}
function scrollTop() {
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const handleScroll = () => {
  if (process.client) {
    if (window.scrollY > SCROLL_THRESHOLD) {
      scrollEnabled.value = true;
    } else {
      scrollEnabled.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
</script>
<style>
body:has(#modal) #__nuxt {
  height: 100vh;
  overflow: hidden;
}
</style>
