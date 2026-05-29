<template>
  <div class="min-w-full">
    <div class="mb-6">
      <div class="relative flex items-center justify-between sm:block">
        <h3 class="text-lg lg:text-xl font-semibold text-center">
          برداشت از کیف پول
        </h3>
        <div class="sm:absolute top-0 left-0">
          <PanelWithdrawBtn />
        </div>
      </div>
      <span
        class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3"
      >
      </span>
    </div>
    <div class="flex flex-col items-center gap-2 mb-8">
      <p>کاربر گرامی ؛ امکان برداشته مبالغ هدیه از کیف پول وجود ندارد</p>
      <p>
        مبلغ درخواستی شما طی 24 ساعت الی 48 ساعت کاری برای شما واریز می شود.
      </p>
      <p>درخواست برداشت وجه شما فقط در صورت کنسلی سفارش مورد تایید میباشد.</p>
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
      v-else-if="statuses && statuses.length"
      class="flex items-center gap-4 min-w-full w-full overflow-auto pb-1.5 text-sm lg:text-base mb-6"
    >
      <li v-for="(item, index) in statuses" :key="item?.id ?? index">
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
            <td v-for="index in 7" :key="index" class="py-4 px-2 text-center">
              <ShareSkeleton class="h-7 w-24 mx-auto" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="data && data?.withdraws && data?.withdraws?.data?.length">
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
              v-for="(withdraw, index) in data?.withdraws?.data"
              :key="withdraw?.id ?? `transaction-${index}`"
            >
              <td
                v-for="(item, index) in fields"
                :key="item?.id ?? index"
                class="text-center py-2 px-1.5 text-nowrap *:text-sm lg:*:text-base"
              >
                <template v-if="item.key == 'status'">
                  <span
                    class="text-white inline-block w-full h-full rounded-lg p-1.5 text-sm"
                    :class="translateStatus(withdraw[item.key]).style"
                    >{{ translateStatus(withdraw[item.key]).title }}</span
                  >
                </template>
                <template v-else-if="item.key == 'created_at'">
                  <span>{{
                    new Date(withdraw[item.key]).toLocaleDateString("fa-IR")
                  }}</span>
                </template>
                <template v-else-if="item.key == 'amount'">
                  <span>{{
                    withdraw[item.key] == 0 || withdraw[item.key] == null
                      ? "-------"
                      : withdraw[item.key].toLocaleString()
                  }}</span>
                </template>
                <template v-else-if="item.key == 'tracking_code'">
                  <span>{{
                    withdraw[item.key] == null ? "-------" : withdraw[item.key]
                  }}</span>
                </template>
                <template v-else-if="item.key == 'detail'">
                  <button
                    @click="showDetail(withdraw)"
                    class="text-sm! bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-all duration-300"
                  >
                    مشاهده
                  </button>
                </template>
                <span v-else>{{ withdraw[item.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SharePagination :data="data?.withdraws" />
    </div>

    <h4 v-else class="mt-2 text-center font-semibold text-sm lg:text-base">
      اطلاعاتی برای نمایش وجود ندارد
    </h4>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="store.setIsShowDetailModal(false)" v-if="isShowDetail">
        <PanelWithdrawDetail :data="withdrawDetail" />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
import translateStatus from "~/utils/tarnslateStatus";
const store = useWalletStore();
const { addQuery } = useAddQuery();
let route = useRoute();
const data = computed(() => store.getWithdraws);
const statuses = computed(() => store.getStatuses);
const loading = computed(() => store.getLoadingWithdraws);
let withdrawDetail = ref(null);
let activeFilter = ref(null);
let isShowDetail = computed(() => store.getIsShowDetailModal);
let ready = ref(false);
function showDetail(item) {
  withdrawDetail.value = item;
  store.setIsShowDetailModal(true);
}
onMounted(() => {
  ready.value = true;
  if (route.query.status) {
    activeFilter.value = route.query.status;
  } else {
    activeFilter.value = "all";
  }
});
useAsyncData(
  () => `Withdraws-fetch-${new Date()}`,
  async () => {
    await store.requestWithdraws(route.query);
    return { fetched: true };
  },
  { lazy: false },
);
const fields = ref([
  { title: "شناسه", id: 1, key: "id" },
  { title: "مبلغ(تومان)", id: 4, key: "amount" },
  { title: "وضعیت", id: 5, key: "status" },
  { title: "شماره پیگیری", id: 2, key: "tracking_code" },
  { title: "شماره کارت", id: 2, key: "card_number" },
  { title: "تاریخ تراکنش", id: 3, key: "created_at" },
  { title: "جزئیات", id: 6, key: "detail" },
]);
watch(
  () => route.query,
  (newVal) => {
    store.requestWithdraws(route.query);
  },
);
function setStatus(key) {
  addQuery({ status: key });
  activeFilter.value = key;
}
</script>
