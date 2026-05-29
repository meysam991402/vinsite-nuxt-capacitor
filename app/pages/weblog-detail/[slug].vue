<script setup>
import { SwiperSlide } from "swiper/vue";
import persianDate from "../../utils/setDatePersian.js";
const store = useWeblogDetailStore();
const post = computed(() => store.getWeblogDetailData);
const loading = computed(() => store.getLoading);
const ErrorNotFound = computed(() => store.getErrorNotFound);
const baseUrl = useRuntimeConfig();
const related_posts = computed(() => store.getRelatedPosts);
const route = useRoute();
const slug = route.params.slug ?? "";
const url = computed(() => `${baseUrl.public.baseUrl}${route.fullPath}`);
const ready = ref(false);
useAsyncData(
  () => `weblog-detail-${new Date()}`,
  async () => {
    await store.setWeblogDetail(slug);
    return { fetched: true };
  },
  { lazy: false },
);
watch(
  () => route.params.slug,
  async (newSlug, oldSlug) => {
    if (newSlug && newSlug !== oldSlug) {
      await store.setWeblogDetail(newSlug);
    }
  },
);
onMounted(() => {
  ready.value = true;
});
const dataTitleBox = ref({
  title: "مطالب مشابه",
  link: "/weblog-list",
  title_link: "مشاهده همه مطالب",
});
const breakpoints = ref({
  300: {
    slidesPerView: 1.8,
    spaceBetween: 10,
  },

  480: {
    slidesPerView: 2.2,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2.8,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 3.2,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 2.5,
    spaceBetween: 15,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
});
</script>
<template>

  <Head>
    <Title>
      {{ store.getWeblogDetailData?.meta_title ?? "" }}
    </Title>
    <Meta name="description" :content="store.getWeblogDetailData?.meta_description ?? ''" />
    <Meta name="robots" :content="store.getWeblogDetailData?.meta_robots == 0
      ? 'index, follow'
      : 'noindex, nofollow'
      " />
    <Meta property="og:title" :content="store.getWeblogDetailData?.meta_title ?? ''" />
    <Meta property="og:description" :content="store.getWeblogDetailData?.meta_description ?? ''" />
    <Meta property="og:image" :content="store.getWeblogDetailData?.image?.url ?? ''" />
    <Meta property="og:url" :content="url ?? ''" />
    <Meta property="og:type" content="article" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="store.getWeblogDetailData?.meta_title ?? ''" />
    <Meta name="twitter:description" :content="store.getWeblogDetailData?.meta_description ?? ''" />
    <Meta name="twitter:image" :content="store.getWeblogDetailData?.image?.url ?? ''" />
    <Link rel="canonical" :href="store.getWeblogDetailData?.canonical_tag ?? ''" />
  </Head>
  <section>
    <ShareNotFoundPage v-if="ErrorNotFound" />
    <template v-else>
      <BreadCrump :list="[
        { title: 'مقالات', link: '/weblog-list' },
        { title: post?.title ?? 'مقاله', link: '' },
      ]" />

      <section class="container mt-8 lg:mt-10 grid grid-cols-12 gap-4 md:gap-6 items-start">
        <section class="col-span-12 lg:col-span-8 xl:col-span-9">
          <ShareSkeleton v-if="loading || !ready" class="h-4 w-full mb-4" />
          <h4 v-else-if="post?.title" class="text-base md:text-lg font-bold text-neutral-600">
            {{ post?.title ?? "" }}
          </h4>
          <template v-if="loading || !ready">
            <ShareSkeleton class="h-[250px] sm:h-[300px] md:h-[350px] xl:h-[400px] w-full mb-3" />
            <ShareSkeleton v-for="value in 25" :key="value" class="h-4 w-full mb-3" />
          </template>
          <template v-else-if="post">
            <div
              class="mt-5 flex justify-around items-center py-3 border-b border-b-gray-200 border-t border-t-gray-200">
              <div class="flex items-center gap-1">
                <IconsClock class="size-4 min-[350px]:size-6" />
                <span class="text-xs min-[350px]-text-sm md:text-base text-gray-500">
                  تاریخ انتشار :
                </span>
                <time class="text-xs min-[350px]-text-sm md:text-base text-gray-500"
                  :datetime="post?.published_at ?? ''">
                  {{ persianDate(post?.published_at ?? "") }}
                </time>
              </div>
              <div class="flex items-center gap-1">
                <IconsEye class="size-4 min-[350px]:size-6" />
                <span class="text-xs min-[350px]-text-sm md:text-base text-gray-500">
                  بازدید:
                </span>
                <span class="text-xs min-[350px]-text-sm md:text-base text-gray-500"> 10 </span>
              </div>
              <div class="flex items-center gap-1">
                <IconsCm class="size-3 min-[350px]:size-5" />
                <span class="text-xs min-[350px]-text-sm md:text-base text-gray-500">
                  دیدگاه:
                </span>
                <span class="text-xs min-[350px]-text-sm md:text-base text-gray-500"> {{
                  post?.comments?.length?.toLocaleString() }} </span>
              </div>
            </div>
            <figure class="w-full flex" v-if="post?.image?.url">
              <NuxtImg class="w-full" format="webp" loading="lazy" :src="post?.image?.url ?? ''"
                :alt="post?.title ?? ''" />
            </figure>
            <div class="mt-6 ck-editor" v-html="post?.body ?? ''"></div>
            <div class="flex justify-between items-center mt-6 pt-3 border-t border-t-gray-200">
              <span class="text-base text-neutral-600">
                اشتراک گذاری مطلب :
              </span>
              <div class="flex gap-3 items-center">
                <a :href="`https://t.me/share/url?url=${url}?v=1`" target="_blank" rel="noopener noreferrer">
                  <IconsTelegram class="size-5.5" />
                </a>
                <a :href="`https://wa.me/?text=${post?.title ?? ''} - ${url}`" target="_blank"
                  rel="noopener noreferrer">
                  <IconsWhatsapp class="size-6" />
                </a>
                <a :href="`instagram://share?text=${post?.title ?? ''} - ${url}`" target="_blank"
                  rel="noopener noreferrer">
                  <IconsInstagram class="size-5.5" />
                </a>
              </div>
            </div>
          </template>
          <div class="mt-10 lg:mt-12">
            <ShareTitleBox v-if="loading || !ready" :data="dataTitleBox" />
            <div v-if="loading || !ready" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              <ShareSkeleton v-for="index in 2" :key="index" class="h-[200px] sm:h-[220px] sm:hidden w-full" />
              <ShareSkeleton v-for="index in 3" :key="index"
                class="h-[220px] lg:h-[240px] hidden sm:inline-block w-full" />
            </div>
            <template v-else-if="related_posts && related_posts?.length">
              <ShareTitleBox :data="dataTitleBox" />
              <Slider :breakpoints="breakpoints" :pagination="true" class="w-full pb-4!">
                <SwiperSlide class="" v-for="(post, index) in related_posts" :key="post?.id ?? index">
                  <WeblogCard :post="post" />
                </SwiperSlide>
              </Slider>
            </template>
          </div>
          <WeblogComment :postId="post?.id ?? ''" :comments="post?.comments" />
        </section>
        <WeblogAside />
      </section>
    </template>
  </section>
</template>
