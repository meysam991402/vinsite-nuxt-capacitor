<script setup>
const store = useSettingsStore();
let settings = computed(() => store.getSettingsData);
let loading = computed(() => store.getLoading);
let ready = ref(false);
const breadCrump = ref([{ title: "تماس با ما", link: "" }]);
onMounted(() => {
  ready.value = true;
});
</script>
<template>
  <BreadCrump :list="breadCrump" />
  <section
    class="container mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
  >
    <address class="flex flex-col gap-8 not-italic col-span-1">
      <div
        class="flex justify-between items-start pb-3 border-b border-gray-300"
      >
        <div
          class="flex items-center gap-1 text-base font-medium text-neutral-600 flex-shrink-0 ml-4"
        >
          <IconsMapPin class="size-6" />
          <span> فروشگاه:</span>
        </div>
        <div class="flex items-start gap-2 text-right" v-if="loading || !ready">
          <ShareSkeleton class="h-4 w-28 mb-4" />
        </div>
        <div
          v-else-if="settings?.main_informations?.address"
          class="flex items-start gap-2 text-right"
        >
          <p class="text-base text-gray-800">
            {{ settings?.main_informations?.address ?? "" }}
          </p>
        </div>
      </div>
      <div
        class="flex justify-between items-center pb-3 border-b border-gray-300"
      >
        <div class="flex items-center gap-1">
          <IconsEmail class="size-5 *:fill-[#787878]" />
          <span class="text-base font-medium text-neutral-600"> ایمیل: </span>
        </div>
        <div class="flex items-start gap-2 text-right" v-if="loading || !ready">
          <ShareSkeleton class="h-4 w-28 mb-4" />
        </div>
        <div
          v-else-if="settings?.main_informations?.email"
          class="flex items-center gap-2"
        >
          <a
            href="mailto:mina.saffari@gmail.com"
            class="text-base text-gray-800 hover:text-neutral-700 transition"
          >
            {{ settings?.main_informations?.email ?? "" }}
          </a>
        </div>
      </div>
      <div
        class="flex justify-between items-center pb-3 border-b border-gray-300"
      >
        <div class="flex items-center gap-1">
          <IconsPhone class="size-6" />
          <span class="text-base font-medium text-neutral-600">
            شماره تماس:
          </span>
        </div>
        <div class="flex items-start gap-2 text-right" v-if="loading || !ready">
          <ShareSkeleton class="h-4 w-28 mb-4" />
        </div>
        <div
          v-else-if="settings?.main_informations?.phone_number"
          class="flex items-center gap-2"
        >
          <a
            href="tel:01732455486"
            class="text-base text-gray-800 hover:text-neutral-700 transition"
          >
            {{ settings?.main_informations?.phone_number ?? "" }}
          </a>
        </div>
      </div>
      <div
        class="flex justify-between items-center pb-3 border-b border-gray-300"
      >
        <div class="flex items-center gap-2">
          <IconsTime class="size-5" />
          <span class="text-base font-medium text-neutral-600">
            ساعت پاسخگویی:
          </span>
        </div>
        <div class="flex items-start gap-2 text-right" v-if="loading || !ready">
          <ShareSkeleton class="h-4 w-28 mb-4" />
        </div>
        <div
          v-else-if="settings?.main_informations?.timing"
          class="flex items-center gap-2"
        >
          <span class="text-base text-gray-800">
            {{ settings?.main_informations?.timing ?? "" }}
          </span>
        </div>
      </div>
      <div class="flex justify-around items-center pt-2">
        <template v-if="loading || !ready">
          <ShareSkeleton v-for="value in 3" :key="value" class="h-12 w-12" />
        </template>
        <template v-else-if="settings?.social_medias">
          <a
            v-if="settings?.social_medias?.instagram"
            :href="settings?.social_medias?.instagram"
            class="flex flex-col gap-2 items-center hover:opacity-80 transition duration-150"
          >
            <IconsInstagram class="size-6" />
            <span class="text-sm text-neutral-600">اینستاگرام</span>
          </a>
          <a
            v-if="settings?.social_medias?.telegram"
            :href="settings?.social_medias?.telegram"
            class="flex flex-col items-center gap-2 hover:opacity-80 transition duration-150"
          >
            <IconsTelegram class="size-6" />
            <span class="text-sm text-neutral-600">تلگرام</span>
          </a>
          <a
            v-if="settings?.social_medias?.whatsapp"
            :href="settings?.social_medias?.whatsapp"
            class="flex flex-col items-center gap-2 hover:opacity-80 transition duration-150"
          >
            <IconsWhatsapp class="size-6" />
            <span class="text-sm text-neutral-600">واتساپ</span>
          </a>
        </template>
      </div>
    </address>
    <form
      class="col-span-1 lg:col-span-2 grid grid-cols-12 gap-4 bg-gray-50 p-6 rounded-xl shadow-lg"
    >
      <p class="col-span-12 text-sm text-gray-700 mb-2">
        در صورتی که خارج از ساعات اداری تماس گرفتید، می‌توانید از طریق فرم زیر
        پیام خود را بگذارید. کارشناسان ما پس از بررسی با شما تماس خواهند گرفت.
      </p>
      <label for="name" class="flex flex-col col-span-12 sm:col-span-6">
        <span class="text-sm font-medium text-neutral-600 mb-1"
          >نام و نام خانوادگی:<b class="text-red-600 text-lg">*</b></span
        >
        <input
          type="text"
          id="name"
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500"
          required
        />
      </label>
      <label for="phone" class="flex flex-col col-span-12 sm:col-span-6">
        <span class="text-sm font-medium text-neutral-600 mb-1"
          >شماره تماس:<b class="text-red-600 text-lg">*</b></span
        >
        <input
          type="tel"
          id="phone"
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500"
          required
        />
      </label>
      <label for="title" class="flex flex-col col-span-12 sm:col-span-6">
        <span class="text-sm font-medium text-neutral-600 mb-1"
          >عنوان: <b class="text-red-600 text-lg">*</b></span
        >
        <input
          type="text"
          id="title"
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500"
          required
        />
      </label>
      <label for="email" class="flex flex-col col-span-12 sm:col-span-6">
        <span class="text-sm font-medium text-neutral-600 mb-1"
          >ایمیل:(اختیاری)</span
        >
        <input
          type="email"
          id="email"
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500"
        />
      </label>
      <textarea
        rows="4"
        placeholder="توضیحات*"
        class="col-span-12 p-3 text-sm border resize-none border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500"
      ></textarea>
      <div class="col-span-12 flex justify-start pt-2">
        <button
          type="submit"
          class="text-base font-semibold bg-black hover:bg-neutral-700 text-white py-2 px-6 rounded-lg transition duration-150 shadow-md"
        >
          ثبت و ارسال
        </button>
      </div>
    </form>
    <template v-if="loading || !ready">
      <ShareSkeleton
        class="col-span-1 lg:col-span-3 h-64 rounded-xl shadow-lg border border-gray-200"
      />
    </template>
    <div
      v-else-if="settings?.main_informations?.google_map"
      class="col-span-1 lg:col-span-3"
    >
      <iframe
        class="w-full h-64 rounded-xl shadow-lg border border-gray-200"
        :src="settings?.main_informations?.google_map"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
</template>
