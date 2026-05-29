<template>
  <div class="relative z-60">
    <button
      @click="checkLogin(login)"
      class="flex items-center gap-1.5 lg:border lg:border-solid lg:border-gray-400 lg:py-1 lg:px-3 lg:rounded-lg"
      :class="{ 'rounded-b-none!': openMenu }"
    >
      <span class="flex">
        <IconsSignIn class="hidden lg:inline-block" />
        <NuxtLink :to="login ? '/panel' : ''" class="p-1.5">
          <IconsUser class="inline-block lg:hidden w-7 h-7 opacity-60" />
        </NuxtLink>
      </span>
      <ShareSkeleton
        v-if="loading || !ready"
        class="h-6 w-14 hidden lg:block"
      />
      <span v-else class="hidden lg:inline-block">
        {{
          login
            ? profile?.first_name && profile?.last_name
              ? `${profile?.first_name ?? ""}  ${profile?.last_name ?? ""}`
              : profile?.mobile
            : "ورود | ثبت‌نام"
        }}
      </span>
    </button>

    <ul
      v-if="login"
      id="menuProfile"
      :class="{ 'scale-y-100': openMenu }"
      class="absolute hidden md:block top-full origin-top scale-y-0 transition-all duration-200 ease-linear right-0 bg-white shadow-lg p-1 divide-y divide-gray-400/80 w-full md:border md:border-solid md:border-gray-400 md:border-t-0 rounded-b-lg"
    >
      <li class="cursor-pointer">
        <NuxtLink to="/panel" class="p-1.5">حساب کاربری</NuxtLink>
      </li>
      <li class="cursor-pointer">
        <ShareLogOutBtn class="p-1.5" />
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="store.setLoginModal(false)" v-if="LoginModal">
        <Login />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
let route = useRoute();
let store = useUserStore();
let login = computed(() => store.getLogin);
let profile = computed(() => store.getProfile);
let LoginModal = computed(() => store.getLoginModal);
let loading = computed(() => store.getLoading);
let ready = ref(false);
let openMenu = ref(false);

function checkLogin(login) {
  if (login) {
    openMenu.value = !openMenu.value;
  } else {
    store.setLoginModal(true);
  }
}
watch(
  () => route.fullPath,
  (newRoute) => {
    openMenu.value = false;
  },
);
onMounted(() => {
  ready.value = true;
});
</script>
