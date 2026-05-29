import { defineStore } from "pinia";
export const useOrderListStore = defineStore("useOrderList", {
  state: () => {
    return {
      orderList: null,
      activeFilter: "",
      statuses: null,
      loading: false,
    };
  },
  getters: {
    getActiveFilter(state) {
      return state.activeFilter;
    },
    getOrderList(state) {
      return state.orderList;
    },
    getStatuses(state) {
      return state.statuses;
    },

    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setOrderList(query = {}) {
      this.loading = true;
      let newQuery = {};
      if (query.status != "all") {
        newQuery = {
          status: query.status,
        };
      }
      try {
        const data = await $fetch("/api/orderList", {
          query: newQuery,
        });
        this.orderList = data?.orders ?? null;
        this.activeFilter = newQuery.status
          ? newQuery.status
          : data?.statuses.length
            ? data?.statuses[0].name
            : "";
        data?.statuses.forEach((element) => {
          if (
            data?.status_counts &&
            Object.prototype.hasOwnProperty.call(
              data?.status_counts,
              element?.name,
            )
          ) {
            element.count = data.status_counts[element.name];
          }
        });
        this.statuses = data?.statuses ?? null;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/brands", error);
      } finally {
        this.loading = false;
      }
    },
    setActiveFilter(key) {
      this.activeFilter = key;
    },
  },
});
