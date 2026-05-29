import { defineStore } from "pinia";
export const useWeblogDetailStore = defineStore("useWeblogDetail", {
  state: () => {
    return {
      weblogDetail: null,
      related_posts: null,
      loading: false,
      errorNotFound: false,
    };
  },
  getters: {
    getWeblogDetailData(state) {
      return state.weblogDetail;
    },
    getRelatedPosts(state) {
      return state.related_posts;
    },
    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
  },
  actions: {
    async setWeblogDetail(slug = "") {
      this.loading = true;
      this.errorNotFound = false;
      try {
        const safeSlug = encodeURIComponent(slug);
        const data = await $fetch(`/api/weblogDetail/${safeSlug}`);
        this.weblogDetail = data.post;
        this.related_posts = data.related_posts;
      } catch (error) {
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
        console.error("❌ خطا در گرفتن داده از /api/weblogDetail", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
