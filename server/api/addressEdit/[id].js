export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);
  const id = event.context.params.id;
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/addresses/${id}`,
    {
      method: "PATCH",
      // body: body,

      headers: {
        authorization: cookies.auth,
      },
      body,
    },
  );
  return data;
});
