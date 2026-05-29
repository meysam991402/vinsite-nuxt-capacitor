export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const cookies = parseCookies(event);
  // const { data } = await $fetch(`${base.public.apiBaseUrl}/customer/favorites`);
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/favorites`,
    {
      headers: {
        authorization: cookies.auth,
      },
    },
  );
  return data;
});
