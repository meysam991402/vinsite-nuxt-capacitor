export default defineNuxtRouteMiddleware(async (to, from) => {
  // ۱. استخراج اسلاگ داینامیک
  const namePath = to.params.name; // فرض می‌کنیم پارامتر داینامیک شما نامش `name` است.
  const baseUrl = useRuntimeConfig();

  try {
    // ۲. فراخوانی API برای دریافت لیست اسلاگ‌های مجاز
    const response = await $fetch(
      `${baseUrl.public.apiBaseUrl}/api/front/categories/all/get-slugs`,
    );

    // فرض می‌کنیم response.data لیستی از اسلاگ‌های معتبر است.
    const validSlugs = response.data.slugs;

    // ۳. اعتبارسنجی
    const isValidSlug =
      validSlugs.includes(namePath) || namePath == "product-list";

    if (!isValidSlug) {
      // اگر کاربر به صفحه خطا هدایت می‌شود، فقط در صورتی هدایت کنیم که در حال حاضر در آن صفحه نیست
      if (to.path != "/error404") {
        return navigateTo("/error404");
      }
    }

    // اگر اسلاگ معتبر بود، هیچ کاری نمی‌کنیم و اجازه می‌دهیم پیمایش ادامه یابد.
  } catch (error) {
    console.error("خطا در دریافت لیست اسلاگ‌ها از API:", error);

    // اگر خطایی در API است، فقط در صورتی هدایت کنیم که در حال حاضر در صفحه خطا نیست
    if (to.path !== "/error404") {
      return navigateTo("/error404");
    }
  }
});
