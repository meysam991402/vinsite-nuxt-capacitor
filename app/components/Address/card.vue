<template>
  <article
    @click="changeAddress(address)"
    class="w-full flex flex-col cursor-pointer gap-2 p-4 border-2 rounded-lg border-gray-100 transition-all duration-300 ease-linear"
    :class="{
      'bg-green-50 border-2 border-green-400':
        selectedAddress.id == address?.id && route.name == 'orders-list-step2',
    }"
  >
    <!-- <div class="flex max-w-full overflow-auto"> -->
    <!-- <span class="text-base text-nowrap">{{
        address?.city?.province?.name ?? ""
      }}</span>
      <span class="text-base text-nowrap">,</span>
      <span class="text-base text-nowrap">{{ address?.city?.name ?? "" }}</span>
      <span class="text-base text-nowrap">,</span>
      <span class="text-base text-nowrap">{{ address?.address ?? "" }}</span> -->
    <p class="text-base">
      {{
        `${address?.city?.province?.name + "،" ?? ""} ${address?.city?.name + "،" ?? ""} ${address?.address ?? ""}`
      }}
    </p>
    <!-- </div> -->
    <div class="flex justify-between">
      <div class="flex gap-1 text-sm text-neutral-600">
        <span>
          {{ `${address?.first_name ?? ""} ${address?.last_name ?? ""}` }}
        </span>
      </div>
      <div class="flex items-center gap-4">
        <button
          @click.stop="deleteAddress(address?.id)"
          :class="{ 'opacity-50 cursor-not-allowed': loadingDeleteAddress }"
          type="button"
          class="pt-1 pb-0.5 px-4 rounded-lg text-white bg-red-500 transition-all duration-300 ease-linear text-sm"
        >
          <span v-if="loadingDeleteAddress">
            <ShareLoaderBtn :message="''" />
          </span>
          <span v-else> حذف </span>
        </button>
        <button
          type="button"
          @click="showModalAddAddress = true"
          class="pt-1 pb-0.5 px-4 rounded-lg text-white bg-green-700 transition-all duration-300 ease-linear text-sm"
        >
          ویرایش
        </button>
      </div>
    </div>
  </article>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddAddress = false" v-if="showModalAddAddress">
        <AddressModalAddAddress
          @close="showModalAddAddress = false"
          mode="edit"
          :addressCart="address"
        />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
const storeAddress = useCartStore();
let loadingDeleteAddress = computed(() => storeAddress.getLoadingDeleteAddress);
let selectedAddress = computed(() => storeAddress.getSelectedAddress);
let route = useRoute();
let props = defineProps({
  address: Object,
  activeBox: Number,
  index: Number,
});
let emit = defineEmits("changeAddress");
let showModalAddAddress = ref(false);
function changeAddress(address) {
  if (route.name == "orders-list-step2") {
    emit("changeAddress", address);
  }
}
function deleteAddress(id) {
  storeAddress.deletedAddress(id);
}
</script>
