import { defineStore } from "pinia";
export const useFaqsStore = defineStore("useFaqs", {
  state: () => {
    return {
      faqs: null,
      loading: false,
    };
  },
  getters: {
    getFaqsData(state) {
      return state.faqs;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setFaqs() {
      this.loading = true;
      try {
        const data = await $fetch("/api/faqs");
        this.faqs = data.faqs;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/faqs", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
