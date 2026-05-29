<template>
  <div class="flex gap-4" v-if="loadingGateways">
    <ShareSkeleton class="size-[90px]" v-for="i in 3" :key="i" />
  </div>
  <div class="flex gap-4" v-else-if="gateways && gateways.length">
    <button v-for="(gateway, index) in gateways" :key="gateway?.id ?? index" type="button"
      @click="selectGateway(gateway)" :class="{
        'border-2 border-green-500 border-solid':
          selectedGateway.id == gateway.id,
      }" class="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] relative rounded-md overflow-hidden">
      <figure class="w-full relative h-full">
        <!-- <NuxtImg
          v-if="selectedGateway.id == gateway.id"
          format="webp"
          decoding="async"
          loading="lazy"
          class="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src="/images/order/tick-box.db941cf5.svg"
          alt="tick"
        /> -->
        <img v-if="selectedGateway.id == gateway.id"
          class="w-[20px] h-[20px] lg:w-[35px] lg:h-[35px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          loading="lazy" src="../../assets/images/order/tick-box.db941cf5.svg" alt="tick">
        <NuxtImg format="webp" decoding="async" loading="lazy" class="w-full h-full" :src="gateway?.image?.url ?? ''"
          :alt="gateway?.label ?? ''" />
      </figure>
    </button>
  </div>
</template>

<script setup>
const storeCarts = useCartStore();
let gateways = computed(() => storeCarts.getGateways);
let loadingGateways = computed(() => storeCarts.getLoadingGateways);
let selectedGateway = computed(() => storeCarts.getSelectedGateway);

onMounted(() => {
  storeCarts.requestGateways();
});
const selectGateway = (gateway) => {
  storeCarts.setSelectedGateway(gateway);
};
</script>
