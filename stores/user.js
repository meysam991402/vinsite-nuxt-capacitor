import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      LoginModal: false,
      login: false,
      profile: null,
      profileImage: "",
      favorites: null,
      loading: false,
      loadingImage: false,
      wallet: null,
    };
  },
  getters: {
    getWallet(state) {
      return state.wallet;
    },
    getLoginModal(state) {
      return state.LoginModal;
    },
    getLogin(state) {
      return state.login;
    },
    getProfile(state) {
      return state.profile;
    },
    getProfileImage(state) {
      return state.profileImage;
    },
    getFavorites(state) {
      return state.favorites;
    },
    getLoading(state) {
      return state.loading;
    },
    getLoadingImage(state) {
      return state.loadingImage;
    },
  },
  actions: {
    async requestProfile() {
      this.loading = true;
      try {
        const data = await $fetch("/api/profile");

        this.profile = data.data.customer;
        this.profileImage = data.data.customer.image?.original_url ?? "";
        this.wallet = data.data.customer.wallet;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/profile", error);
      } finally {
        this.loading = false;
      }
    },
    async requestProfileImage(img) {
      this.loadingImage = true;
      try {
        const data = await $fetch("/api/profileImage", {
          method: "PUT",
          body: JSON.stringify({
            image: img,
          }),
        });

        // this.profileImage = data;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/profile", error);
      } finally {
        this.loadingImage = false;
      }
    },
    setProfileImage(img) {
      this.profileImage = img;
    },
    async reqFavorites() {
      this.loading = true;
      try {
        const data = await $fetch("/api/favorites");

        this.favorites = data.favorites;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/favorites", error);
      } finally {
        this.loading = false;
      }
    },
    setLoginModal(status) {
      this.LoginModal = status;
    },
    setLogin(status) {
      this.login = status;
    },
    setProfile(profile) {
      this.profile = profile;
    },
    // setWallet(newWallet) {
    //   this.wallet = newWallet;
    // },
  },
});
