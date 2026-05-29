<template>
  <div class="min-w-full">
    <div class="mb-8">
      <div class="relative flex items-center justify-between sm:block">
        <h3 class="text-lg lg:text-xl font-semibold text-center">کیف پول</h3>
        <div class="sm:absolute top-0 left-0">
          <PanelAddCredit />
        </div>
      </div>
      <span
        class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3"
      >
      </span>
    </div>
    <ul
      v-if="loading || !ready"
      class="flex items-center gap-4 min-w-full w-full overflow-auto pb-1.5 text-sm lg:text-base mb-6"
    >
      <li v-for="item in 3" :key="item">
        <ShareSkeleton
          class="h-7 w-24 mx-auto py-1 px-4 rounded-lg border border-gray-400 text-nowrap"
        />
      </li>
    </ul>
    <ul
      v-else-if="transactionsTypes && transactionsTypes.length"
      class="flex items-center gap-4 min-w-full w-full overflow-auto pb-1.5 text-sm lg:text-base mb-6"
    >
      <li v-for="(item, index) in transactionsTypes" :key="item?.id ?? index">
        <button
          @click="setStatus(item.name)"
          class="py-1 px-4 rounded-lg border border-gray-400 text-nowrap"
          :class="{ 'bg-black text-white': activeFilter == item.name }"
        >
          <span>{{ `${item?.label ?? ""} (${item?.count ?? ""})` }}</span>
        </button>
      </li>
    </ul>

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
          <tr v-for="index in 3" :key="index">
            <td v-for="index in 5" :key="index" class="py-4 px-2 text-center">
              <ShareSkeleton class="h-7 w-24 mx-auto" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else-if="
        transactions &&
        transactions?.wallet_transactions &&
        transactions?.wallet_transactions?.data?.length
      "
    >
      <div class="min-w-full overflow-auto">
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
            <tr
              v-for="(transaction, index) in transactions?.wallet_transactions
                ?.data"
              :key="transaction?.id ?? `transaction-${index}`"
            >
              <td
                v-for="(item, index) in fields"
                :key="item?.id ?? index"
                class="text-center py-2 px-1.5 text-nowrap *:text-sm lg:*:text-base"
              >
                <template v-if="item.key == 'type'">
                  <span
                    class="text-white inline-block w-full h-full rounded-lg p-1.5 text-sm"
                    :class="translateStatus(transaction.type).style"
                    >{{ translateStatus(transaction.type).title }}</span
                  >
                </template>
                <template v-else-if="item.key == 'created_at'">
                  <span>{{
                    new Date(transaction[item.key]).toLocaleDateString("fa-IR")
                  }}</span>
                </template>
                <template v-else-if="item.key == 'amount'">
                  <span>{{
                    transaction[item.key] == 0 || transaction[item.key] == null
                      ? "-------"
                      : transaction[item.key].toLocaleString()
                  }}</span>
                </template>
                <span v-else>{{ transaction[item.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SharePagination :data="transactions?.wallet_transactions" />
    </div>

    <h4 v-else class="mt-2 text-center font-semibold text-sm lg:text-base">
      اطلاعاتی برای نمایش وجود ندارد
    </h4>
  </div>
</template>
<script setup>
import translateStatus from "~/utils/tarnslateStatus";
const store = useWalletStore();
const { addQuery } = useAddQuery();
let activeFilter = ref("all");
let route = useRoute();
const transactions = computed(() => store.getTransactions);
const transactionsTypes = computed(() => store.getTransactionsTypes);
const loading = computed(() => store.getLoadingTransactions);
let ready = ref(false);
activeFilter.value = route.query.type ?? "all";
onMounted(() => {
  ready.value = true;
});
useAsyncData(
  () => `transactions-fetch-${new Date()}`,
  async () => {
    await store.requestTransactions(route.query);
    return { fetched: true };
  },
  { lazy: false },
);
const fields = ref([
  { title: "شناسه", id: 1, key: "id" },
  { title: "نوع تراکنش", id: 2, key: "type" },
  { title: "تاریخ تراکنش", id: 3, key: "created_at" },
  { title: "مبلغ(تومان)", id: 4, key: "amount" },
  // { title: "وضعیت", id: 5, key: "status" },
  { title: "توضیحات", id: 6, key: "description" },
]);
watch(
  () => route.query,
  (newVal) => {
    store.requestTransactions(route.query);
  },
);
function setStatus(key) {
  addQuery({ type: key });
  activeFilter.value = key;
}
</script>
