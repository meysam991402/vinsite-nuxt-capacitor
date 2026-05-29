export default function useAddQuery() {
  const route = useRoute();
  const router = useRouter();

  const addQuery = (queryParams) => {
    // Clone safe of current query
    const currentQuery = { ...route.query };

    // حذف مقادیر undefined و null
    const validEntries = Object.entries(queryParams).filter(
      ([, value]) => value !== undefined && value !== null,
    );

    // ساخت آبجکت جدید فقط از فیلدهای معتبر
    const newQuery = { ...currentQuery, ...Object.fromEntries(validEntries) };

    // حذف کلیدهایی که مقدار undefined/empty دارند (مثلاً حذف فیلتر خالی)
    Object.keys(newQuery).forEach((key) => {
      if (newQuery[key] === "" || newQuery[key] == null) delete newQuery[key];
    });

    // جایگزینی URL بدون reload
    router.replace({ path: route.path, query: newQuery });
  };

  return { addQuery };
}
