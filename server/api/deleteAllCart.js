export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/carts/destroy-all`,
    {
      headers: {
        authorization: cookies.auth,
      },
      method: "DELETE",
    },
  );
  return data;
});
