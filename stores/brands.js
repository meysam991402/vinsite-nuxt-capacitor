import { defineStore } from "pinia";
export const useBrandsStore = defineStore("useBrands", {
  state: () => {
    return {
      brands: null,
      loading: false,
    };
  },
  getters: {
    getBrandsData(state) {
      return state.brands;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setBrands() {
      this.loading = true;
      try {
        const data = await $fetch("/api/brands");
        this.brands = data.brands;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/brands", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
