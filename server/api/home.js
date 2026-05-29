export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const cookies = parseCookies(event);

  const { data } = await $fetch(`${base.public.apiBaseUrl}/front/home`, {
    headers: {
      authorization: cookies.auth,
    },
  });

  return data;
});
// const storage = useStorage("db"); // 'db' نام دیتابیس/فضای کش شما

// // تابعی برای مقایسه دو آبجکت JSON
// function isEqual(obj1, obj2) {
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

// // تابعی برای دریافت داده از API خارجی
// async function fetchHomeFromApi(url, auth) {
//   try {
//     const headers = auth ? { authorization: auth } : {};
//     const response = await $fetch(url, { headers });

//     // مطابق کدت: فرض می‌کنیم response شامل { data: ... } باشد
//     if (response && response.data) {
//       return response.data; // یعنی دقیقا چیزی که می‌خوای
//     }

//     console.error("API response structure is unexpected:", response);
//     throw new Error("Unexpected API response structure");
//   } catch (error) {
//     console.error("Error fetching home from API:", error);
//     throw error;
//   }
// }

// export default defineEventHandler(async (event) => {
//   const base = useRuntimeConfig();
//   const cookies = parseCookies(event);

//   const homeUrl = `${base.public.apiBaseUrl}/front/home`;

//   // اگر auth کوکی داشته باشیم، خروجی home ممکنه فرق کنه.
//   // پس cacheKey رو جدا می‌کنیم تا محتوا قاطی نشه.
//   const auth = cookies.auth;
//   const cacheKey = `home:${auth ? "auth" : "guest"}`;

//   const cachedHome = await storage.getItem(cacheKey);

//   // 1) اگر داده کش شده داریم => سریع برگردون، بعد background refresh
//   if (cachedHome) {
//     fetchHomeFromApi(homeUrl, auth)
//       .then((freshData) => {
//         if (!isEqual(cachedHome, freshData)) {
//           storage.setItem(cacheKey, freshData);
//         }
//       })
//       .catch((error) => {
//         console.error("Background refresh failed for home:", error);
//         // کش موجود معتبر می‌مونه
//       });

//     return cachedHome; // مهم: همون شکل "data" برگردانده میشه (نه response)
//   }

//   // 2) اگر کش نداریم => همان لحظه fetch کن و ذخیره کن
//   try {
//     const freshData = await fetchHomeFromApi(homeUrl, auth);
//     await storage.setItem(cacheKey, freshData);
//     return freshData;
//   } catch (error) {
//     console.error("Failed to fetch and cache home on first request:", error);
//     return { error: `Failed to fetch home: ${error.message}` };
//   }
// });
