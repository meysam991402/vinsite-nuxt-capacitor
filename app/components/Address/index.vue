<script setup>
let props = defineProps({
  title: {
    type: String,
    default: "آدرس دریافت سفارش",
  },
  typePage: {
    type: String,
    default: "",
  },
});
const storeAddress = useCartStore();
let addresses = computed(() => storeAddress.getAddress);
// let selectedAddress = computed(() => storeAddress.getSelectedAddress);
if (props.typePage == "panel") {
  if (addresses.value == null) {
    storeAddress.requestAddresses(props.typePage);
  }
} else {
  storeAddress.requestAddresses(props.typePage);
}
let loadingAddress = computed(() => storeAddress.getLoadingAddress);

let showModalAddAddress = ref(false);
let activeBox = ref(null);
async function changeAddress(address) {
  activeBox.value = address.id;
  storeAddress.setSelectedAddress(address, props.typePage);
}
</script>
<template>
  <div v-if="loadingAddress" class="grid grid-cols-1 gap-3">
    <ShareSkeleton class="w-full h-32" v-for="i in 3" :key="i" />
  </div>
  <div v-else>
    <div
      class="flex items-center justify-between md:justify-center relative flex-row gap-2"
    >
      <div class="flex gap-2 items-center">
        <IconsAddressList class="fill-neutral-500 size-6" />
        <span class="text-lg lg:text-xl font-semibold text-center">{{
          title
        }}</span>
      </div>

      <button
        @click="showModalAddAddress = true"
        type="button"
        class="sm:absolute top-0 left-0 flex items-center justify-center gap-1 text-neutral-700 text-nowrap text-sm font-bold py-1.5 px-2 sm:px-4 rounded-lg border border-gray-300 transition duration-300 hover:bg-black hover:text-white"
      >
        <IconsPlus class="size-5" />
        <span> افزودن آدرس</span>
      </button>
    </div>
    <span
      class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3"
    >
    </span>
    <p v-if="addresses && addresses.length" class="mt-4">
      {{ `تعداد آدرس های موجود : ${addresses.length}` }}
    </p>
    <div class="mt-4">
      <div
        v-if="addresses && addresses.length"
        class="space-y-4 p-1.5 max-h-[500px] overflow-auto"
      >
        <!-- <Address />
        <AddressModalAddress @close="showModalAddress = false" /> -->
        <template
          v-for="(address, index) in addresses"
          :key="address?.id ?? index"
        >
          <AddressCard
            :index="index"
            @changeAddress="changeAddress"
            :activeBox="activeBox"
            v-if="address"
            :address="address"
          />
        </template>
      </div>
      <h4 v-else class="text-center font-bold mt-6">
        ادرسی برای شما ثبت نشده است
      </h4>
    </div>
  </div>
  <!-- <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddress = false" v-if="showModalAddress">
        <AddressModalAddress @close="showModalAddress = false" />
      </Modal>
    </Transition>
  </Teleport> -->
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddAddress = false" v-if="showModalAddAddress">
        <AddressModalAddAddress
          :type="props.typePage"
          @close="showModalAddAddress = false"
          mode="create"
        />
      </Modal>
    </Transition>
  </Teleport>
</template>
