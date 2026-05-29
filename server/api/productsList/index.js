export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const query = getQuery(event);
  const cookies = parseCookies(event);

  const url = `${base.public.apiBaseUrl}/front/products`;

  const { data } = await $fetch(url, {
    headers: {
      authorization: cookies.auth,
    },
    query,
  });

  return data;
});
