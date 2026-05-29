export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const query = getQuery(event);
  const base = useRuntimeConfig();
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/wallet-transactions`,
    {
      headers: {
        authorization: cookies.auth,
      },
      query,
    },
  );
  return data;
});
