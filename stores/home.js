import { defineStore } from "pinia";
export const useHomeStore = defineStore("useHome", {
  state: () => {
    return {
      hasFetched: false,
      home: null,
      newHomeData: null,
      firstRequest: true,
      advertisements: null,
      brands: null,
      posts: null,
      recommendations: null,
      flashes: null,
      sliders: null,
      special_categories: null,
      newest_products: null,
      category_products: null,
      // most_sales: null,
      loading: false,
    };
  },
  getters: {
    getHomeData(state) {
      return state.home;
    },
    getAdvertisementsData(state) {
      return state.advertisements;
    },
    getBrandsData(state) {
      return state.brands;
    },
    getPostsData(state) {
      return state.posts;
    },
    getRecommendations(state) {
      return state.recommendations;
    },
    getFlashes(state) {
      return state.flashes;
    },
    getSliders(state) {
      return state.sliders;
    },
    getNewestProducts(state) {
      return state.newest_products;
    },
    getSpecialCategories(state) {
      return state.special_categories;
    },
    getCategoryProducts(state) {
      return state.category_products;
    },
    // getMostSales(state) {
    //   return state.most_sales;
    // },
    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    isEqual(obj1, obj2) {
      console.log(JSON.stringify(obj1) === JSON.stringify(obj2), "test");

      return JSON.stringify(obj1) === JSON.stringify(obj2);
    },
    async setHome() {
      try {
        if (this.firstRequest) {
          this.loading = true;
          const data = await $fetch("/api/home");
          console.log(data.home_data, "data.home_data");

          this.firstRequest = false;
          this.home = data.home_data;
          this.newHomeData = data.home_data;
        } else {
          this.home = this.newHomeData;
          const data = await $fetch("/api/home");
          console.log(data.home_data, "data.home_data");

          if (!this.isEqual(data.home_data, this.newHomeData)) {
            this.home = data.home_data;
          }
        }
        this.advertisements = this.home.advertisements;
        this.brands = this.home.brands;
        this.posts = this.home.posts;
        this.recommendations = this.home.recommendations;
        this.flashes = this.home.flashes;
        this.sliders = this.home.sliders;
        this.special_categories = this.home.special_categories;
        this.newest_products = this.home.newest_products;
        this.category_products = this.home.category_products;
        // this.most_sales=this.home.most_sales;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/home", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
