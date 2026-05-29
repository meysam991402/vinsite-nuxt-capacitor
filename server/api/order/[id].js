export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const id = event.context.params.id;

  const cookies = parseCookies(event);

  const url = `${base.public.apiBaseUrl}/customer/orders/${id}`;

  const { data } = await $fetch(url, {
    headers: {
      authorization: cookies.auth,
    },
  });

  return data;
});
