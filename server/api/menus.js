export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const cookies = parseCookies(event);

  const { data } = await $fetch(`${base.public.apiBaseUrl}/front/menus`, {
    headers: {
      authorization: cookies.auth,
    },
  });

  return data;
});
