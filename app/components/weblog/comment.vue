<script setup>
const { $toast } = useNuxtApp();
import persianDate from "../../utils/setDatePersian.js";
let base = useRuntimeConfig();
const store = useWeblogDetailStore();
let loading = computed(() => store.getLoading);
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
let props = defineProps(["postId", "comments"]);
let fullName = ref("");
// let mobile = ref(null);
let cmText = ref("");
let email = ref("");
let disabled = ref(false);
async function validateComment() {
  const formData = new FormData();
  formData.append("full_name", fullName.value);
  // formData.append("mobile", mobile.value);
  formData.append("body", cmText.value);
  formData.append("email", email.value);
  formData.append("post_id", props.postId);
  disabled.value = true;
  await $fetch(`${base.public.apiBaseUrl}/front/post-comments`, {
    method: "post",
    body: formData,
  })
    .then((res) => {
      $toast(res.message, {
        type: "success",
        theme: "colored",
        autoClose: 2000,
      }).showToast();
      cmText.value = "";
      email.value = "";
      fullName.value = "";
    })
    .catch((error) => {
      $toast(error.data.message, {
        type: "error",
        theme: "colored",
        autoClose: 2000,
      }).showToast();
    })
    .finally(() => {
      disabled.value = false;
      fullName.value = "";
      cmText.value = "";
      email.value = "";
    });
}
</script>
<template>
  <div class="my-8 p-6 bg-neutral-100 rounded-xl shadow-lg">
    <div class="flex flex-col">
      <div class="flex items-center gap-2 mb-2">
        <IconsCm class="size-5" />
        <h4 class="text-xl font-bold text-neutral-600">دیدگاهی بگذارید</h4>
      </div>
      <span class="text-sm text-gray-600 border-b border-neutral-300 pb-3 mb-4">
        نشانی ایمیل شما منتشر نخواهد شد
      </span>
      <form class="grid grid-cols-12 gap-4" @submit.prevent="validateComment">
        <input
          v-model="fullName"
          type="text"
          class="col-span-12 md:col-span-5 bg-white p-3 text-sm border border-gray-300 rounded-lg"
          placeholder="نام کامل*"
          required
        />
        <!-- <input
          type="text"
          v-model="mobile"
          class="col-span-12 md:col-span-5 bg-white p-3 text-sm border border-gray-300 rounded-lg"
          placeholder="شماره تماس*"
          required
        /> -->
        <input
          type="text"
          v-model="email"
          class="col-span-12 md:col-span-5 bg-white p-3 text-sm border border-gray-300 rounded-lg"
          placeholder="ایمیل خود را وارد کنید*"
          required
        />
        <textarea
          v-model="cmText"
          class="col-span-12 bg-white p-3 text-sm border border-gray-300 rounded-lg resize-none"
          placeholder="دیدگاه شما*"
          rows="6"
          required
        ></textarea>
        <button
          type="button"
          @click="validateComment"
          :disabled="disabled"
          :class="{ 'opacity-50 cursor-not-allowed': disabled }"
          class="col-span-12 w-fit bg-black hover:bg-neutral-700 text-white px-8 py-2 rounded-lg text-base font-semibold transition duration-150 shadow-md"
        >
          ارسال پیام
        </button>
      </form>
    </div>
    <div
      v-if="loading || !ready"
      class="flex flex-col gap-6 mt-8 max-h-[400px] overflow-auto"
    >
      <div
        v-for="item in 3"
        :key="item"
        class="bg-white rounded-xl p-2 lg:p-4 flex flex-col shadow-sm"
      >
        <div
          class="flex items-center gap-3 justify-between border-b pb-3 border-gray-200"
        >
          <div class="flex items-center gap-2">
            <span class="p-2 lg:p-3 rounded-full bg-gray-100">
              <IconsUser class="size-6" />
            </span>
            <ShareSkeleton class="h-4 w-16" />
          </div>
          <ShareSkeleton class="h-4 w-16" />
        </div>
        <ShareSkeleton v-for="item in 3" :key="item" class="h-4 w-full mb-3" />
      </div>
    </div>
    <div
      v-else-if="comments && comments?.length"
      class="flex flex-col gap-6 mt-8 max-h-[400px] overflow-auto"
    >
      <div
        v-for="(cm, index) in comments"
        :key="cm?.id ?? index"
        class="bg-white rounded-xl p-2 lg:p-4 flex flex-col shadow-sm"
      >
        <div
          class="flex items-center gap-3 justify-between border-b pb-3 border-gray-200"
        >
          <div class="flex items-center gap-2">
            <span class="p-2 lg:p-3 rounded-full bg-gray-100">
              <IconsUser class="size-6" />
            </span>
            <span class="font-bold text-gray-800 text-lg"
              >{{ cm?.full_name ?? "کاربر" }}
            </span>
          </div>
          <time
            class="text-xs text-gray-500"
            v-if="cm?.published_at"
            :datetime="cm?.published_at ?? ''"
          >
            {{ persianDate(cm?.published_at ?? "") }}
          </time>
        </div>
        <p class="text-gray-700 text-base pt-4 pr-3">
          {{ cm?.body ?? "" }}
        </p>
        <!-- <div
          v-if="cm?.answer"
          class="flex flex-col bg-gray-100 rounded-lg shadow-md p-4 lg:p-5 mt-3"
        >
          <div
            class="flex items-center gap-3 justify-between mb-3 border-b pb-3 border-gray-200"
          >
            <div class="flex items-center gap-2">
              <span class="p-2 lg:p-3 rounded-full bg-white">
                <IconsUser class="size-6" />
              </span>
              <span class="font-bold text-gray-700 text-lg"
                >{{ cm?.answer?.creator?.first_name ?? "" }}
                {{ cm?.answer?.creator?.last_name ?? "" }}</span
              >
            </div>
            <time
              class="text-xs text-gray-500"
              :datetime="cm?.answer?.created_at ?? ''"
            >
              {{ new Date(cm?.answer?.created_at).toLocaleDateString("fa-IR") }}
            </time>
          </div>
          <p class="text-base pr-3">
            {{ cm?.answer?.body ?? "" }}
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>
