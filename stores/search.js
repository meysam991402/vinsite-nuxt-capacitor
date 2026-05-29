import { defineStore } from "pinia";
export const useSearchStore = defineStore("useSearch", {
  state: () => {
    return {
      search: null,
      loading: false,
    };
  },
  getters: {
    getSearchItems(state) {
      return state.search;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setSearch(query) {
      console.log(query, "queryqueryquery");
      let newQuery = { q: query };
      this.loading = true;
      this.search = null;
      try {
        const data = await $fetch("/api/search", { query: newQuery });
        this.search = data;
        console.log(this.search, "this.search");

        // this.social_medias = data.settings.social_medias;
        // this.main_informations = data.settings.main_informations;
        // this.footer = data.settings.footer;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/search", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
