<script setup>
const props = defineProps({
  items: Array,
  title: String,
  loading: Boolean,
});
const route = useRoute();
const router = useRouter();
const ready = ref(false);
const itemsSearch = ref("");
const selectedItems = ref([]);
const filteredItems = computed(() => {
  if (!itemsSearch.value) {
    return props.items;
  }
  const searchTerm = itemsSearch.value.toLowerCase();
  return props.items.filter(
    (item) =>
      // چک کردن هر دو خاصیت احتمالی برای انعطاف‌پذیری
      (item.title && item.title.toLowerCase().includes(searchTerm)) ||
      (item.name && item.name.toLowerCase().includes(searchTerm)),
  );
});
// ۲. تابع برای مدیریت انتخاب/حذف
function itemInput(item) {
  if (!item) return;
  const index = selectedItems.value.indexOf(item?.id);
  if (index > -1) {
    // اگر قبلاً انتخاب شده بود، حذفش کن
    selectedItems.value.splice(index, 1);
  } else {
    // اگر انتخاب نشده بود، اضافه اش کن
    selectedItems.value.push(item.id);
  }
  //اضافه کردن به query
  router.push({
    name: route.name,
    params: route.params,
    query: {
      ...route.query,
      brand_id: selectedItems.value.join(","),
    },
  });
}
onMounted(() => {
  ready.value = true;
  if (route.query.brand_id) {
    // رشته رو با کاما جدا می‌کنیم و تبدیل به آرایه می‌کنیم
    selectedItems.value = route.query.brand_id
      .split(",")
      .map((id) => Number(id) || id);
  }
});
</script>
<template>
  <div v-if="loading || !ready" class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2">
    <h4 class="w-p-100 pb-2 border-b-1 border-b-gray-200 text-base font-bold text-neutral-600">
      برند ها
    </h4>
    <ul class="overflow-auto px-1 py-2 w-p-100 h-p-100 d-flex flex-col gap-3">
      <ShareSkeleton v-for="index in 5" :key="index" class="w-full h-4 mb-2" />
    </ul>
  </div>
  <div v-else-if="items && items?.length" class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2 w-full">
    <div class="flex gap-2 items-center pb-2 border-b border-b-gray-200">
      <h4 class="text-base font-bold text-neutral-600">{{ title }}</h4>
      <span class="horizontal-divider hidden lg:block w-[2px] h-6 bg-neutral-400"></span>
      <label for="item-search-input" class="rounded-lg px-3 py-1 w-[150px] flex grow gap-1 items-center bg-white">
        <IconsSearch class="size-5 text-neutral-600" />
        <input type="text" v-model="itemsSearch" class="grow  p-1 text-sm" name="item" id="item-search-input"
          placeholder="جست‌وجو ..." />
      </label>
    </div>

    <form class="flex flex-col gap-3 overflow-auto py-3 px-1 h-44 lg:h-60">
      <template v-if="filteredItems.length > 0">
        <label v-for="(item, index) in filteredItems" :key="item?.id ?? index" :for="item?.name ?? ''"
          class="flex cursor-pointer gap-2 items-center group">
          <input :id="item?.name ?? ''" type="checkbox" :value="item?.id ?? ''"
            :checked="selectedItems.includes(item.id)" @change="itemInput(item)" class="accent-neutral-400 size-4" />
          <span class="text-neutral-500 group-hover:text-black transition-all duration-300 text-medium">
            {{ item?.label ?? "" }}
          </span>
        </label>
      </template>
      <template v-else-if="itemsSearch">
        <p class="text-center text-sm text-neutral-500 py-10">
          <IconsSearch class="size-6 text-neutral-400 mx-auto mb-2" />
          جست‌وجو برای "{{ itemsSearch }}" موردی یافت نشد.
        </p>
      </template>

      <template v-else>
        <p class="text-center text-sm text-neutral-500 py-10">لیست خالی است.</p>
      </template>
    </form>
  </div>
</template>
