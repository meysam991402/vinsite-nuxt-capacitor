import { defineStore } from "pinia";
import makeArry from "~/utils/errorString";

const { transferPort } = useTransferPort();
export const useWalletStore = defineStore("Wallet", {
  state: () => {
    return {
      withdraws: null,
      transactions: null,
      transactionsTypes: null,
      loadingTransactions: false,
      modalWalletRecharge: false,
      loadingWithdraws: false,
      loadingWithdrawcancel: false,
      loadingDeopsits: false,
      isShowDetailModal: false,
      statuses: null,
    };
  },
  getters: {
    getWithdraws(state) {
      return state.withdraws;
    },
    getTransactions(state) {
      return state.transactions;
    },
    getTransactionsTypes(state) {
      return state.transactionsTypes;
    },

    getLoadingTransactions(state) {
      return state.loadingTransactions;
    },
    getLoadingWithdraws(state) {
      return state.loadingWithdraws;
    },
    getLoadingWithdrawcancel(state) {
      return state.loadingWithdrawcancel;
    },
    getLoadingDeopsits(state) {
      return state.loadingDeopsits;
    },
    getModalWalletRecharge(state) {
      return state.modalWalletRecharge;
    },
    getStatuses(state) {
      return state.statuses;
    },
    getIsShowDetailModal(state) {
      return state.isShowDetailModal;
    },
  },
  actions: {
    async requestWithdraws(query) {
      this.loadingWithdraws = true;
      let newQuery = {
        page: query?.page ?? 1,
      };
      if (query.status != "all") {
        newQuery = {
          status: query.status,
        };
      }
      try {
        const data = await $fetch("/api/withdraws", { query: newQuery });
        console.log(data, "datadatadata");
        this.withdraws = data;
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
        // this.profile = data.data.customer;
        // this.profileImage = data.data.customer.image?.original_url ?? "";
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/withdraws", error);
      } finally {
        this.loadingWithdraws = false;
      }
    },
    async requestWithdrawCancel(id, query = null) {
      this.loadingWithdrawcancel = true;
      try {
        const data = await $fetch(`/api/withdrawCancel/${id}`, {
          method: "put",
        });
        console.log(data, "datadatadata");
        this.requestWithdraws(query);
        this.isShowDetailModal = false;
        // this.profile = data.data.customer;
        // this.profileImage = data.data.customer.image?.original_url ?? "";
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/withdraws", error);
      } finally {
        this.loadingWithdrawcancel = false;
      }
    },
    async requestDeopsits(params) {
      this.loadingDeopsits = true;

      try {
        let body = {
          driver_name: params?.driver_name ?? "",
          amount: params?.amount ?? 0,
        };
        const data = await $fetch("/api/deopsits", {
          method: "POST",
          body: JSON.stringify(body),
        });
        console.log(data, "datadatadatadata");

        transferPort(data);
      } catch (error) {
        console.log("❌ خطا در گرفتن داده از /api/deopsits", error.response);

        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.data?.message ?? "");
          this.errorMessages = makeArry(
            error?.response?._data?.data?.message ?? "",
          );
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.data?.message ?? "");
          this.errorMessages = makeArry(error?.response?.data?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        console.error("❌ خطا در گرفتن داده از /api/deopsits", error);
      } finally {
        this.loadingDeopsits = false;
      }
    },
    async requestTransactions(query) {
      this.loadingTransactions = true;
      this.transactions = null;
      let newQuery = {
        page: query?.page ?? 1,
      };
      if (query.type != "all") {
        newQuery = {
          type: query.type,
        };
      }
      try {
        const data = await $fetch("/api/transactions", {
          query: newQuery,
        });

        this.transactions = data;
        data?.types.forEach((element) => {
          if (
            data?.type_counts &&
            Object.prototype.hasOwnProperty.call(
              data?.type_counts,
              element?.name,
            )
          ) {
            element.count = data.type_counts[element.name];
          }
        });
        this.transactionsTypes = data?.types ?? null;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/transactions", error);
      } finally {
        this.loadingTransactions = false;
      }
    },
    setModalWalletRecharge(flag) {
      console.log(flag, "flagflagflag");

      this.modalWalletRecharge = flag;
    },
    setIsShowDetailModal(flag) {
      this.isShowDetailModal = flag;
    },
  },
});
