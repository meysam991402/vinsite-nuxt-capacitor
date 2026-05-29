<template>
  <div class="w-[95%] rounded-lg sm:w-[500px] bg-white p-4">
    <h3
      class="font-bold text-lg border-b border-b-solid border-gray-300 text-center pb-1 mb-2"
    >
      ثبت دیدگاه
    </h3>
    <form class="flex flex-col gap-4" @submit.prevent="validateForm">
      <div class="w-full">
        <label for="title" class="block mb-1 text-sm">
          <span>عنوان</span>
          <span class="text-red-500 text-lg">*</span>
        </label>
        <div class="flex items-center w-full">
          <input
            type="text"
            id="title"
            v-model="title"
            :class="{ 'border-red-500': ErrorTitle }"
            class="border outline-none w-1/2 rounded-md border-gray-300 ml-4 p-1"
          />
          <input
            type="checkbox"
            id="show_name"
            v-model="showName"
            class="ml-1 accent-black cursor-pointer"
          />
          <label for="show_name" class="text-gray-500 text-sm cursor-pointer"
            >نمایش نام شما</label
          >
        </div>
      </div>
      <div class="flex items-center gap-3">
        <label class="text-sm">امتیاز شما:</label>
        <ShareSelecteStar @score="score" class="-translate-y-0.5" />
      </div>
      <div>
        <label for="title" class="block mb-1 text-sm">
          <span>دیدگاه</span>
          <span class="text-red-500 text-lg">*</span>
        </label>
        <textarea
          v-model="body"
          placeholder="دیدگاه شما"
          :class="{ 'border-red-500': ErrorBody }"
          class="w-full border outline-none border-gray-300 rounded-md p-1.5 h-[100px] resize-none placeholder:text-sm"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-black text-white rounded-md"
        :class="{
          'cursor-not-allowed opacity-50': disabled,
        }"
        :disabled="disabled"
      >
        <ShareLoaderBtn
          message="درحال پردازش ..."
          v-if="disabled"
        ></ShareLoaderBtn>
        <span v-else>ثبت نظر</span>
      </button>
    </form>
  </div>
</template>
<script setup>
import makeArry from "~/utils/errorString.js";
let base = useRuntimeConfig();
let cookie = useCookie("auth");
const store = useProductStore();
const product = computed(() => store.getProduct);
let disabled = ref(false);
let emit = defineEmits("close");
let title = ref("");
let ErrorTitle = ref(false);
let body = ref("");
let ErrorBody = ref(false);
let rate = ref(1);
let showName = ref(false);
function validateForm() {
  if (title.value == "") {
    ErrorTitle.value = true;
    useNuxtApp().$toast.error("کاربر گرامی وارد کردن فیلد عنوان اجباری هست", {
      autoClose: 2000,
      dangerouslyHTMLString: true,
      rtl: true,
    });
    return;
  } else {
    ErrorTitle.value = false;
  }
  if (body.value == "") {
    ErrorBody.value = true;

    useNuxtApp().$toast.error("کاربر گرامی وارد کردن فیلد دیدگاه اجباری هست", {
      autoClose: 2000,
      dangerouslyHTMLString: true,
      rtl: true,
    });
    return;
  } else {
    ErrorBody.value = false;
  }
  sendComment();
}
async function sendComment() {
  disabled.value = true;

  let fd = new FormData();
  fd.append("product_id", product.value?.id);
  fd.append("title", title.value);
  fd.append("body", body.value);
  fd.append("show_name", showName.value == true ? 1 : 0);
  fd.append("rate", rate.value);
  await $fetch(`${base.public.apiBaseUrl}/customer/product-comments`, {
    headers: {
      authorization: cookie.value,
    },
    method: "POST",
    body: fd,
  })
    .then((res) => {
      if (res.success == true) {
        useNuxtApp().$toast.success(res.message, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
        emit("close");
      }
    })
    .catch((error) => {
      disabled.value = false;
      let errors = [];
      if (error?.response?._data) {
        errors = makeArry(error?.response?._data?.message ?? "");
      } else if (error?.response?.data) {
        errors = makeArry(error?.response?.message ?? "");
      }
      errors.forEach((error) => {
        useNuxtApp().$toast.error(error, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
      });
      disabled.value = false;
    })
    .finally(() => {
      disabled.value = false;
    });
}
function score(countStare) {
  rate.value = countStare;
}
</script>
