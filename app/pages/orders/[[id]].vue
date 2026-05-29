<template>
  <main>
    <BreadCrump :list="breadCrump" />
    <section class="container mt-6">
      <div v-if="loading || !ready" class="min-w-full overflow-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-b-gray-600">
              <th
                class="py-3 px-1.5 text-nowrap text-sm lg:text-base"
                v-for="(item, index) in fields"
                :key="item?.id ?? index"
              >
                {{ item?.title ?? "" }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-400">
            <tr v-for="index in 2" :key="index">
              <td v-for="index in 6" :key="index" class="py-4 px-2 text-center">
                <ShareSkeleton class="h-7 w-24 sm:w-32 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h4
          class="w-fit mb-4 flex items-center gap-1.5"
          v-if="order && order?.status"
        >
          <b>وضعیت فاکتور :</b>
          <span
            class="py-[3px] px-1.5 rounded-lg"
            :class="translateStatus(order.status).style"
            >{{ translateStatus(order.status).title }}</span
          >
        </h4>
        <div
          class="min-w-full overflow-auto"
          v-if="order && order.items && order.items.length"
        >
          <table class="w-full **:text-nowrap">
            <thead>
              <tr class="border-b border-b-gray-600">
                <th
                  class="py-3 px-1.5 text-nowrap text-sm lg:text-base"
                  v-for="(item, index) in fields"
                  :key="item?.id ?? index"
                >
                  {{ item?.title ?? "" }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-400">
              <tr v-for="(item, index) in order.items" :key="item?.id ?? index">
                <td class="py-4 px-2 text-center">
                  {{ order?.id ?? "-" }}
                </td>
                <td class="py-4 px-2 text-center">
                  {{ item?.variety?.full_title ?? "-" }}
                </td>
                <td class="py-4 px-2 text-center">
                  {{ item?.real_amount?.toLocaleString() ?? "=" }}
                </td>
                <td class="py-4 px-2 text-center">
                  {{ item?.discount_amount?.toLocaleString() ?? "" }}
                </td>
                <td class="py-4 px-2 text-center">
                  {{ item?.quantity ?? "" }}
                </td>
                <td class="py-4 px-2 text-center">
                  {{ item?.total_amount?.toLocaleString() ?? "" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 v-else class="mt-2 text-center font-semibold text-sm lg:text-base">
          اطلاعاتی برای نمایش وجود ندارد
        </h4>
      </div>
    </section>
  </main>
</template>
<script setup>
import translateStatus from "~/utils/tarnslateStatus";
const store = useOrderStore();
const route = useRoute();
const order = computed(() => store.getOrder);
const loading = computed(() => store.getLoading);
const breadCrump = ref([{ title: "فاکتور", link: "" }]);

let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
useAsyncData(
  () => `order-fetch-${new Date()}}`,
  async () => {
    await store.setOrder(route.params.id);
    return { fetched: true };
  },
  {
    lazy: false,
  },
);

let fields = ref([
  { title: "شناسه", id: 1 },
  // { title: "تاریخ سفارش", id: 7, key: "created_at" },
  { title: "محصول", id: 2 },
  { title: "قیمت اصلی", id: 3 },
  { title: "تخفیف", id: 4 },
  { title: "تعداد", id: 5 },
  { title: "قیمت نهایی", id: 6 },
]);
</script>
