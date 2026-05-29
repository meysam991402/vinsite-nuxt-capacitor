<template>
  <div
    class="w-[90%] sm:w-[500px] max-h-10/12 overflow-auto rounded-xl flex flex-col bg-white gap-2 p-6"
  >
    <div class="flex justify-between pb-2 border-b-1 border-gray-300 mb-3">
      <span class="text-lg font-bold color-neutral-500">آدرس‌ها</span>
      <button type="button" class="" @click="emit('close')">
        <IconsDeleted class="size-5" />
      </button>
    </div>
    <button
      type="button"
      @click="showModalAddAddress = true"
      class="flex items-center gap-1 border-1 md:w-fit px-3 py-1 mx-auto border-gray-300 text-neutral-70 hover:bg-black hover:text-white transition-all duration-300 ease-linear rounded-lg text-base"
    >
      <IconsPlus class="size-5" />
      <span> افزودن آدرس جدید </span>
    </button>
    <ul class="flex flex-col gap-3 mt-2">
      <li
        v-for="(address, index) in addresses"
        :key="address?.id ?? index"
        class="w-full"
      >
        <AddressCard :address="address" />
      </li>
    </ul>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddAddress = false" v-if="showModalAddAddress">
        <AddressModalAddAddress @close="showModalAddAddress = false" />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
const emit = defineEmits("close");
let showModalAddAddress = ref(false);
</script>
