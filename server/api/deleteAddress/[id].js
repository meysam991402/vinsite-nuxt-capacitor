export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();

  const id = event.context.params.id;
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/addresses/${id}`,
    {
      method: "DELETE",
      // body: body,

      headers: {
        authorization: cookies.auth,
      },
    },
  );
  return data;
});
