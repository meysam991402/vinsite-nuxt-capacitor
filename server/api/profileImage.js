export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const base = useRuntimeConfig();
  const body = await readBody(event);

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/customer/information/update-image`,
    {
      headers: {
        authorization: cookies.auth,
      },
      method: "PUT",
      body,
    },
  );
  return data;
});
