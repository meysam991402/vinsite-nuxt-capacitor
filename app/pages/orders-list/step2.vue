<script setup>
const router = useRouter();
const storeAddress = useCartStore();
const carts = computed(() => storeAddress.getCarts);
const shippings = computed(() => storeAddress.getshippings);
const selectedAddress = computed(() => storeAddress.getSelectedAddress);
const loadingShippings = computed(() => storeAddress.getLoadingShippings);
const selectedShipping = computed(() => storeAddress.getSelectedShipping);
const deliveryVModal = ref(false);
const showModalAddAddress = ref(false);
function nextStep() {
  if (selectedAddress.value == null) {
    showModalAddAddress.value = true;
    useNuxtApp().$toast.error("کاربر گرامی ابتدا باید یک آدرس انتخاب کنید", {
      autoClose: 2000,
      dangerouslyHTMLString: true,
      rtl: true,
    });
  } else if (selectedShipping.value == null) {
    deliveryVModal.value = true;
    useNuxtApp().$toast.error(
      "کاربر گرامی ابتدا باید یک شیوه ارسال انتخاب کنید",
      {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      },
    );
  } else {
    router.push("/orders-list/step3");
  }
}
function changeShiiping(shipping) {
  storeAddress.setSelectedShippnig(shipping);
}
// watch(
//   () => selectedAddress.value,
//   (newLogin, oldLogin) => {
//     // فقط وقتی از لاگ‌آوت به لاگین واقعی برویم

//     if (selectedAddress.value!=null) {
//       // counter.value++;
//       storeAddress.requestShippings()
//     }
//   },
// );
// onMounted(async () => {
//   //برای اینکه اول ادرس بخوره و بعد روش ارسال
//   if (selectedAddress.value == null && shippings.value == null && carts.value && carts.value.length) {
//     storeAddress.requestAddresses();
//   }

// });
// watch(
//   () => carts.value,
//   (newVal) => {
//     if (shippings.value == null && carts.value && carts.value.length) {
//       storeAddress.requestShippings();
//     }
//   },
// );

</script>
<template>
  <section class="flex flex-col items-start lg:flex-row mb-4 mt-8 gap-5 lg:gap-8">
    <div class="w-full lg:w-7/12 bg-neutral-50 py-5 px-3 rounded-lg flex flex-col gap-3">
      <Address class="border-b border-b-neutral-400 pb-4" typePage="order-list" />
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <IconsDeliverSvg class="*:fill-neutral-500 size-7!" />
          <span class="text-lg font-bold text-neutral-600">شیوه تحویل</span>
        </div>
        <div class="delivery-method flex flex-col px-2 pb-2 gap-3">
          <span class="method text-md">پس از تایید آدرس، شیوه دریافت را تعیین کنید.</span>
          <div class="">
            <ShareSkeleton class="w-full h-20" v-if="loadingShippings && selectedShipping == null" />
            <article v-else
              class="flex bg-green-50 border-2 border-green-400 justify-between items-start p-1.5 rounded-xl lg:items-center gap-2 sm:flex-row flex-col">
              <div :id="`shippnig-${selectedShipping?.id ?? ''}`" class="flex gap-2 items-center">
                <figure class="w-12 md:w-16 flex">
                  <NuxtImg format="webp" loading="lazy" decoding="async" :src="selectedShipping?.logo?.url ?? ''"
                    :alt="selectedShipping?.name ?? ''" class="w-full" />
                </figure>
                <div class="flex flex-col gap-1">
                  <label :for="selectedShipping?.id ?? ''" class="text-sm">
                    {{ selectedShipping?.name ?? "" }}
                  </label>
                  <span v-if="selectedShipping?.description" class="text-sm" data-position="bottom">
                    {{ selectedShipping?.description ?? "" }}
                  </span>
                </div>
              </div>
              <div class="flex justify-end gap-1 text-sm">
                <span class="text-gray-600">هزینه ارسال:</span>
                <span class="'text-neutral-400">
                  {{
                    selectedShipping?.pay_at_home == 1
                      ? "درب منزل"
                      : selectedShipping?.amount_showcase == 0
                        ? "رایگان"
                        : `${(selectedShipping?.amount_showcase ?? "-")?.toLocaleString()} تومان`
                  }}
                </span>
              </div>
            </article>
          </div>
          <button type="button" @click="deliveryVModal = true"
            class="choose-method-btn text-neutral-700 text-sm rounded-lg font-bold py-2 px-5 mt-2 w-11/12 lg:w-fit border border-gray-300 transition duration-300 hover:bg-black hover:text-white active:translate-y-0.5 mx-auto lg:mx-0"
            :class="{ 'bg-black text-white': selectedShipping }">
            انتخاب شیوه ارسال
          </button>
        </div>
      </div>
    </div>
    <div
      class="w-full lg:w-5/12 top-24 price-details sticky h-fit bg-neutral-50 rounded-lg flex flex-col p-5 gap-lg-3 gap-1">
      <h6 class="text-lg font-bold text-primary-300">صورت حساب</h6>
      <OrdersListFactor />
      <button @click="nextStep"
        class="flex justify-center w-full mt-5 md:w-1/2 lg:w-4/5 mx-auto font-extrabold py-2 rounded-md bg-black text-white hover:bg-neutral-700 active:translate-y-0.5">
        مرحله بعـد
      </button>
    </div>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddAddress = false" v-if="showModalAddAddress">
        <AddressModalAddAddress @close="showModalAddAddress = false" mode="create" />
      </Modal>
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="deliveryVModal = false" v-if="deliveryVModal">
        <OrdersListDeliveryMethodModal @close="deliveryVModal = false" @changeShiiping="changeShiiping" />
      </Modal>
    </Transition>
  </Teleport>
</template>
