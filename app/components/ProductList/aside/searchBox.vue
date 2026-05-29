<template>
  <div class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2">
    <div class="flex gap-1.5 sm:gap-3 items-center pb-2 border-b border-b-gray-200">
      <h4 class="text-sm sm:text-base hidden md:block font-bold text-neutral-600">جست‌وجو</h4>
      <span class="horizontal-divider hidden md:block w-[2px] h-6 bg-neutral-400"></span>
      <form class="grow max-w-full" @submit.prevent="setQueryTitle">
        <label for="item-search-input" class="rounded-lg px-3 py-1 flex grow gap-1 items-center bg-white">
          <IconsSearch class="size-5 text-neutral-600" />
          <input type="text" v-model="itemsSearch" @input="setTitle" class="grow    p-1 text-sm" name="item"
            id="item-search-input" placeholder="جست‌وجو ..." />
        </label>
      </form>
    </div>
  </div>
</template>
<script setup>
const store = useProductsStore();
let route = useRoute();
const { addQuery } = useAddQuery();
let itemsSearch = ref(route?.query?.title || "");
function setQueryTitle() {
  addQuery({ title: itemsSearch.value });
}
function setTitle() {
  store.setTitleSearch(itemsSearch.value);
}
</script>
