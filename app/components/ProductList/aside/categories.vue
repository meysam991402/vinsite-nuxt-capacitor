<script setup>
const store = useCategoriesStore();
let categories = computed(() => store.getCategoriesData);
let loading = computed(() => store.getLoading);
let ready = ref(false);
const route = useRoute();
const router = useRouter();
onMounted(() => {
  ready.value = true;
});
function chooseCategory(id) {
  if (!id) return;
  const numericId = Number(id);
  router.push({
    name: route.name,
    params: route.params,
    query: {
      ...route.query,
      category_id: numericId,
    },
  });
}
const getSelectedId = () => {
  const selectedId = route.query.category_id;
  if (!selectedId) return null;
  return Number(selectedId);
};
const isTargetInSubtree = (items, targetId) => {
  if (!items || items.length === 0) return false;
  for (const item of items) {
    // مقایسه از نوع دقیق (===) اکنون صحیح است چون targetId عدد است.
    if (item.id === targetId) return true;
    // بررسی می‌کنیم که آیا children وجود دارد و یک آرایه است، سپس بازگشتی می‌کنیم.
    if (Array.isArray(item.children) && item.children.length > 0) {
      if (isTargetInSubtree(item.children, targetId)) {
        return true;
      }
    }
  }
  return false;
};
/**
 * تعیین می‌کند که آیا یک آیتم خاص باید باز بماند یا خیر.
 */
const isOpen = (currentItem) => {
  const selectedId = getSelectedId();
  if (!selectedId) return false;

  // 1. اگر خود آیتم انتخاب شده باشد
  if (currentItem.id === selectedId) return true;

  // 2. اگر یکی از فرزندان انتخاب شده باشد
  if (Array.isArray(currentItem.children) && currentItem.children.length > 0) {
    return isTargetInSubtree(currentItem.children, selectedId);
  }

  return false;
};
</script>

<template>
  <div
    v-if="loading || !ready"
    class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
  >
    <h4
      class="w-p-100 pb-2 border-b-1 border-b-gray-200 text-base font-bold text-neutral-600"
    >
      نتایج دسته بندی
    </h4>
    <ul class="overflow-auto px-1 py-2 w-p-100 h-p-100 d-flex flex-col gap-3">
      <ShareSkeleton v-for="index in 5" :key="index" class="w-full h-4 mb-2" />
    </ul>
  </div>
  <div
    v-else-if="categories && categories.length"
    class="bg-neutral-100/50 rounded-xl p-4 flex flex-col gap-2"
  >
    <h4
      class="w-p-100 pb-2 border-b-1 border-b-gray-200 text-base font-bold text-neutral-600"
    >
      نتایج دسته بندی
    </h4>
    <ul class="overflow-auto px-1 py-2 w-p-100 h-p-100 d-flex flex-col gap-3">
      <li
        class="p-1"
        v-for="(item, index) in categories"
        :key="item?.id ?? index"
      >
        <template v-if="item?.children?.length">
          <details class="group/item" name="list" :open="isOpen(item)">
            <summary class="flex items-center justify-between">
              <button
                type="button"
                @click="chooseCategory(item?.id ?? '')"
                :class="{
                  'text-red-500 font-bold': route.query.category_id == item?.id,
                }"
                class="hover:text-neutral-500 transition-all duration-300"
              >
                {{ item?.title ?? "" }}
              </button>
              <span class="flex">
                <IconsArrow
                  class="w-4 h-4 group-open/item:-rotate-90 transition-all duration-300 text-neutral-500 hover:text-black ease-linear"
                />
              </span>
            </summary>
            <ul class="p-3">
              <li
                class="p-1"
                v-for="(subItem, index) in item?.children"
                :key="subItem?.id ?? index"
              >
                <template v-if="subItem?.children?.length">
                  <details
                    class="group/subCategory"
                    name="subCategory"
                    :open="isOpen(subItem)"
                  >
                    <summary class="flex items-center justify-between">
                      <button
                        type="button"
                        @click="chooseCategory(subItem?.id ?? '')"
                        :class="{
                          'text-red-500 font-bold':
                            route.query.category_id == subItem?.id,
                        }"
                        class="hover:text-neutral-500 transition-all duration-300"
                      >
                        {{ subItem?.title ?? "" }}
                      </button>
                      <span
                        class="flex group-open/subCategory:-rotate-90 transition-all duration-300 text-neutral-500 hover:text-black ease-linear"
                      >
                        <IconsArrow class="w-4 h-4" />
                      </span>
                    </summary>
                    <ul class="p-3">
                      <li
                        class="p-1"
                        v-for="(subItem2, index) in subItem?.children"
                        :key="subItem2?.id ?? index"
                      >
                        <template v-if="subItem2?.children?.length">
                          <details
                            class="group/subCategory2"
                            name="subCategory2"
                            :open="isOpen(subItem2)"
                          >
                            <summary class="flex items-center justify-between">
                              <button
                                type="button"
                                @click="chooseCategory(subItem2?.id ?? '')"
                                :class="{
                                  'text-red-500 font-bold':
                                    route.query.category_id == subItem2?.id,
                                }"
                                class="hover:text-neutral-500 transition-all duration-300"
                              >
                                {{ subItem2?.title ?? "" }}
                              </button>
                              <span
                                class="flex group-open/subCategory2:-rotate-90 transition-all duration-300 text-neutral-500 hover:text-black ease-linear"
                              >
                                <IconsArrow class="w-4 h-4" />
                              </span>
                            </summary>
                          </details>
                        </template>
                        <template v-else>
                          <button
                            type="button"
                            @click="chooseCategory(subItem2?.id ?? '')"
                            class="hover:text-neutral-500 transition-all duration-300"
                            :class="{
                              'text-red-500 font-bold':
                                route.query.category_id == subItem2?.id,
                            }"
                          >
                            {{ subItem2?.title ?? "" }}
                          </button>
                        </template>
                      </li>
                    </ul>
                  </details>
                </template>
                <template v-else>
                  <button
                    type="button"
                    @click="chooseCategory(subItem?.id ?? '')"
                    class="hover:text-neutral-500 transition-all duration-300"
                    :class="{
                      'text-red-500 font-bold':
                        route.query.category_id == subItem?.id,
                    }"
                  >
                    {{ subItem?.title ?? "" }}
                  </button>
                </template>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <button
            type="button"
            @click="chooseCategory(item?.id ?? '')"
            class="hover:text-neutral-500"
            :class="{
              'text-red-500 font-bold': route.query.category_id == item?.id,
            }"
          >
            {{ item?.title ?? "" }}
          </button>
        </template>
      </li>
    </ul>
  </div>
</template>
