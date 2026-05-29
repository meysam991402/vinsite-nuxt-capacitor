export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const id = event.context.params.id;

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/carts/${id}`,
    {
      headers: {
        authorization: cookies.auth,
      },
      method: "DELETE",
    },
  );
  return data;
});
