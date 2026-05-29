<template>
  <form
    @submit.prevent="fetchResults(searchTerm)"
    class="hidden lg:flex items-center max-[1150px]:w-[400px] w-[500px] xl:w-[600px] gap-1.5 px-4 lg:px-4 py-2 bg-neutral-200 rounded-lg relative z-[900]"
  >
    <button>
      <IconsSearch class="w-6 h-6" />
    </button>
    <input
      type="text"
      placeholder="جست‌وجو ..."
      v-model="searchTerm"
      @input="onInput"
      class="grow outline-none"
    />
    <!-- <div
      @click="showSearchBox($event)"
      class="search w-full h-12 rounded-lg bg-primaryLight100/50 hidden lg:flex items-center px-4 lg:px-4 py-1.5"
    >
      <button>
        <IconsSearch class="w-6 h-6" />
      </button>
      <input
        class="header-search-input w-full z-[11] mx-2 mx-lg-4 bg-transparent text-base"
        type="text"
        placeholder="جستجو ..."
        v-model="searchTerm"
        @input="onInput"
        @blur="closeModal"
      />
      <div
        class="header-search-result min-h-[200%] transition-all duration-500 shadow-md z-10 absolute right-0 top-0 left-0 px-4 bg-white rounded-lg"
        :class="{
          'opacity-100 visible': showResult,
          'opacity-0 invisible': !showResult,
        }"
      >
        <div
          class="header-search-result-container border-solid border-t-[1px] border-t-primary700 mt-11"
        >
          <p v-if="loadingItem" class="text-center mt-3">
            {{ `در حال جستجو برای ${searchTerm} ...` }}
          </p>
          <ul v-else>
            <template v-if="loadItem.length">
              <li
                v-for="(item, index) in loadItem"
                :key="item.id ?? index"
                class="results grid grid-cols-1 gap-3 mt-4"
              >
                <router-link
                  @click.native="showResult = false"
                  :to="`/store-details/${item.id}`"
                  class="flex gap-2 hover:text-primary700 group"
                >
                  <searchSvg
                    class="fill-primaryLight100 w-[20px] h-[20px] group-hover:fill-primary700"
                  />
                  <span class="text-base">
                    {{ item?.name ?? "" }}
                  </span>
                </router-link>
              </li>
            </template>
            <p v-else class="text-center mt-3">
              {{ messageSearch }}
            </p>
          </ul>
        </div>
      </div>
    </div> -->
  </form>
</template>
<script setup>
let router = useRouter();
const searchTerm = ref("");

const fetchResults = async (query) => {
  router.push(`/search?q=${query}`);
  searchTerm.value = "";
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
</script>
