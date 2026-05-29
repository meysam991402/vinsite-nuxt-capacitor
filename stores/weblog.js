import { defineStore } from "pinia";
export const useWeblogStore = defineStore("useWeblog", {
  state: () => {
    return {
      weblog: null,
      loading: false,
      errorNotFound: false,
      filters: {},
    };
  },
  getters: {
    getWeblogData(state) {
      return state.weblog;
    },
    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
  },
  actions: {
    async setWeblog(query = {}, slug = "") {
      this.errorNotFound = false;
      this.loading = true;
      this.filters = {
        page: query?.page ?? 1,
      };
      try {
        const url = slug
          ? `/api/weblog/${encodeURIComponent(slug)}`
          : `/api/weblog`;
        const data = await $fetch(url, {
          query: this.filters,
        });
        this.weblog = data.posts;
      } catch (error) {
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
        console.error("❌ خطا در گرفتن داده از /api/weblog", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
