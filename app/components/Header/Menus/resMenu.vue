<template>
  <section
    class="w-screen h-screen fixed top-0 right-0 bg-black/40 backdrop-blur-lg z-999 translate-x-[200%] transition-all ease-linear duration-500"
    @click.self="emit('close')">
    <div
      class="content transition-all ease-linear duration-300 delay-700 translate-x-[200%] w-full sm:w-1/2 bg-white h-full p-4 sm:p-8 overflow-auto">
      <div class="mb-8 flex items-center justify-between">
        <Logo class="w-36 md:w-52" />
        <button class="flex" @click="emit('close')">
          <IconsDeleted />
        </button>
      </div>
      <nav>
        <ul class="res-menu">
          <li v-if="categories && categories.length" class="py-2">
            <details class="item-menu group" name="item-menu">
              <summary class="flex items-center justify-between">
                <span>همه دسته بندی ها</span>
                <span class="flex group-open:-rotate-90 transition-all duration-300">
                  <IconsArrow class="w-4 h-4" />
                </span>
              </summary>
              <HeaderMenusDetailsSummery v-if="categories && categories.length" :list="categories" />
            </details>
          </li>
          <template v-if="menus && menus.length">
            <li v-for="(menu, index) in menus" :key="menu?.id ?? index" class="py-2">
              <details class="item-menu group" name="item-menu" v-if="menu?.children?.length">
                <summary class="flex items-center justify-between">

                  <ShareDynamicLinker :item="menu?.link">
                    {{ menu?.title ?? "" }}
                  </ShareDynamicLinker>
                  <span class="flex group-open:-rotate-90 transition-all duration-300">
                    <IconsArrow class="w-4 h-4" />
                  </span>
                </summary>
                <HeaderMenusDetailsSummery :list="menu?.children ?? []" />
              </details>
              <template v-else>

                <ShareDynamicLinker :item="menu?.link">
                  {{ menu?.title ?? "" }}
                </ShareDynamicLinker>
              </template>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </section>
</template>
<script setup>

const store = useCategoriesStore();
const storeMenus = useMenusStore();
const route = useRoute()
let categories = computed(() => store.getCategoriesData);
const menus = computed(() => storeMenus.getHeader);
const emit = defineEmits("close");
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
watch(() => route.fullPath, (newRoute) => {

  emit("close");

})


</script>
<style scoped>
.open {
  translate: 0;
}

.open .content {
  translate: 0;
}
</style>
