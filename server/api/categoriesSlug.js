export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();

  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/front/categories/all/get-slugs`,
  );

  return data;
});
