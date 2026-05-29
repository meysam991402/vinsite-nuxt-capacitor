<script setup>
const error = useError();
onMounted(() => {
  const parent = document.querySelector("div.parent");
  const arr = [];
  for (let i in error.value?.statusCode.toString()) {
    arr.push(error.value?.statusCode.toString()[i]);
  }
  for (let i = 0; i < 120; i++) {
    let span = document.createElement("span");
    if (Math.random() * 10 < 3.5) {
      span.textContent = arr[0];
    } else if (3.5 < Math.random() * 10 < 7) {
      span.textContent = arr[1];
    } else {
      span.textContent = arr[2];
    }
    parent.appendChild(span);
    span.style.position = "absolute";
    span.style.transform = `translate( ${Math.random() * 100}% , ${
      Math.random() * 100
    }% )`;
    span.style.top = `${Math.random() * 100}% `;
    span.style.right = ` ${Math.random() * 100}% `;
    span.style.color = `#${Math.floor(Math.random() * 153759).toString(16)}`;
  }
});
</script>
<template>
  <div
    class="parent transition duration-500 ease-in relative flex items-center justify-center"
  >
    <div
      class="py-10 rounded h-fit w-2/3 lg:w-2/4 xl:w-1/3 backdrop flex flex-col text-center"
    >
      <h1 class="text-3xl md:text-8xl">{{ error?.statusCode }}</h1>
      <p class="text-lg md:text-2xl" v-if="error?.statusCode == '404'">
        صفحه مورد نظر پیدا نشد
      </p>
      <p class="text-lg md:text-3xl" v-else>
        {{ error?.message.split(":")[0] }}
      </p>
      <button
        class="mt-5 border w-1/2 mx-auto py-2 px-3 rounded text-sm md:text-normal"
        @click="clearError({ redirect: '/' })"
      >
        بازگشت به صفحه اصلی
      </button>
    </div>
  </div>
</template>
<style scoped>
.parent {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden !important;
}
.parent > div {
  backdrop-filter: blur(5px) !important;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
</style>
