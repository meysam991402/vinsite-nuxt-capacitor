<template>
  <ul v-if="menus && menus.length"
    class="absolute py-2 top-[60px] opacity-0 invisible right-0 transition-all duration-500 bg-white shadow-lg w-64 rounded-lg">
    <li class="px-3 sub-menu-item py-1.5 w-full relative *:text-gray-500 *:hover:text-black" :class="``"
      v-for="(item, index) in menus" :key="item?.id ?? index">
      <!-- <NuxtLink to="/" class="line-clamp-1">
        {{ item?.title ?? "" }}
      </NuxtLink> -->
      <ShareDynamicLinker :item="item?.link" class="line-clamp-1">
        {{ item?.title ?? "" }}
      </ShareDynamicLinker>
      <template v-if="item && item.children && item.children.length">
        <HeaderMenusSubMenu class="right-full top-[40px] sub-menu1" :menus="item.children" />
      </template>
    </li>
  </ul>
</template>
<script setup>
let props = defineProps({
  menus: Array,
});
</script>
<style scoped>
.sub-menu-item:hover>.sub-menu1 {
  visibility: visible;
  opacity: 1;
  top: 0;
}
</style>
