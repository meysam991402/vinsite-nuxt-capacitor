export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const { slug: rawSlug } = event.context.params || "";
  const slug = decodeURIComponent(rawSlug);
  const url = `${base.public.apiBaseUrl}${`/front/posts/${slug}`}`;
  const { data } = await $fetch(url);

  return data;
});
// server/api/front/posts/[slug].get.js

// import { defineEventHandler, getRouterParam, getQuery, parseCookies } from 'h3'; // اینها را Nuxt خودش ارائه می‌دهد
// const { $fetch } = useNuxtApp(); // برای $fetch در سمت سرور

// // برای دسترسی به کش سمت سرور
// const storage = useStorage("db"); // 'db' نام دیتابیس کش شماست، می‌توانید آن را تغییر دهید

// // تابعی برای مقایسه دو آبجکت JSON
// function isEqual(obj1, obj2) {
//   // این یک مقایسه سطحی است. برای مقایسه عمیق‌تر یا خاص‌تر، باید منطق پیچیده‌تری بنویسید.
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

// // تابعی برای دریافت داده از API خارجی
// async function fetchPostFromApi(url, auth) {
//   try {
//     const headers = auth ? { authorization: auth } : {};
//     const response = await $fetch(url, { headers });
//     // فرض می‌کنیم response شامل { data: ... } باشد
//     if (response && response.data) {
//       return response.data;
//     } else {
//       // اگر ساختار response فرق دارد، این قسمت را تنظیم کنید
//       console.error("API response structure is unexpected:", response);
//       throw new Error("Unexpected API response structure");
//     }
//   } catch (error) {
//     console.error("Error fetching post from API:", error);
//     throw error; // خطا را دوباره پرتاب کنید تا در سطح بالاتر مدیریت شود
//   }
// }

// export default defineEventHandler(async (event) => {
//   const base = useRuntimeConfig();
//   const { slug: rawSlug } = event.context.params || "";
//   const slug = decodeURIComponent(rawSlug || ""); // مقدار پیش‌فرض خالی اگر rawSlug نباشد

//   // اگر slug خالی بود، خطا بده یا یک پاسخ مناسب برگردان
//   if (!slug) {
//     // throw createError({ statusCode: 400, statusMessage: 'Slug is required' });
//     return { error: "Slug is required" }; // یا یک آرایه خالی یا هرچیزی که منطقی است
//   }

//   const postUrl = `${base.public.apiBaseUrl}/front/posts/${slug}`;
//   // const cookies = parseCookies(event); // اگر احراز هویت نیاز بود
//   // const authHeader = cookies.auth;

//   // --- Cache Logic ---
//   const cacheKey = `posts:${slug}`; // کلید منحصر به فرد برای هر پست
//   const cachedPost = await storage.getItem(cacheKey);

//   // 1. اگر داده کش شده داریم:
//   if (cachedPost) {
//     // داده کش شده را فوراً برگردان
//     // سپس در پس‌زمینه (background) برای آپدیت fetch کن
//     fetchPostFromApi(postUrl, /* authHeader */ undefined) // اگر احراز هویت لازم است، authHeader را پاس بده
//       .then((freshData) => {
//         // مقایسه داده جدید با داده کش شده
//         if (!isEqual(cachedPost, freshData)) {
//           // اگر تفاوت داشت، کش را آپدیت کن
//           storage.setItem(cacheKey, freshData);
//           //console.log(`Post ${slug} updated in cache.`);
//         } else {
//           //console.log(`Post ${slug} data has not changed.`);
//           // اگر تغییری نبود، می‌توانید timestamp آپدیت را هم اینجا تغییر دهید
//           // storage.setItem(cacheKey, cachedPost); // اگر فقط timestamp مهم است
//         }
//       })
//       .catch((error) => {
//         console.error(`Background refresh failed for post ${slug}:`, error);
//         // در صورت خطا در fetch، کش موجود همچنان معتبر است
//       });

//     // داده کش شده را برگردان (سرعت بالا)
//     return cachedPost;
//   }

//   // 2. اگر داده کش شده نداریم (اولین درخواست برای این slug):
//   try {
//     const freshData = await fetchPostFromApi(
//       postUrl,
//       /* authHeader */ undefined,
//     );
//     // داده جدید را در کش ذخیره کن
//     await storage.setItem(cacheKey, freshData);
//     //console.log(`Post ${slug} fetched and cached.`);
//     return freshData;
//   } catch (error) {
//     console.error(
//       `Failed to fetch and cache post ${slug} on first request:`,
//       error,
//     );
//     // در صورت خطا در اولین درخواست، یک خطا برگردان
//     // throw createError({ statusCode: 500, statusMessage: `Failed to fetch post: ${error.message}` });
//     return { error: `Failed to fetch post: ${error.message}` };
//   }
// });
