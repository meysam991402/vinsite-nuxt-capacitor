// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-easy-lightbox",
  ],
  // ssr:false,
  // sitemap: {
  //   siteUrl: "https://minimalzee.ir",

  //   urls: async () => {
  //     let productsRes, brandsRes, weblogsRes;

  //     try {
  //       [productsRes, brandsRes, weblogsRes] = await Promise.all([
  //         ofetch("https://api.minimalzee.ir/api/products"),
  //         ofetch("https://api.minimalzee.ir/api/brands"),
  //         ofetch("https://api.minimalzee.ir/api/posts"),
  //       ]);
  //     } catch (error) {
  //       console.error(
  //         "❌ خطا در دریافت پاسخ از API هنگام ساخت Sitemap:",
  //         error
  //       );
  //       return [];
  //     }
  //     // 1. استخراج محصولات: مسیر نهایی در productsRes.data.products.data است
  //     const products =
  //       productsRes?.data?.categories &&
  //       Array.isArray(productsRes.data.categories)
  //         ? productsRes.data.categories
  //         : [];

  //     // 2. استخراج برندها: مسیر نهایی در brandsRes.data.brands است (بدون data داخلی)
  //     const brands =
  //       brandsRes?.data?.brands && Array.isArray(brandsRes.data.brands)
  //         ? brandsRes.data.brands
  //         : [];

  //     // 3. استخراج پست‌ها: مسیر نهایی در weblogsRes.data.articlePosts.data است
  //     const weblogs =
  //       weblogsRes?.data?.articlePosts?.data &&
  //       Array.isArray(weblogsRes.data.articlePosts.data)
  //         ? weblogsRes.data.articlePosts.data
  //         : [];

  //     // --- پایان اصلاح ---

  //     return [
  //       // مسیردهی محصولات
  //       ...products.map((item: any) => ({
  //         loc: `/products/${item.slug}`,
  //       })),
  //       // مسیردهی برندها
  //       ...brands.map((item: any) => ({
  //         loc: `/brands/${item.slug}`,
  //       })),
  //       // مسیردهی وبلاگ‌ها
  //       ...weblogs.map((item: any) => ({
  //         loc: `/weblog-detail/${item.slug}`,
  //       })),
  //     ];
  //   },
  // },
  css: [
    "@/assets/css/main.css",
    "@/assets/css/base.css",
    // 'swiper/components/effect-cube/effect-cube.min.css',
    "swiper/css",

    "swiper/css/autoplay",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      // link: [
      //     { rel: 'icon', href: '/minimalLogo.svg' }
      // ],
      title: "وین سایت",
      meta: [{ content: "#A1A1A1", name: "theme-color" }],
      htmlAttrs: {
        dir: "rtl",
        lang: "fa",
      },
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  features: {
    inlineStyles: false,
  },
  fonts: {
    experimental: {
      disableLocalFallbacks: true,
    },

    // colorMode: {
    //   preference: 'system',
    //   fallback: 'dark', // fallback value if not system preference found
    // },
    // experimental:{
    //   payloadExtraction:true
    // },

    families: [
      {
        name: "yekan-medium",
        src: "/fonts/Yekan-Bakh-Medium.597c8017.woff",
        global: true,
        weight: 100,
        preload: true,
        prefetch: true,
        style: "normal",
        display: "swap",
      },
      {
        name: "fa-solid",
        src: "/fonts/fa-solid-900.e8a427e1.woff2",
        global: true,
        weight: 100,

        style: "normal",
        display: "swap",
      },
      {
        name: "yekan-bold",
        src: "/fonts/Yekan-Bakh-Bold.fb96c80e.woff",
        global: true,
        weight: 100,

        style: "normal",
        display: "swap",
      },
      {
        name: "yekan-medium",
        src: "/fonts/Yekan-Bakh-Medium.597c8017.woff",
        global: true,
        weight: 100,

        style: "normal",
        display: "swap",
      },
      {
        name: "number",
        src: "/fonts/number.woff2",
        global: true,
        weight: 100,

        style: "normal",
        display: "swap",
      },
    ],
  },
  image: {
    format: ["webp", "avif"],
    quality: 70,
  },
  nitro: {
    compressPublicAssets: true,
    
  },
  plugins: [
    "~/plugins/toastify.client.ts",
    { src: "~/plugins/persianTimePicker.client.js", mode: "client" },
  ],
  site: {
    url: "https://admin.vinsite.ir",
    name: "فروشگاه وین سایت",
  },
  runtimeConfig: {
    // // secretApiBaseUrl: "https://admin.vinsite.ir/api",
    // secretApiBaseUrl: "https://api-vinsite.dareak.com/api",
    public: {
      // baseUrl: "https://api-vinsite.dareak.com",
      // apiBaseUrl: "https://api-vinsite.dareak.com/api",
      baseUrl: "https://admin.vinsite.ir",
      apiBaseUrl: "https://admin.vinsite.ir/api",
    },
  },
});
