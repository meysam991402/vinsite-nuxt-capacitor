<script setup>
const storeShippnig = useCartStore();
let loadingShippings = computed(() => storeShippnig.getLoadingShippings);
let shippings = computed(() => storeShippnig.getshippings);

let selectedShipping = computed(() => storeShippnig.getSelectedShipping);

const emit = defineEmits(["close", "changeShiiping"]);

function selectDeliveryMethod(shipping) {
  emit("changeShiiping", shipping);
  emit("close");
}
</script>

<template>
  <div
    class="w-[95%] sm:w-[600px] max-h-[90vh] overflow-auto rounded-xl shadow-lg flex flex-col bg-white gap-2 p-3 sm:p-6"
  >
    <div class="flex justify-between pb-2 border-b-1 border-b-neutral-300">
      <span class="text-lg font-bold text-neutral-500">انتخاب شیوه ارسال</span>
      <button type="button" @click="emit('close')" class="text-gray-500">
        <IconsDeleted class="size-5" />
      </button>
    </div>
    <div class="delivery-methoform flex flex-col gap-2 mt-2">
      <div v-if="loadingShippings" class="flex flex-col gap-2">
        <ShareSkeleton class="w-full h-20" v-for="i in 4" :key="i" />
      </div>
      <div v-else>
        <div
          v-if="shippings && shippings?.length"
          class="flex justify-between gap-2 flex-col"
        >
          <article
            @click="selectDeliveryMethod(shipping)"
            class="flex cursor-pointer justify-between items-start border border-gray-300 p-1.5 rounded-xl lg:items-center gap-2 sm:flex-row flex-col"
            v-for="(shipping, index) in shippings"
            :key="shipping?.id ?? index"
            :class="{
              'border-2 border-green-400 ':
                selectedShipping?.id == shipping?.id,
            }"
          >
            <div
              :id="`shippnig-${shipping?.id ?? ''}`"
              class="flex gap-2 items-center"
            >
              <figure class="w-12 md:w-16 flex">
                <NuxtImg
                  format="webp"
                  decoding="async"
                  loading="lazy"
                  :src="shipping?.logo?.url ?? ''"
                  :alt="shipping?.name ?? ''"
                  class="w-full"
                />
              </figure>
              <div class="flex flex-col gap-1">
                <label :for="shipping?.id ?? ''" class="text-sm">
                  {{ shipping?.name ?? "" }}
                </label>
                <span
                  v-if="shipping?.description"
                  class="text-sm"
                  data-position="bottom"
                >
                  {{ shipping?.description ?? "" }}
                </span>
              </div>
            </div>
            <div class="flex justify-end gap-1 text-sm">
              <span class="text-gray-600">هزینه ارسال:</span>
              <span class="'text-neutral-400">
                {{
                  shipping?.pay_at_home == 1
                    ? "درب منزل"
                    : shipping?.amount_showcase == 0
                      ? "رایگان"
                      : `${shipping?.amount_showcase?.toLocaleString()} تومان`
                }}
              </span>
              <!-- <span v-else>
                {{ method?.cost.toLocaleString() ?? "" }}
                تومان
              </span> -->
            </div>
          </article>
        </div>
        <h4 v-else class="text-center font-bold">روش ارسالی ثبت نشده</h4>
      </div>
    </div>
  </div>
</template>
