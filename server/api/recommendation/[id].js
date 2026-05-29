export default defineEventHandler(async (event) => {
  const base = useRuntimeConfig();
  const { id } = event.context.params;
  const { data } = await $fetch(
    `${base.public.apiBaseUrl}/front/recommendation-groups/${id}`,
  );
  return data;
});
