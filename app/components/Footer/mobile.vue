<template>
  <div
    v-if="route.name != 'product-slug'"
    class="container flex lg:hidden justify-between items-center bg-white/50 backdrop-blur-2xl rounded-4xl w-[96%] py-0.5 px-4 fixed bottom-2 left-1/2 -translate-x-1/2 border-[3px] border-white/60 ring-2 ring-black/5 z-20"
  >
    <!-- <nuxt-link to="/">
      <IconsHome class="size-8 fill-black" />
    </nuxt-link> -->
    <button
      class="rounded-md p-2 z-10 flex lg:hidden"
      @click="showResMenu = true"
    >
      <IconsResMenu class="size-5 *:stroke-black" />
    </button>
    <button
      class="rounded-md p-2 z-10 flex lg:hidden"
      @click="showSearch = true"
    >
      <IconsSearch class="size-5 *:stroke-black" />
    </button>
    <HeaderBtnLogin />
    <HeaderBtnBuy />
  </div>
  <HeaderMenusResMenu
    @close="showResMenu = false"
    :class="{ open: showResMenu }"
  />
  <ShareSearchModal @close="showSearch = false" :class="{ open: showSearch }" />
</template>
<script setup>
const route = useRoute();
const showResMenu = ref(false);
const showSearch = ref(false);
</script>
