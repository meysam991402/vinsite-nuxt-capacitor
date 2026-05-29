<template>
  <nav class="relative z-50">
    <ul class="flex items-center gap-4.5">
      <li
        v-if="categories && categories.length"
        class="flex group items-center gap-1.5 text-gray-700 group py-2"
      >
        <span class="flex">
          <IconsResMenu class="w-6 h-6 text-gray-700" />
        </span>
        <span> همه دسته بندی ها</span>
        <HeaderMenusSubMenuCategories :categories="categories" />
      </li>
      <template v-if="loading || !ready">
        <ShareSkeleton v-for="value in 4" :key="value" class="h-3 w-14" />
      </template>
      <template v-else-if="menus && menus.length">
        <li
          v-for="(menu, index) in menus"
          :key="menu?.id ?? index"
          class="relative item-menu"
        >
          <ShareDynamicLinker :item="menu?.link" class="text-gray-700">
            {{ menu?.title ?? "" }}
          </ShareDynamicLinker>
          <template v-if="menu && menu.children && menu.children.length">
            <HeaderMenusSubMenu
              :menus="menu.children.length ? menu.children : []"
              class="sub-menu"
            />
          </template>
        </li>
      </template>
    </ul>
  </nav>
</template>
<script setup>
const store = useCategoriesStore();
const storeMenus = useMenusStore();
const categories = computed(() => store.getCategoriesData);
const menus = computed(() => storeMenus.getHeader);
const loading = computed(() => storeMenus.getLoading);
const ready = ref(false);
if (!categories.value) {
  useAsyncData(
    async () => {
      await store.setCategories();
      return { fetched: true };
    },
    { lazy: false },
  );
}
if (!menus.value) {
  useAsyncData(
    async () => {
      await storeMenus.setMenus();
      return { fetched: true };
    },
    { lazy: false },
  );
}

onMounted(() => {
  ready.value = true;
});
</script>
<style scoped>
.item-menu:hover .sub-menu {
  visibility: visible;
  opacity: 1;
  top: 100%;
}
</style>
