export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);
    try {
    const response = await $fetch(`${base.public.apiBaseUrl}/customer/orders`, {
      method: "POST",
      headers: {
        authorization: cookies.auth,
      },
      body
    });
    
    return  response;

  } catch (error) {
    const currentStatusCode = error.statusCode || error.status || 500;
    // ۲. تنظیم همون استاتوس کد روی ریسپانس خودمون بدون روشن کردن آژیر (بدون throw)
    setResponseStatus(event, currentStatusCode);
    // ۳. پیدا کردن پیام اصلی تو لایه‌های مختلف آبجکت ارور
    // بعضی وقتا APIها پیام رو تو data.data.message می‌ذارن، بعضی وقتا تو data.message
    const exactMessage = error.data?.data?.message || error.data?.message || error?.message || "خطایی در سیستم رخ داد";
    // ۴. برگرداندن یک آبجکت تروتمیز به فرانت‌اند
    return {
      success: false,
      statusCode: currentStatusCode, // محض اطلاع فرانت‌اند، کد رو هم می‌فرستیم
      message: exactMessage,
      data: error.data
    };
  }
});
