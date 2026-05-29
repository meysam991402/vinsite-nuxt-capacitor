import { defineStore } from "pinia";
export const useFlashesStore = defineStore("useFlashes", {
  state: () => {
    return {
      products: null,
      loading: false,
      errorNotFound: false,
    };
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
  },
  actions: {
    async setFlashes(query = {}, slug = "") {
      this.loading = true;
      this.errorNotFound = false;
      this.filters = {
        page: query?.page ?? 1,
      };
      try {
        const safeSlug = encodeURIComponent(slug);
        const data = await $fetch(`/api/flashes/${safeSlug}`, {
          query: this.filters,
        });
        this.products = data.products;
      } catch (error) {
        console.error("❌", error);
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
