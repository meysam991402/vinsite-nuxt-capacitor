export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);

  const { data } = await $fetch(`${base.public.apiBaseUrl}/customer/deopsits`, {
    method: "POST",

    headers: {
      authorization: cookies.auth,
    },
    body,
  });
  return data;
});
