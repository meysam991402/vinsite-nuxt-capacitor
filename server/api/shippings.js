export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/shippings`,
    {
      method: "POST",
      // body: body,

      headers: {
        authorization: cookies.auth,
      },
      body,
    },
  );
  return data;
});
