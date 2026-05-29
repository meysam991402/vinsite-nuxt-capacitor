export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const { slug: rawSlug } = event.context.params || "";

  const slug = decodeURIComponent(rawSlug);
  //   const query = getQuery(event);
  const cookies = parseCookies(event);

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/front/products/${slug}`,
    {
      headers: {
        authorization: cookies.auth,
      },
    },
  );

  return data;
});
