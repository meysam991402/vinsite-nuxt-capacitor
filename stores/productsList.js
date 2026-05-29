import { defineStore } from "pinia";
export const useProductsStore = defineStore("useProducts", {
  state: () => {
    return {
      products: null,
      categories: null,
      loading: false,
      sorting: null,
      price_filter: null,
      filters: {},
      errorNotFound: false,
      titleSearch: "",
      activeSort: null,
    };
  },
  getters: {
    getSorting(state) {
      return state.sorting;
    },
    getActiveSort(state) {
      return state.activeSort;
    },
    getProducts(state) {
      return state.products;
    },
    getCategories(state) {
      return state.categories;
    },
    getPriceFilter(state) {
      return state.price_filter;
    },
    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
    getTitleSearch(state) {
      return state.titleSearch;
    },
  },
  actions: {
    async setProducts(query = {}, slug = "") {
      this.loading = true;
      this.errorNotFound = false;
      this.filters = {
        sort_by: query?.sort_by ?? "",
        title: query?.title ?? "",
        min_price: query?.min_price ?? "",
        max_price: query?.max_price ?? "",
        only_availables: query?.only_availables ?? 0,
        color_range_ids: query?.color_range_ids ?? "",
        brand_id: query?.brand_id ?? "",
        category_id: query?.category_id ?? null,
        page: query?.page ?? 1,
      };
      try {
        const safeSlug = encodeURIComponent(slug);
        const data = await $fetch(`/api/productsList/${safeSlug}`, {
          query: this.filters,
        });
        this.products = data.products;
        this.categories = data?.category ?? null;
        this.sorting = data.sort_types;
        this.price_filter = data.price_filter;
      } catch (error) {
        console.error("❌", error);
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
      } finally {
        this.loading = false;
      }
    },
    setActiveSort(name) {
      this.activeSort = name;
    },
    setTitleSearch(val) {
      this.titleSearch = val;
    },
  },
});
