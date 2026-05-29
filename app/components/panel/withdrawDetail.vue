<template>
  <div class="w-[95%] sm:w-[500px] p-4 bg-white rounded-2xl">
    <h4
      class="flex items-center gap-1 text-lg font-bold border-b border-b-solid border-b-gray-300 pb-2"
    >
      <span class="flex">
        <IconsWallet class="size-5" />
      </span>
      <span> جزئیات </span>
    </h4>

    <div v-if="data">
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
            <tr>
              <td
                v-for="(item, index) in fields"
                :key="item?.id ?? index"
                class="text-center py-2 px-1.5 text-nowrap *:text-sm lg:*:text-base"
              >
                <template v-if="item.key == 'created_at'">
                  <span>{{
                    new Date(data[item.key]).toLocaleDateString("fa-IR")
                  }}</span>
                </template>
                <template v-else-if="item.key == 'amount'">
                  <span>{{
                    data[item.key] == 0 || data[item.key] == null
                      ? "-------"
                      : data[item.key].toLocaleString()
                  }}</span>
                </template>
                <template v-else-if="item.key == 'tracking_code'">
                  <span>{{
                    data[item.key] == null ? "-------" : data[item.key]
                  }}</span>
                </template>

                <span v-else>{{ data[item.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-end mt-6" v-if="data?.is_cancelable">
      <button
        @click="withdrawCancel"
        :disabled="disabled"
        :class="{
          'cursor-not-allowed opacity-50': disabled,
        }"
        class="text-sm bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-all duration-300"
      >
        <ShareLoaderBtn
          message="درحال پردازش ..."
          v-if="disabled"
        ></ShareLoaderBtn>
        <span v-else>لغو برداشت</span>
      </button>
    </div>
  </div>
</template>
<script setup>
const store = useWalletStore();
const storeUser = useUserStore();
const disabled = computed(() => store.getLoadingWithdrawcancel);
let ready = ref(false);
let route = useRoute();
onMounted(() => {
  ready.value = true;
});

let props = defineProps({
  data: Object,
});
const fields = ref([
  { title: "مبلغ(تومان)", id: 4, key: "amount" },
  { title: "شماره کارت", id: 2, key: "card_number" },
  { title: "شماره پیگیری", id: 2, key: "tracking_code" },
  { title: "تاریخ تراکنش", id: 3, key: "created_at" },
]);
async function withdrawCancel() {
  await useAsyncData(
    () => `Withdraws-fetch-Cancel-${new Date()}`,
    async () => {
      await store.requestWithdrawCancel(props.data.id, route.query);
      return { fetched: true };
    },
    { lazy: false },
  );
  useAsyncData(
    () => `Profile-fetch-${new Date()}`,
    async () => {
      await storeUser.requestProfile();
      return { fetched: true };
    },
    { lazy: false },
  );
}
</script>
