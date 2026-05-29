export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const query = getQuery(event);
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/withdraws`,
    {
      headers: {
        authorization: cookies.auth,
      },
      query,
    },
  );
  return data;
});
