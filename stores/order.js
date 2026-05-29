import { defineStore } from "pinia";
export const useOrderStore = defineStore("useOrder", {
  state: () => {
    return {
      order: null,
      loading: false,
    };
  },
  getters: {
    getOrder(state) {
      return state.order;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setOrder(id) {
      this.loading = true;
      this.order = null;
      try {
        const data = await $fetch(`/api/order/${id}`);
        console.log(data, "datadatadatadata");

        this.order = data.order;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/brands", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
