import { defineStore } from "pinia";
export const usePostCategoriesStore = defineStore("usePostCategories", {
  state: () => {
    return {
      postCategories: null,
      loading: false,
    };
  },
  getters: {
    getPostCategoriesData(state) {
      return state.postCategories;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setPostCategories() {
      this.loading = true;
      try {
        const data = await $fetch("/api/postCategories");
        this.postCategories = data.post_categories;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/postCategories", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
