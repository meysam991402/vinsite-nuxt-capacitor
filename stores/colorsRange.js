import { defineStore } from "pinia";
export const useColorsRangeStore = defineStore("useColorsRange", {
  state: () => {
    return {
      colorsRange: null,
      loading: false,
    };
  },
  getters: {
    getColorsRangeData(state) {
      return state.colorsRange;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setColorsRange() {
      this.loading = true;
      try {
        const data = await $fetch("/api/colorsRange");
        this.colorsRange = data.colorRanges;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/colorsRange", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
