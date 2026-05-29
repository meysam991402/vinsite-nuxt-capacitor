// export default defineEventHandler(async (event) => {
//   const cookies = parseCookies(event);
//   const base = useRuntimeConfig();
//   const body = await readBody(event);

//   const { data } = await $fetch(`${base.public.apiBaseUrl}/customer/carts`, {
//     method: "post",
//     // body: body,

//     headers: {
//       authorization: cookies.auth,
//     },
//     body,
//   });
//   return data;
// });
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);

  const res = await $fetch(`${base.public.apiBaseUrl}/customer/carts`, {
    method: "post",
    headers: {
      authorization: cookies.auth,
    },
    body,
  });

  return res; // res را مستقیم برگردان
});
