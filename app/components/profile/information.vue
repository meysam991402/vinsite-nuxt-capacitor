<template>
  <div>
    <div class="mb-8">
      <h3 class="text-lg lg:text-xl font-semibold text-center">
        اطلاعات کاربری
      </h3>
      <span
        class="block w-full h-0.5 bg-[image:linear-gradient(90deg,#fff,#606060,#fff)] mt-3"
      >
      </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div
        class="w-full p-3 flex flex-col gap-8 md:border-l md:border-l-solid md:border-l-gray-400"
      >
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> نام و نام خانوادگی: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">
            {{
              profile?.first_name || profile?.last_name
                ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`
                : "اسمی را وارد نکرده اید "
            }}</span
          >
        </p>
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> شماره تماس ضروری: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">{{
            profile?.mobile ?? "-"
          }}</span>
        </p>
      </div>
      <div
        class="w-full p-3 flex flex-col gap-8 md:border-l md:border-l-solid md:border-l-gray-400"
      >
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> ایمیل: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">
            {{ profile?.email ?? " ایمیلی وارد نشده است " }}
          </span>
        </p>
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> تاریخ تولد: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">
            {{
              $date(profile?.birth_date ?? "") ?? "تاریخ تولدی وارد نشده است "
            }}
          </span>
        </p>
      </div>
      <div class="w-full p-3 flex flex-col gap-8">
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> شماره کارت: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">
            {{ profile?.card_number ?? "شماره کارتی وارد نشده است " }}
          </span>
        </p>
        <p class="flex flex-col gap-2">
          <span class="opacity-40"> کدملی: </span>
          <ShareSkeleton v-if="!ready || loading" class="h-5 w-24" />
          <span v-else class="text-sm md:text-base">
            {{ profile?.national_code ?? " کد ملی را وارد نکرده اید " }}
          </span>
        </p>
      </div>
    </div>
    <button
      @click="emit('openEditInformation')"
      class="bg-black flex items-center py-1 px-4 rounded-lg gap-1 mt-4 text-white"
    >
      <span> ویرایش </span>
    </button>
  </div>
</template>
<script setup>
const { $date } = useNuxtApp();
let ready = ref(false);
onMounted(() => {
  ready.value = true;
});
let props = defineProps(["profile", "loading"]);
let emit = defineEmits("openEditInformation");
</script>
