<script setup>
const starsBorder = ref(null);
const starsFill = ref(null);
const emit = defineEmits(["score"]);
function rate(index) {
  emit("score", index + 1); /* ارسال مقدار ایندکس برای امتیار دادن */
  /* پاک کردن همه کلاس ها اگر امتیار وارد شده کمتر از قبلی بود*/
  starsFill.value.forEach((item) => {
    item.classList.add("hidden");
  });
  starsBorder.value.forEach((item) => {
    item.classList.remove("hidden");
  });
  /*اضافه کردن مقدار جدید برای هر آبتم*/
  for (let i = 0; i <= index; i++) {
    starsBorder.value[i].classList.add("hidden");
    starsFill.value[i].classList.remove("hidden");
  }
}
onMounted(() => {
  for (let i = 0; i < 4; i++) {
    starsBorder.value[i].classList.add("hidden");
    starsFill.value[i].classList.remove("hidden");
  }
  emit("score", 4);
});
</script>

<template>
  <div class="scores flex gap-2">
    <button
      type="button"
      v-for="(item, index) in 5"
      :key="index"
      @click="rate(index)"
    >
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        ref="starsFill"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffc107"
        class="bi-star-fill b-icon bi text-yellow-300 hidden"
      >
        <g>
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          ></path>
        </g>
      </svg>
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        ref="starsBorder"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffc107"
        class="bi-star-fill b-icon bi text-yellow-300"
      >
        <g>
          <path
            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73
                      3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523
                       3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846
                      3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
          ></path>
        </g>
      </svg>
    </button>
  </div>
</template>

<style scoped>
svg {
  transition: 0.3s;
}
svg:hover {
  cursor: pointer;
  transform: scale(1.5);
}
</style>
