<template>
  <div class="min-w-full">
    <div class="mb-8">
      <h3 class="text-lg lg:text-xl font-semibold text-center">لیست سفارشات</h3>
      <span class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3">
      </span>
    </div>
    <ul v-if="loading || !ready"
      class="flex items-center gap-4 min-w-full w-full overflow-auto pb-1.5 text-sm lg:text-base mb-6">
      <li v-for="item in 7" :key="item">

        <ShareSkeleton class="h-7 w-24 mx-auto py-1 px-4 rounded-lg border border-gray-400 text-nowrap" />

      </li>
    </ul>
    <ul v-else-if="statuses && statuses.length"
      class="flex items-center gap-4 min-w-full w-full overflow-auto pb-1.5 text-sm lg:text-base mb-6">
      <li v-for="(item, index) in statuses" :key="item?.id ?? index">
        <button @click="setStatus(item.name)" class="py-1 px-4 rounded-lg border border-gray-400 text-nowrap"
          :class="{ 'bg-black text-white': activeFilter == item.name }">
          <span>{{ `${item?.label ?? ""} (${item?.count ?? ""})` }}</span>

        </button>
      </li>
    </ul>



    <div v-if="loading || !ready" class="min-w-full overflow-auto">

      <table class="w-full">
        <thead>
          <tr class="border-b border-b-gray-600">
            <th class="py-3 px-1.5 text-nowrap text-sm lg:text-base" v-for="(item, index) in fields"
              :key="item?.id ?? index">
              {{ item?.title ?? "" }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-400">
          <tr v-for="index in 3" :key="index">
            <td v-for="index in 7" :key="index" class="py-4 px-2 text-center">
              <ShareSkeleton class="h-7 w-24 mx-auto" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="orders && orders?.data && orders?.data?.length">

      <div class="min-w-full overflow-auto">

        <table class="w-full">
          <thead>
            <tr class="border-b border-b-gray-600">
              <th class="py-3 px-1.5 text-nowrap text-sm lg:text-base" v-for="(item, index) in fields"
                :key="item?.id ?? index">
                {{ item?.title ?? "" }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-400">
            <tr v-for="(order, index) in orders.data" :key="item?.id ?? index">
              <td v-for="(item, index) in fields" :key="item?.id ?? index"
                class="text-center py-2 px-1.5 text-nowrap *:text-sm lg:*:text-base">
                <template v-if="item.key == 'shipping_amount'">
                  <span>{{
                    order[item.key] == 0 || order[item.key] == null
                      ? "رایگان"
                      : order[item.key].toLocaleString()
                  }}</span>
                </template>
                <template v-else-if="item.key == 'total_discount_amount'">
                  <span>{{
                    order[item.key] == 0 || order[item.key] == null
                      ? "بدون تخفیف"
                      : order[item.key].toLocaleString()
                  }}</span>
                </template>
                <template v-else-if="item.key == 'status'">
                  <span class="text-white inline-block w-full h-full rounded-lg p-1.5 text-sm"
                    :class="translateStatus(order.status).style">{{ translateStatus(order.status).title }}</span>
                </template>
                <template v-else-if="item.key == 'total_amount'">
                  <span>{{
                    order[item.key] == 0 || order[item.key] == null
                      ? "-------"
                      : order[item.key].toLocaleString()
                  }}</span>
                </template>
                <template v-else-if="item.key == 'created_at'">
                  <span>{{
                    new Date(order[item.key]).toLocaleDateString("fa-IR")
                  }}</span>
                </template>
                <template v-else-if="item.key == 'detail'">
                  <nuxt-link :to="`/orders/${order.id}`"
                    class="rounded text-nowrap w-full px-2 py-1 bg-gray-300 info text-center text-sm">
                    جزئیات
                  </nuxt-link>
                  <!-- <nuxt-link v-if="item.status === 'new' && false" :to="`/orders/edit/${item.id}`" class="rounded  text-nowrap w-full px-2 py-1 text-white bg-[#177373] info text-center text-sm border border-border-color border-solid">
                    ویرایش
                  </nuxt-link> 
                  <button v-if="item.status === 'new'" @click="cancelOrder(item.id , item.total_invoices_amount)" class="rounded  text-nowrap w-full px-2 py-1 text-white bg-[#bf0436] info text-center text-sm border border-border-color border-solid">
                    لغو سفارش
                  </button> -->
                </template>
                <span v-else>{{ order[item.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SharePagination :data="orders" />
    </div>

    <h4 v-else class="mt-2 text-center font-semibold text-sm lg:text-base">
      اطلاعاتی برای نمایش وجود ندارد
    </h4>

  </div>
</template>
<script setup>
import translateStatus from "~/utils/tarnslateStatus";
const store = useOrderListStore()
const loading = computed(() => store.getLoading);
const statuses = computed(() => store.getStatuses);
const orders = computed(() => store.getOrderList);
const activeFilter = computed(() => store.getActiveFilter);
let route = useRoute()
// const loading = computed(() => storeUser.getLogin);
let ready = ref(false)
onMounted(() => {
  ready.value = true;
});
const { addQuery } = useAddQuery();
useAsyncData(
  () => `orders-fetch-${new Date()}`,
  async () => {
    await store.setOrderList(route.query);
    return { fetched: true };
  },
  { lazy: false },
);
watch(
  () => route.query,
  (newVal) => {
    store.setOrderList(route.query);
  },
);
const fields = ref([
  { title: "شناسه", id: 2, key: "id" },
  { title: "هزینه ارسال (تومان)", id: 5, key: "shipping_amount" },
  { title: "تخفیف", id: 4, key: "total_discount_amount" },
  { title: "وضعیت", id: 6, key: "status" },
  { title: "مبلغ فاکتور (تومان)", id: 3, key: "total_amount" },
  { title: "تاریخ سفارش", id: 7, key: "created_at" },
  { title: "جزئیات", id: 8, key: "detail" },
]);

function setStatus(key) {
  store.setActiveFilter(key)

  addQuery({ status: key });
}

</script>
