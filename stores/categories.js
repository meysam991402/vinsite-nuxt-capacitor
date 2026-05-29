import { defineStore } from "pinia";

// const baseUrl = 'https://api.minimalzee.ir'

export const useCategoriesStore = defineStore("useCategories", {
  state: () => {
    return {
      categories: null,
      categoriesSlug: null,
      loading: false,
    };
  },
  getters: {
    getCategoriesData(state) {
      return state.categories;
    },
    getCategoriesSlug(state) {
      return state.categoriesSlug;
    },
    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setCategories() {
      this.loading = true;
      try {
        const data = await $fetch("/api/categories");
        this.categories = data.categories;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/categories", error);
      } finally {
        this.loading = false;
      }
    },
    async setCategoriesAllSlug() {
      this.loading = true;
      try {
        const data = await $fetch("/api/categoriesSlug");
        this.categoriesSlug = data;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/categories", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
