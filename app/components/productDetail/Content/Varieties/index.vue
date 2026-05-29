<template>
  <div class="flex flex-col gap-4" v-if="attributes">
    <template
      v-for="(attribute, key, index) in attributes"
      :key="item?.id ?? index"
    >
      <div v-if="attribute && attribute.length">
        <h4 class="font-bold text-gray-600 text-base lg:text-lg mb-3">
          {{ attribute[0]?.label ?? "" }}
        </h4>
        <div class="flex flex-wrap gap-3">
          <template v-if="attribute && attribute.length">
            <template v-if="attribute[0].style == 'box'">
              <button
                class="border grid place-items-center text-nowrap py-1 px-2 relative rounded-md overflow-hidden text-sm"
                :disabled="
                  !item?.isAvailable ||
                  checkAllStoreBalances(item.variety_ids) == false
                "
                :class="{
                  'cursor-not-allowed! bg-gray-400  opacity-50 before:absolute before:w-full before:h-0.5 before:border-t-[2px]  before:border-dashed before:border-t-white  after:border-t-[2px] after:border-dashed after:border-white before:rotate-45 before:top-1/2 before:left-1/2 before:-translate-1/2 after:absolute after:w-full after:h-0.5  after:-rotate-45 after:top-1/2 after:left-1/2 after:-translate-1/2  ':
                    !item?.isAvailable ||
                    checkAllStoreBalances(item.variety_ids) == false,
                  'bg-green-500 text-white':
                    selectVarietyUser?.baseSelecte?.pivot?.variety_id ==
                      item?.pivot?.variety_id ||
                    (selectVarietyUser &&
                      selectVarietyUser[item.name]?.pivot?.variety_id ==
                        item?.pivot?.variety_id &&
                      item?.isAvailable),
                }"
                @click="selectedAttribute(item)"
                v-for="(item, index) in attribute"
                :key="item?.id ?? index"
              >
                <span>{{ item?.pivot?.value ?? "-" }}</span>
              </button>
            </template>

            <select
              v-model="varietySelectBox"
              v-else-if="attribute[0].style == 'select'"
              class="min-w-[150px] outline-none border p-1 border-gray-400 rounded-lg cursor-pointer"
            >
              <option disabled :value="{ pivot: { value: 'انتخاب' } }" selected>
                انتخاب کنید
              </option>
              <option
                :value="item"
                v-for="(item, index) in attribute"
                :key="item?.id ?? index"
                class="cursor-pointer hover:bg-amber-600"
                :class="{
                  'bg-red-100': !item?.isAvailable,
                }"
                :disabled="
                  !item?.isAvailable ||
                  checkAllStoreBalances(item.variety_ids) == false
                "
              >
                {{ item?.pivot?.value ?? "-" }}
              </option>
            </select>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
let store = useProductStore();
let product = computed(() => store.getProduct);
let attributes = computed(() => store.productAttributes);
let countVarieties = computed(() => store.getCountVarieties);
let selectVarietyUser = ref({});
let varietySelectBox = ref({ pivot: { value: "انتخاب" } });

watch(
  () => varietySelectBox.value,
  (newValue) => {
    selectedAttribute(newValue);
  },
);
function checkAllStoreBalances(list) {
  let status = list.some((item) => item.varietyQuantity > 0);

  return status;
}
function selectedAttribute(attribute) {
  if (attribute.images.length) {
    store.setMainImage(attribute.images[0]);
  }

  selectVarietyUser.value[attribute.name] = attribute;
  const attributesKeysUser = Object.keys(selectVarietyUser.value);

  if (attributesKeysUser.length == countVarieties.value - 1) {
    store.disabledVarieties(selectVarietyUser.value);
  }

  if (countVarieties.value === 1) {
    // انتخاب تک‌تایی
    store.setSelectedVariety(attribute.variety_item);
  } else if (countVarieties.value > 1) {
    // وقتی تعداد انتخاب‌ها کامل شد
    if (attributesKeysUser.length === countVarieties.value) {
      store.disabledVarieties({
        [attribute.name]: selectVarietyUser.value[attribute.name],
      });

      let sharedId = [];
      selectVarietyUser.value[attributesKeysUser[0]].variety_ids.forEach(
        (baseVariety) => {
          for (const key in selectVarietyUser.value) {
            if (
              key !== attributesKeysUser[0] &&
              selectVarietyUser.value[key].isAvailable
            ) {
              selectVarietyUser.value[key].variety_ids.forEach((item) => {
                if (baseVariety.variety_id == item.variety_id) {
                  sharedId.push(item.variety_id);
                  return false;
                }
              });
            }
          }
        },
      );
      let maxItem = null;
      let maxIndex = 0;
      sharedId.forEach((id) => {
        let arry = sharedId.filter((item) => item == id);
        if (arry.length > maxIndex) {
          maxItem = id;
          maxIndex = arry.length;
        }
      });

      let findVariety = product.value.varieties.find(
        (item) => item.id == maxItem,
      );
      if (findVariety && findVariety.store.balance == 0) {
        for (const key in selectVarietyUser.value) {
          if (selectVarietyUser.value[key].isAvailable == false) {
            delete selectVarietyUser.value[key];
          }
          findVariety = null;
        }
      }
      store.setSelectedVariety(findVariety);
    }
  }
}
</script>
