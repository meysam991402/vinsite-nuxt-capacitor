<template>
  <section class="mt-12" v-if="product">
    <div class="container">
      <!-- {{ mackList(product).length }} -->
      <ul class="flex items-center justify-center gap-4 lg:gap-10">
        <li v-for="(item, index) in lists" :key="item?.id ?? index">
          <button
            class="p-1 text-sm lg:text-base text-nowrap"
            @click="activeTab = item.key"
            :class="{
              'border-b border-b-solid border-b-black font-bold':
                activeTab == item?.key,
            }"
          >
            {{ item?.title ?? "" }}
          </button>
        </li>
      </ul>
      <div class="py-8">
        <ProductDetailInformationsReview
          v-if="activeTab == 'review' && product?.description"
          :description="product?.description"
        />
        <ProductDetailInformationsAdditionalInformation
          :specifications="product?.specifications"
          v-if="
            activeTab == 'additional_information' && product?.specifications
          "
        />
        <ProductDetailInformationsUserComments
          :comments="product.comments"
          v-if="activeTab == 'user_comments'"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
const store = useProductStore();
const product = computed(() => store.getProduct);
let lists = ref([]);
let activeTab = ref("");

function mackList(product) {
  if (product?.description) {
    lists.value.push({ title: "نقد و بررسی", id: 1, key: "review" });
  }
  if (product?.specifications && product?.specifications.length) {
    lists.value.push({
      title: "توضیحات تکمیلی",
      id: 2,
      key: "additional_information",
    });
  }

  lists.value.push({ title: "دیدگاه کاربران", id: 3, key: "user_comments" });
  activeTab = ref(lists.value[0].key);
  return lists.value;
}
onMounted(() => {
  mackList(product.value);
});
// let lists = ref([
//   { title: "نقد و بررسی", id: 1, key: "review" },
//   { title: "توضیحات تکمیلی", id: 2, key: "additional_information" },
//   { title: "دیدگاه کاربران", id: 3, key: "user_comments" },
// ]);
</script>
