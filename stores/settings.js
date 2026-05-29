import { defineStore } from "pinia";
export const useSettingsStore = defineStore("useSettings", {
  state: () => {
    return {
      settings: null,
      loading: false,
      social_medias: null,
      main_informations: null,
      footer: null,
    };
  },
  getters: {
    getSettingsData(state) {
      return state.settings;
    },
    getFooter(state) {
      return state.footer;
    },
    getScoialMedias(state) {
      return state.social_medias;
    },
    getMainInformations(state) {
      return state.main_informations;
    },
    getLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async setSettings() {
      this.loading = true;
      try {
        const data = await $fetch("/api/settings");
        this.settings = data.settings;
        this.social_medias = data.settings.social_medias;
        this.main_informations = data.settings.main_informations;
        this.footer = data.settings.footer;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
