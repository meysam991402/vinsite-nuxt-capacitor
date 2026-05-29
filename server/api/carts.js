export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const { data } = await $fetch(`${base.public.apiBaseUrl}/customer/carts`, {
    headers: {
      authorization: cookies.auth,
    },
  });
  return data;
});
