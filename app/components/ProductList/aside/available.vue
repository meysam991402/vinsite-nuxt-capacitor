<template>
  <div
    class="bg-neutral-100/50 rounded-xl p-4 flex justify-between items-center"
  >
    <span> نمایش کالاهای موجود </span>
    <button
      @click="showAvailable"
      :class="{
        'before:left-[calc(100%-22px)] before:bg-neutral-800 bg-white':
          isAvailable,
      }"
      class="before:left-1 transition-all duration-500 before:transition-all bg-neutral-200 before:duration-500 w-[50px] h-5.5 relative inline-block border rounded-full before:absolute before:size-4.5 before:rounded-full before:bg-neutral-400 before:top-1/2 before:-translate-y-1/2 border-solid border-neutral-400"
    ></button>
  </div>
</template>
<script setup>
let route = useRoute();
let router = useRouter();
let isAvailable = ref(false);
//وقتی روی نمایش موجودی کلیک میشه
function showAvailable() {
  isAvailable.value = !isAvailable.value;
  if (isAvailable.value) {
    router.push({
      name: route.name,
      params: route.params,
      query: {
        ...route.query,
        only_availables: 1,
      },
    });
  } else {
    router.push({
      name: route.name,
      params: route.params,
      query: {
        ...route.query,
        only_availables: 0,
      },
    });
  }
}
//چک کنه اگه query
// نمایش موجودی ها برابر یک هست بیاد دکمه را فعال کنه
onMounted(() => {
  if (route.query.only_availables == 1) {
    isAvailable.value = true;
  } else {
    isAvailable.value = false;
  }
});
</script>
