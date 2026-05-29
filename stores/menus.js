import { defineStore } from "pinia";
export const useMenusStore = defineStore("useMenus", {
  state: () => {
    return {
      header: null,
      footer: null,
      loading: false,
    };
  },
  getters: {
    getHeader(state) {
      return state.header;
    },
    getFooter(state) {
      return state.footer;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setMenus() {
      this.loading = true;
      try {
        const data = await $fetch("/api/menus");

        this.header = data?.menus?.header ?? null;
        this.footer = data?.menus?.footer ?? null;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/faqs", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
