<template>
  <section
    class="w-screen h-screen fixed top-0 right-0 bg-black/40 backdrop-blur-lg z-999 translate-x-[200%] transition-all ease-linear duration-500"
    @click.self="emit('close')"
  >
    <button class="flex absolute left-[2%] top-[2%]" @click="emit('close')">
      <IconsDeleted color="#fff" class="w-8 h-8" />
    </button>
    <div class="mt-20">
      <div class="wrapper">
        <svg class="w-full h-full text-animation">
          <text x="50%" y="50%" dy=".35em" text-anchor="middle">
            SEARCH PRODUCTS
          </text>
        </svg>
      </div>
      <form
        @submit.prevent="fetchResults(searchTerm)"
        class="flex items-center w-[95%] mx-auto mt-8 gap-1.5 pr-2 py-2 bg-transparent border-b border-b-white border-b-solid text-white relative z-[900]"
      >
        <input
          type="text"
          autofocus
          placeholder="جست‌وجو ..."
          v-model="searchTerm"
          @input="onInput"
          ref="searchInput"
          class="grow outline-none"
        />
        <button @click="fetchResults(searchTerm)">
          <IconsSearch class="w-6 h-6" />
        </button>
      </form>
    </div>
  </section>
</template>
<script setup>
const emit = defineEmits("close");
// const route = useRoute();
let router = useRouter();
const searchTerm = ref("");
const searchInput = ref(null);

const fetchResults = async (query) => {
  router.push(`/search?q=${query}`);
  searchTerm.value = "";
  emit("close");
};

function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce((value) => {
  fetchResults(value);
}, 700);

const onInput = () => {
  debouncedSearch(searchTerm.value);
};
onMounted(() => {
  searchInput.value.focus();
});
</script>
<style scoped>
.open {
  translate: 0;
}

.open .content {
  translate: 0;
}
.wrapper {
  height: 100px;
}
.text-animation text {
  animation: stroke 5s infinite alternate;
  stroke-width: 2;
  stroke: #365fa0;
  font-size: 60px;
}
@keyframes stroke {
  0% {
    fill: rgba(72, 138, 204, 0);
    stroke: #fff;
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 2;
  }
  70% {
    fill: rgba(72, 138, 204, 0);
    stroke: #fff;
  }
  80% {
    fill: rgba(72, 138, 204, 0);
    stroke: #fff;
    stroke-width: 3;
  }
  100% {
    fill: #fff;
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

@media screen and (max-width: 500px) {
  .text-animation text {
    font-size: 40px;
  }
}
@media screen and (max-width: 400px) {
  .text-animation text {
    font-size: 30px;
  }
}
</style>
