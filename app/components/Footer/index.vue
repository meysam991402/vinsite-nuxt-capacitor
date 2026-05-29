<template>
  <footer
    class="bg-gray-100/50 pt-8 pb-[70px] lg:pb-4 relative mt-8 lg:mt-10 border-t-8 border-neutral-200"
    :class="{
      'pb-24 sm:pb-4!': route.name == 'product-slug',
    }"
  >
    <section class="grid grid-cols-12 lg:gap-x-7 items-center container">
      <div class="col-span-12 lg:col-span-7 flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <div
            class="grow flex items-start gap-2 text-right"
            v-if="loading || !ready"
          >
            <ShareSkeleton class="h-20 w-20 mb-4" />
          </div>
          <figure v-else-if="footer?.logo_footer" class="grow w-20">
            <nuxt-link to="/" class="w-full">
              <NuxtImg
                decoding="async"
                format="webp"
                loading="lazy"
                class="w-full"
                :src="footer?.logo_footer ?? ''"
                alt="لوگوی سایت"
              />
            </nuxt-link>
          </figure>
          <div class="w-11/12 flex flex-col gap-2" v-if="loading || !ready">
            <ShareSkeleton
              v-for="value in 3"
              class="h-4 w-full mb-2"
              :key="value"
            />
          </div>
          <p
            v-else-if="footer?.description_footer"
            class="w-11/12 text-sm text-neutral-600"
          >
            {{ footer?.description_footer ?? "" }}
          </p>
        </div>
        <address
          class="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 mt-2"
        >
          <div class="flex flex-col gap-3">
            <div class="flex gap-1 items-center text-neutral-700">
              <IconsMapPin class="size-6" />
              <span class="text-sm font-bold text-neutral-500">آدرس:</span>
              <div
                class="flex items-start gap-2 text-right"
                v-if="loading || !ready"
              >
                <ShareSkeleton class="h-4 w-28 mb-4" />
              </div>
              <span v-else-if="informations?.address" class="text-sm">
                {{ informations?.address ?? "" }}
              </span>
            </div>
            <a
              :href="`tel:${informations?.phone_number ?? ''}`"
              class="flex gap-1 items-center text-neutral-700 hover:text-black"
            >
              <IconsPhone class="size-6" />
              <span class="text-sm font-bold text-neutral-500">تلفن:</span>
              <div
                class="flex items-start gap-2 text-right"
                v-if="loading || !ready"
              >
                <ShareSkeleton class="h-4 w-28 mb-4" />
              </div>
              <span v-else-if="informations?.phone_number" class="text-sm">{{
                informations?.phone_number ?? ""
              }}</span>
            </a>
            <a
              :href="`mailto:${informations?.email ?? ''}`"
              class="flex items-center gap-1"
            >
              <IconsEmail class="size-5 *:fill-[#787878]" />
              <span class="text-sm font-bold text-neutral-500"
                >ایمیل پشتیبانی:</span
              >
              <div
                class="flex items-start gap-2 text-right"
                v-if="loading || !ready"
              >
                <ShareSkeleton class="h-4 w-28 mb-4" />
              </div>
              <span
                v-else-if="informations?.email"
                class="text-sm text-neutral-700 group-hover:text-black"
                >{{ informations?.email ?? "" }}</span
              >
            </a>
          </div>
          <div
            v-if="loading || !ready"
            class="flex justify-center md:flex-col gap-10 md:gap-3 items-center"
          >
            <ShareSkeleton v-for="value in 3" class="h-7 w-7" :key="value" />
          </div>
          <div
            v-else-if="social_medias"
            class="flex justify-center md:flex-col gap-10 md:gap-3 items-center"
          >
            <a
              v-if="social_medias?.telegram"
              :href="social_medias?.telegram"
              class="hover:scale-110 transition-all duration-300"
            >
              <IconsTelegram class="size-6" />
            </a>
            <a
              v-if="social_medias?.instagram"
              :href="social_medias?.instagram"
              class="hover:scale-110 transition-all duration-300"
            >
              <IconsInstagram class="size-6" />
            </a>
            <a
              v-if="social_medias?.whatsapp"
              :href="social_medias?.whatsapp"
              class="hover:scale-110 transition-all duration-300"
            >
              <IconsWhatsapp class="size-7" />
            </a>
          </div>
        </address>
      </div>
      <div
        class="col-span-12 lg:col-span-5 mr-0 lg:mr-6 mt-4 lg:mt-0 flex flex-col lg:flex-row gap-3 lg:gap-0 lg:justify-between items-center"
      >
        <nav class="">
          <ul
            v-if="loading || !ready"
            class="flex flex-row flex-wrap lg:flex-col gap-3"
          >
            <ShareSkeleton v-for="value in 4" :key="value" class="h-4 w-16" />
          </ul>
          <ul
            v-else-if="menus && menus.length"
            class="flex flex-row flex-wrap lg:flex-col gap-3"
          >
            <li class="text-base text-nowrap">دسترسی سریع</li>
            <li
              v-for="(item, index) in menus"
              :key="item?.id ?? index"
              class="pb-1 lg:not-[:last-child]:border-b-1 lg:border-b-gray-200 lg:pl-8 group"
            >
              <ShareDynamicLinker
                :item="item?.link"
                class="text-sm text-nowrap text-neutral-600 group-hover:text-neutral-400"
              >
                {{ item?.title ?? "" }}
              </ShareDynamicLinker>
            </li>
          </ul>
        </nav>
        <figure
          class="w-full lg:w-unset px-3 lg:px-0 flex flex-row lg:flex-col gap-2 justify-between lg:items-end"
        >
          <a href="" class="enamad w-20">
            <NuxtImg
              class="w-full"
              src="/images/footer/enamad.09e76a6a.png"
              format="webp"
              decoding="async"
              loading="lazy"
              alt="enamad"
            />
          </a>
          <a href="" class="kasbokar w-20">
            <NuxtImg
              class="w-full"
              src="/images/footer/logo-kasbokar.png"
              alt="kasbokar"
              format="webp"
              decoding="async"
              loading="lazy"
            />
          </a>
        </figure>
      </div>
      <div
        class="col-span-12 flex flex-col lg:flex-row gap-lg-0 gap-2 lg:justify-between items-center border-t-1 border-t-gray-300 pt-4 mt-4"
      >
        <p class="text-sm text-neutral-600 text-center">
          تمام حقوق برای <b>{{ informations?.name_site ?? "" }}</b> محفوظ بوده و
          استفاده از محتوا تنها با ذکر نام و درج لینک مستقیم مجاز است.
        </p>
        <div class="flex items-center gap-1">
          <p class="text-sm text-neutral-600">طراحی شده توسط تیم:</p>
          <a href="https://shetabit.com/" class="text-sm text-neutral-700">
            <strong> شتاب </strong>
          </a>
        </div>
      </div>
    </section>
  </footer>
</template>
<script setup>
const route = useRoute();

const store = useSettingsStore();
const storeMenus = useMenusStore();
const informations = computed(() => store.getMainInformations);
const social_medias = computed(() => store.getScoialMedias);
const footer = computed(() => store.getFooter);
const loading = computed(() => store.getLoading);
const ready = ref(false);
const menus = computed(() => storeMenus.getFooter);
if (!menus.value) {
  useAsyncData(
    async () => {
      await storeMenus.setMenus();
      return { fetched: true };
    },
    { lazy: false },
  );
}

onMounted(() => {
  ready.value = true;
});
</script>
