export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const query = getQuery(event);
  const url = `${base.public.apiBaseUrl}/front/posts`;
  const { data } = await $fetch(url, { query });

  return data;
});
