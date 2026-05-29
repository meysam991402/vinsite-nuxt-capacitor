<template>
  <div
    class="w-[90%] sm:w-[600px] max-h-[90vh] overflow-auto rounded-xl bg-white flex flex-col gap-4 px-6 py-5 shadow-lg"
  >
    <div
      class="flex justify-between items-center pb-3 border-b border-gray-300"
    >
      <span class="text-lg font-bold text-gray-700">افزودن آدرس پستی</span>
      <button type="button" @click="emit('close')" class="text-gray-500">
        <IconsDeleted class="size-5" />
      </button>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
    >
      <div class="flex flex-col gap-1">
        <label for="province" class="text-sm font-medium text-gray-600">
          استان <span class="text-red-500">*</span>
        </label>
        <client-only>
          <Multiselect
            id="province"
            max-height="350"
            open-direction="bottom"
            v-model="form.province"
            @select="changeProvince"
            select-label=""
            track-by="name"
            label="name"
            placeholder="انتخاب استان "
            :options="provinces"
            :searchable="true"
            :allow-empty="false"
            selectedLabel=" "
            deselect-label=""
          >
            <template #noOptions> استانی برای انتخاب وجود ندارد </template>
            <template #noResults> هیچ نتیجه‌ای یافت نشد. </template>
          </Multiselect>
        </client-only>
        <!-- <label for="province" class="text-sm font-medium text-gray-600">
          استان <span class="text-red-500">*</span>
        </label>

        <select
          id="province"
          v-model="form.province"
          class="p-2 rounded-md  border border-gray-200 focus:border-green-500 focus:outline-none"
          required
          @change="changeProvince"
        >
          <option :value="{ name: 'انتخاب استان' }">انتخاب کنید</option>
          <option
            :selected="
              mode == 'edit' && form.province.id == item.id ? true : false
            "
            v-for="(item, index) in provinces"
            :key="item?.id ?? index"
            :value="item"
          >
            {{ item?.name ?? "" }}
          </option>
        </select> -->
      </div>

      <!-- شهر -->
      <div class="flex flex-col gap-1">
        <label for="city" class="text-sm font-medium text-gray-600">
          شهر <span class="text-red-500">*</span>
        </label>
        <client-only>
          <Multiselect
            id="province"
            :disabled="form.province == null"
            max-height="350"
            open-direction="bottom"
            v-model="form.city"
            select-label=""
            track-by="name"
            label="name"
            placeholder="انتخاب شهر "
            :options="cities"
            :searchable="true"
            :allow-empty="false"
            selectedLabel=" "
            deselect-label=""
          >
            <template #noOptions> شهری برای انتخاب وجود ندارد </template>
            <template #noResults> هیچ نتیجه‌ای یافت نشد. </template>
          </Multiselect>
        </client-only>

        <!-- <label for="city" class="text-sm font-medium text-gray-600">
          شهر <span class="text-red-500">*</span>
        </label>
        <select
          :disabled="cities.length == 0"
          :class="{ 'opacity-50 cursor-not-allowed': cities.length == 0 }"
          id="city"
          v-model="form.city"
          class="p-2 rounded-md  border border-gray-200 focus:border-green-500 focus:outline-none"
          required
        >
          <option :value="{ name: 'انتخاب شهر' }">انتخاب کنید</option>
          <option
            v-for="(item, index) in cities"
            :key="item?.id ?? index"
            :value="item"
          >
            {{ item?.name ?? "" }}
          </option>
        </select> -->
      </div>

      <div class="flex flex-col gap-1 sm:col-span-2">
        <label for="address" class="text-sm font-medium text-gray-600">
          آدرس کامل <span class="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          v-model="form.address"
          rows="3"
          minlength="10"
          required
          class="p-2 rounded-md border border-gray-200 focus:border-green-500 focus:outline-none resize-none"
        ></textarea>
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2 sm:col-start-1">
        <label for="postal" class="text-sm font-medium text-gray-600">
          کد پستی <span class="text-red-500">*</span>
        </label>
        <input
          id="postal"
          v-model="form.postal_code"
          required
          type="text"
          maxlength="10"
          class="p-2 rounded-md border border-gray-200 focus:border-green-500 focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="name" class="text-sm font-medium text-gray-600">
          نام گیرنده <span class="text-red-500">*</span>
        </label>
        <input
          id="name"
          v-model="form.first_name"
          required
          type="text"
          class="p-2 rounded-md border border-gray-200 focus:border-green-500 focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="lastname" class="text-sm font-medium text-gray-600">
          نام‌ خانوادگی گیرنده <span class="text-red-500">*</span>
        </label>
        <input
          id="lastname"
          v-model="form.last_name"
          required
          type="text"
          class="p-2 rounded-md border border-gray-200 focus:border-green-500 focus:outline-none"
        />
      </div>
      <div class="flex flex-col gap-1 sm:col-span-2">
        <label for="phone" class="text-sm font-medium text-gray-600">
          شماره موبایل <span class="text-red-500">*</span>
        </label>
        <input
          id="phone"
          v-model="form.mobile"
          required
          maxlength="11"
          placeholder="09123456789"
          class="p-2 rounded-md border border-gray-200 focus:border-green-500 focus:outline-none"
        />
      </div>
    </form>

    <!-- Button -->
    <button
      type="submit"
      @click="handleSubmit"
      :class="{
        'cursor-not-allowed opacity-50': loadingAddress,
      }"
      class="mt-3 w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300"
    >
      <ShareLoaderBtn
        message="درحال پردازش ..."
        v-if="loadingAddress"
      ></ShareLoaderBtn>
      <span v-else-if="mode == 'edit'">ویرایش آدرس</span>
      <span v-else>ثبت آدرس</span>
    </button>
  </div>
</template>

<script setup>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
const storeAddress = useCartStore();

let modalAddAddress = computed(() => storeAddress.getModalAddAddress);
let loadingAddress = computed(() => storeAddress.getLoadingAddress);
let provinces = computed(() => storeAddress.getProvinces);

let props = defineProps({
  mode: {
    type: String,
    default: "create",
  },
  type: {
    type: String,
    default: "",
  },
  addressCart: [Object, Boolean],
});
let cities = ref([]);
// let loadingAddress = ref(false);

const emit = defineEmits("close");
const form = ref({
  province: props.mode == "edit" ? props.addressCart.city.province : null,
  city: props.mode == "edit" ? props.addressCart.city : null,
  address: props.mode == "edit" ? props.addressCart.address : "",
  postal_code: props.mode == "edit" ? props.addressCart.postal_code : "",
  first_name: props.mode == "edit" ? props.addressCart.first_name : "",
  last_name: props.mode == "edit" ? props.addressCart.last_name : "",
  mobile: props.mode == "edit" ? props.addressCart.mobile : "",
});
let messageError = ref({
  province: "کاربر گرامی لطفا استان خود را انتخاب کنید",
  city: "کاربر گرامی لطفا شهر خود را انتخاب کنید",
  address: "کاربر گرامی لطفا آدرس خود را مشخص کنید",
  postal_code: "کاربر گرامی لطفا کد پستی خود را وارد کنید کنید",
  first_name: "کاربر گرامی لطفا نام خود را وارد کنید",
  last_name: "کاربر گرامی لطفا نام خانوادگی خود را وارد کنید",
  mobile: "کاربر گرامی لطفا شماره موبایل خود را وارد کنید",
});
function changeProvince() {
  cities.value = form.value.province.cities;
  form.value.city = cities.value[0];
}
const handleSubmit = async () => {
  for (const key in form.value) {
    if (form.value[key] == null || form.value[key] == "") {
      useNuxtApp().$toast.error(messageError.value[key], {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      });
      return;
    }
  }

  if (props.mode == "create") {
    await storeAddress.addOrUpdateAddress(form.value, props.mode, props.type);
  } else {
    form.value.id = props.addressCart.id;
    await storeAddress.addOrUpdateAddress(form.value, props.mode, props.type);
  }
  if (modalAddAddress.value) {
    emit("close");
  }
};

onMounted(() => {
  if (props.mode == "edit") {
    let newCities = provinces.value.find(
      (item) => item.id == props.addressCart.city.province.id,
    );

    cities.value = [...newCities?.cities];
  }
});
</script>
