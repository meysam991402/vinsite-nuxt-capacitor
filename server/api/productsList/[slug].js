export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const { slug: rawSlug } = event.context.params || "";

  const slug = decodeURIComponent(rawSlug);
  const query = getQuery(event);
  const cookies = parseCookies(event);

  const url = `${base.public.apiBaseUrl}${slug == "" ? "/front/products" : `/front/categories/${slug}`}`;

  const { data } = await $fetch(url, {
    headers: {
      authorization: cookies.auth,
    },
    query,
  });

  return data;
});
