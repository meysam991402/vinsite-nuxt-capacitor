<template>
  <div>
    <h3
      class="pb-2 mb-4 text-center text-2xl border-b border-b-solid border-b-gray-400"
    >
      اطلاعات حساب شخصی
    </h3>
    <form class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="w-full">
        <label for="name" class="text-sm text-gray-500">نام:</label>

        <input
          v-model="firstName"
          id="name"
          type="text"
          class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div class="w-full">
        <label for="birthdate" class="text-sm mb-4 inline-block text-gray-500"
          >تاریخ تولد:</label
        >
        <ClientOnly>
          <date-picker class="w-full" color="black" v-model="selectedDate" />
        </ClientOnly>
      </div>
      <div class="w-full">
        <label for="surname" class="text-sm text-gray-500">نام خانوادگی:</label>
        <input
          v-model="lastName"
          id="surname"
          type="text"
          class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div class="w-full">
        <!-- <ProfileCardInput /> -->
        <label for="card-number" class="text-sm text-gray-500"
          >شماره کارت:</label
        >
        <ProfileBankNumberInput
          class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
          v-model="card_number"
          :parts="4"
          :lengthPerPart="4"
        />
      </div>
      <div class="w-full">
        <label for="national_code" class="text-sm text-gray-500">کدملی:</label>
        <input
          v-model="national_code"
          id="national_code"
          type="text"
          class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div class="w-full">
        <label for="email" class="text-sm text-gray-500">ایمیل:</label>
        <input
          v-model="email"
          id="email"
          type="email"
          class="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div class="w-full">
        <div
          class="w-full flex items-center justify-between gap-4 flex-wrap pb-3 mb-3 border-b border-b-solid border-b-gray-300"
        >
          <div class="flex items-center gap-2">
            <label class="">جنسیت:</label>
            <template
              v-for="(item, index) in itemsGender"
              :key="item?.id ?? index"
            >
              <label :for="`gender_${index}`" class="text-sm ml-2">
                {{ item?.name == "male" ? "مرد" : "زن" }}
              </label>

              <input
                type="radio"
                name="gender"
                :value="item?.name"
                class="accent-black"
                :id="`gender_${index}`"
                :checked="gender === item?.name"
                @change="gender = item?.name"
              />
            </template>
          </div>
        </div>
        <!-- <div class="flex items-center gap-2 mb-3">
          <Toggle id="Newsletter" v-model="Newsletter" />
          <label for="Newsletter" class="text-sm opacity-70"
            >عضویت در خبرنامه</label
          >
        </div>
        <div class="flex items-center gap-2">
          <ShareToggle id="national_code" v-model="national_code" />
          <label for="national_code" class="text-sm opacity-70"
            >تابعیت خارجی</label
          >
        </div> -->
      </div>
    </form>
    <div class="flex items-center gap-4 mt-4">
      <button
        @click="editUserInformation"
        :class="{
          'cursor-not-allowed opacity-50': disabled,
        }"
        :disabled="disabled"
        class="bg-black flex items-center pt-3 pb-2 text-sm px-4 rounded-lg gap-1 text-white"
      >
        <ShareLoaderBtn
          message="درحال پردازش ..."
          v-if="disabled"
        ></ShareLoaderBtn>
        <span v-else> ثبت اطلاعات کاربری</span>
      </button>
      <button
        @click="emit('openEditInformation')"
        class="border bg-gray-100_color flex items-center pt-3 pb-2 text-sm hover:bg-gray-300 transition-all duration-[.3s] px-6 rounded-lg gap-1"
      >
        انصراف
      </button>
    </div>
  </div>
</template>
<script setup>
const store = useUserStore();
let base = useRuntimeConfig();
let props = defineProps(["profile"]);
const emit = defineEmits(["openEditInformation"]);
let cookies = useCookie("auth");
const selectedDate = ref(props?.profile?.birth_date ?? null);

const national_code = ref(props?.profile?.national_code ?? "");
const email = ref(props?.profile?.email ?? "");
const gender = ref(props?.profile?.gender ?? "male");
const card_number = ref(props?.profile?.card_number ?? "");
const lastName = ref(props?.profile?.last_name ?? "");
const firstName = ref(props?.profile?.first_name ?? "");
let disabled = ref(false);
let srcImage = ref("");
const itemsGender = ref([
  { name: "female", id: 1 },
  { name: "male", id: 2 },
]);

async function editUserInformation() {
  disabled.value = true;
  const formData = new FormData();
  formData.append("mobile", props?.profile?.mobile ?? "");
  formData.append("email", email.value ?? "");
  formData.append("national_code", national_code.value ?? "");
  formData.append("card_number", card_number.value ?? "");
  formData.append("first_name", firstName.value ?? "");
  formData.append("last_name", lastName.value ?? "");
  formData.append("birth_date", selectedDate.value ?? "");
  formData.append("gender", gender.value ?? "");
  formData.append("_method", "PATCH");
  formData.append("image", srcImage.value ?? "");
  await $fetch(`${base.public.apiBaseUrl}/customer/information`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: cookies.value,
    },
  })
    .then((res) => {
      useNuxtApp().$toast(res.message, {
        type: "success",
        theme: "colored",
        autoClose: 2000,
      });
      emit("openEditInformation");
      store.requestProfile();
    })
    .catch((error) => {
      useNuxtApp().$toast(error.data.message, {
        type: "error",
        theme: "colored",
        autoClose: 2000,
      });
    })
    .finally(() => {
      disabled.value = false;
    });
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
