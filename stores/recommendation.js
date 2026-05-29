import { defineStore } from "pinia";
export const useRecommendationStore = defineStore("useRecommendation", {
  state: () => {
    return {
      recommendation: null,
      loading: false,
      errorNotFound: false,
      filters: {},
    };
  },
  getters: {
    getRecommendationData(state) {
      return state.recommendation;
    },
    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
  },
  actions: {
    async setRecommendation(query = {}, id) {
      this.loading = true;
      this.errorNotFound = false;
      this.filters = {
        page: query?.page ?? 1,
      };
      try {
        const data = await $fetch(`/api/recommendation/${id}`, {
          query: this.filters,
        });
        this.recommendation = data.recommendationItems;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/recommendation", error);
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
