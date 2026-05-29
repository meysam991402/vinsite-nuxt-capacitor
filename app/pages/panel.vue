<template>
  <section class="mt-10 min-h-[50vh] flex items-center">
    <div
      class="container flex items-stretch flex-col lg:flex-row justify-between gap-6"
    >
      <div
        class="border border-gray-300 rounded-xl p-4 w-full lg:min-w-[250px] xl:min-w-[300px] lg:sticky top-1.5"
      >
        <div class="flex flex-col items-center justify-center gap-2 mb-4">
          <ProfileImage />
          <p>
            {{
              profile?.first_name && profile?.last_name
                ? (profile?.first_name ?? "") + " " + (profile?.last_name ?? "")
                : profile?.mobile
            }}
          </p>
          <div class="w-full flex items-center justify-between">
            <p class="text-sm w-full flex gap-1.5">
              <b>مبلغ کل کیف پول :</b>
              <span v-if="loading">
                <ShareSkeleton class="w-[100px] h-[20px]" />
              </span>
              <span v-else>{{
                `${profile?.wallet?.balance.toLocaleString() ?? 0} تومان`
              }}</span>
            </p>

            <div class="relative group">
              <button
                @click="storeWallet.setModalWalletRecharge(true)"
                class="bg-black text-white p-1 rounded-full flex items-center justify-center"
              >
                <IconsPlus class="size-5 stroke-2" />
              </button>
              <span
                class="absolute hidden lg:inline-block transition-all duration-300 ease-linear opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-[120%] right-[150%] top-1/2 -translate-y-1/2 bg-black text-white text-nowrap min-w-fit! px-3 py-1 text-xs before:absolute before:size-4 rounded-sm before:rounded-xs before:bg-black before:-right-0.5 before:rotate-45 z-[1] before:z-[-1] before:top-1/2 before:-translate-y-1/2"
              >
                شارژ کیف پول
              </span>
            </div>
          </div>
          <p
            class="text-sm w-full flex gap-1.5"
            v-if="profile?.wallet?.gift_balance"
          >
            <b>موجودی هدیه :</b>
            <span v-if="loading">
              <ShareSkeleton class="w-[100px] h-[20px]" />
            </span>
            <span v-else>{{
              `${profile?.wallet?.gift_balance.toLocaleString() ?? 0} تومان`
            }}</span>
          </p>
        </div>
        <ul>
          <li
            class="p-3 flex items-center gap-1"
            :class="{ 'bg-neutral-200': route.name == item.key }"
            v-for="(item, index) in menus"
            :key="item?.id ?? index"
          >
            <span class="flex">
              <IconsUser
                v-if="item.key == 'panel'"
                class="size-5.5 -translate-y-0.5"
              />
              <IconsAddressList
                v-if="item.key == 'panel-addressList'"
                class="size-5"
              />
              <IconsOrderList
                class="size-5"
                v-if="item.key == 'panel-orderList'"
              />
              <IconsLike
                class="text-white size-5"
                v-if="item.key == 'panel-favoriteList'"
              />
              <IconsWallet
                class="text-white size-5"
                v-if="item.key == 'panel-walletTransactions'"
              />
              <IconsMoney
                class="text-white size-6"
                v-if="item.key == 'panel-walleTwithdraws'"
              />
            </span>
            <NuxtLink
              :to="item?.link"
              class="w-full text-center lg:text-start text-sm lg:text-base"
            >
              {{ item?.title ?? "" }}
            </NuxtLink>
          </li>
          <li class="p-3 flex items-center gap-1">
            <!-- <span class="flex">
              <IconsExit class="stroke-red-500" />
            </span>
            <button class="w-full text-center lg:text-start">
              
            </button> -->
            <ShareLogOutBtn
              title="خروج از حساب کاربری"
              class="*:nth-[2]:text-center *:nth-[2]:w-full *:nth-[2]:block lg:*:nth-[2]:text-start text-sm lg:text-base w-full"
            >
              <span class="flex">
                <IconsExit class="stroke-red-500" />
              </span>
            </ShareLogOutBtn>
          </li>
        </ul>
      </div>
      <div
        class="border overflow-hidden border-gray-300 rounded-xl p-4 w-full lg:min-w-[calc(100%-250px)] xl:min-w-[calc(100%-300px)]"
      >
        <NuxtPage />
      </div>
    </div>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <Modal
        @close="storeWallet.setModalWalletRecharge(false)"
        v-if="modalWalletRecharge"
      >
        <PanelWalletRecharge />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
const storeWallet = useWalletStore();
const store = useUserStore();
let profile = computed(() => store.getProfile);
let loading = computed(() => store.getLoading);
let modalWalletRecharge = computed(() => storeWallet.getModalWalletRecharge);
definePageMeta({
  middleware: "check-auth",
});
let route = useRoute();

useAsyncData(
  () => `Profile-fetch-${new Date()}`,
  async () => {
    await store.requestProfile();
    return { fetched: true };
  },
  { lazy: false },
);
const menus = ref([
  { title: "اطلاعات حساب کاربری", link: "/panel", id: 1, key: "panel" },
  {
    title: "لیست آدرس ها",
    link: "/panel/addressList",
    id: 1,
    key: "panel-addressList",
  },
  {
    title: "کیف پول",
    link: "/panel/walletTransactions",
    id: 2,
    key: "panel-walletTransactions",
  },
  {
    title: "برداشت از کیف پول",
    link: "/panel/walleTwithdraws",
    id: 3,
    key: "panel-walleTwithdraws",
  },
  {
    title: "سفارش ها",
    link: "/panel/orderList?status=all",
    id: 4,
    key: "panel-orderList",
  },
  {
    title: "لیست علاقه مندی ها",
    link: "/panel/favoriteList",
    id: 5,
    key: "panel-favoriteList",
  },
]);
</script>
