export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const cookies = parseCookies(event);
  const { id } = event.context.params;
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/withdraws/${id}/cancel`,
    {
      method: "PUT",
      headers: {
        authorization: cookies.auth,
      },
    },
  );
  return data;
});
// export default defineEventHandler(async (event) => {
//   const base = useRuntimeConfig();
//   const cookies = parseCookies(event);
//   const { id } = event.context.params;

//   try {
//     const res = await $fetch(
//       `${base.public.apiBaseUrl}/customer/withdraws/${id}/cancel`,
//       {
//         method: "PUT",
//         headers: {
//           authorization: cookies.auth,
//         },
//       },
//     );

//     return res;
//   } catch (err) {
//     console.error("withdrawCancel failed:", {
//       //   id,
//       //   apiBaseUrl: base.public.apiBaseUrl,
//       //   authExists: !!cookies.auth,
//       //   message: err?.message,
//       //   statusCode: err?.response?.status,
//       //   data: err?.response?._data,
//       id,
//       url,
//       authExists: !!cookies.auth,
//       statusCode: err?.response?.status,
//       // این‌ها را اضافه کن:
//       responseData: err?.response?._data,
//       responseText: err?.response?._data?.message ?? err?.message,
//       headers: err?.response?.headers,
//     });
//     throw err; // مهم: تا 500 مشخص به فرانت برگردد
//   }
// });
