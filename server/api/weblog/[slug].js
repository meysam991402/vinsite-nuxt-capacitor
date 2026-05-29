export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const { slug: rawSlug } = event.context.params || "";

  const slug = decodeURIComponent(rawSlug);
  const query = getQuery(event);

  const url = `${base.public.apiBaseUrl}${slug == "" ? "/front/posts" : `/front/post-categories/${slug}`}`;

  const { data } = await $fetch(url, { query });

  return data;
});
