import { defineStore } from "pinia";
import makeArry from "~/utils/errorString";
const { transferPort } = useTransferPort();

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      carts: null,
      cartsLoading: false,
      countLoader: false,
      deleteLoader: false,
      cartsCount: null,
      disabledBtn: false,
      modalDetail: false,
      cartsShowcase: {},
      warnings: [],
      errorMessages: [],
      addresses: null,
      selectedAddress: null,
      selectedShipping: null,
      provinces: null,
      loadingAddress: false,
      loadingShippings: false,
      shippings: null,
      ModalAddAddress: false,
      loadingDeleteAddress: false,
      loadingGateways: false,
      gateways: null,
      selectedGateway: null,
      coupon: null,
      loadingPay: false,
      transferPortal: false,
    };
  },
  getters: {
    getCarts(state) {
      return state.carts;
    },
    getWarnings(state) {
      return state.warnings;
    },
    getCartsShowcase(state) {
      return state.cartsShowcase;
    },
    getCartsLoading(state) {
      return state.cartsLoading;
    },
    getDeleteLoader(state) {
      return state.deleteLoader;
    },
    getCountLoader(state) {
      return state.countLoader;
    },
    getCartsCount(state) {
      return state.cartsCount;
    },
    getDisabledBtn(state) {
      return state.disabledBtn;
    },
    getModalDetail(state) {
      return state.modalDetail;
    },
    getErrorMessages(state) {
      return state.errorMessages;
    },
    getAddress(state) {
      return state.addresses;
    },
    getSelectedAddress(state) {
      return state.selectedAddress;
    },
    getProvinces(state) {
      return state.provinces;
    },
    getLoadingAddress(state) {
      return state.loadingAddress;
    },
    getSelectedShipping(state) {
      return state.selectedShipping;
    },
    getshippings(state) {
      return state.shippings;
    },
    getLoadingShippings(state) {
      return state.loadingShippings;
    },
    getModalAddAddress(state) {
      return state.ModalAddAddress;
    },
    getLoadingDeleteAddress(state) {
      return state.loadingDeleteAddress;
    },
    getGateways(state) {
      return state.gateways;
    },
    getLoadingGateways(state) {
      return state.loadingGateways;
    },
    getSelectedGateway(state) {
      return state.selectedGateway;
    },
    getCoupon(state) {
      return state.coupon;
    },
    getLoadingPay(state) {
      return state.loadingPay;
    },
    getTransferPortal(state) {
      return state.transferPortal;
    },
  },
  actions: {
    async requestCarts() {
      this.cartsLoading = true;
      try {
        const data = await $fetch("/api/carts");

        this.carts = data.carts;
        this.cartsShowcase = data.carts_showcase;
        this.cartsShowcase.shipping_amount = this.selectedShipping
          ? this.selectedShipping.pay_at_home == 1
            ? 0
            : this.selectedShipping.amount_showcase
          : 0;

        this.cartsCount = data?.carts_count;
        this.warnings = data?.warnings;
        this.cartsLoading = false;
      } catch (error) {
        this.cartsLoading = false;

        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.cartsLoading = false;
      }
    },
    async addToCart(selectedVariety, selectedQuantity = 1) {
      this.disabledBtn = true;
      let body = {
        variety_id: selectedVariety.store.variety_id,
        quantity: selectedQuantity,
      };
      try {
        const data = await $fetch("/api/addToCart", {
          method: "post",
          body: JSON.stringify(body),
        });

        this.disabledBtn = false;
        useNuxtApp().$toast.success(
          "محصول مورد نظر با موفقیت به سبد خرید شما اضافه شد",
          {
            autoClose: 2000,
            dangerouslyHTMLString: true,
          },
        );

        this.modalDetail = true;
        this.errorMessages = [];
        this.cartsCount = data?.data.carts_count;
      } catch (error) {
        console.log(error.response);

        let errors = [];

        if (error?.response?._data) {
          errors = makeArry(
            error?.response?._data?.data?.message ??
              error?.response?.data?.message ??
              error.response._data?.error,
          );
          this.errorMessages = makeArry(
            error?.response?._data?.data?.message ??
              error?.response?.data?.message ??
              error.response._data?.error,
          );
        }
        // else if (error?.response?.data) {
        //   errors = makeArry(error?.response?.data?.message ?? "");
        //   this.errorMessages = makeArry(error?.response?.data?.message ?? "");
        // }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        // this.loading = false;
        this.disabledBtn = false;
      }
    },
    async updateCarts(id, type) {
      this.countLoader = true;
      try {
        const data = await $fetch(`/api/updateCart/${id}`, {
          method: "PUT",
          body: {
            quantity: 1,
            type: type,
            // _method: "PUT",
          },
        });

        // let findIndex = this.carts.findIndex((item) => item.id == data.cart.id);
        this.carts = data.carts;
        this.cartsShowcase = data.carts_showcase;
        this.cartsShowcase.shipping_amount = this.selectedShipping
          ? this.selectedShipping.pay_at_home == 1
            ? 0
            : this.selectedShipping.amount_showcase
          : 0;
        this.cartsCount = data?.carts_count;
        this.warnings = data?.warnings;

        useNuxtApp().$toast.success(
          "کاربر گرامی لیست سبد خرید شما با موفقیت بروزرسانی شد",
          {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          },
        );
        // this.carts = data.carts;
        // this.cartsCount = data.carts_count;
        // this.countLoader = false;
      } catch (error) {
        this.countLoader = false;

        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.countLoader = false;
      }
    },
    async deleteCarts(id) {
      this.deleteLoader = true;
      try {
        const data = await $fetch(`/api/deleteCart/${id}`, {
          method: "DELETE",
        });

        this.carts = data.carts;
        this.cartsShowcase = data.carts_showcase;
        this.cartsShowcase.shipping_amount = this.selectedShipping
          ? this.selectedShipping.pay_at_home == 1
            ? 0
            : this.selectedShipping.amount_showcase
          : 0;
        this.cartsCount = data?.carts_count;
        this.warnings = data.warnings;
        useNuxtApp().$toast.success(
          "کاربر گرامی لیست سبد خرید شما با موفقیت بروزرسانی شد",
          {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          },
        );
      } catch (error) {
        this.deleteLoader = false;

        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.deleteLoader = false;
      }
    },
    async deleteAllCarts() {
      this.deleteLoader = true;
      try {
        const data = await $fetch(`/api/deleteAllCart`, {
          method: "DELETE",
        });

        this.cartsCount = null;
        this.carts = null;
        this.cartsShowcase = null;
        useNuxtApp().$toast.success(
          "کاربر گرامی لیست سبد خرید شما با موفقیت خالی شد",
          {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          },
        );
      } catch (error) {
        this.deleteLoader = false;

        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.deleteLoader = false;
      }
    },
    setCartsCount(count) {
      this.cartsCount = count;
    },
    setCarts() {
      this.carts = null;
    },
    setModalDetail(flag) {
      this.modalDetail = flag;
    },
    setErrorMessages(messages) {
      this.errorMessages = messages;
    },
    async requestAddresses(type) {
      this.loadingAddress = true;

      try {
        const data = await $fetch("/api/addresses");

        this.addresses = data.addresses;
        this.selectedAddress = data?.addresses?.length
          ? data.addresses[0]
          : null;
        if (this.selectedAddress != null && type != "panel") {
          this.requestShippings();
        }
        this.provinces = data.provinces;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/addresses", error);
      } finally {
        this.loadingAddress = false;
      }
    },
    async addOrUpdateAddress(info, mode = "create", type) {
      this.loadingAddress = true;
      this.ModalAddAddress = false;

      try {
        let body = {
          city_id: info.city.id,
          first_name: info.first_name,
          last_name: info.last_name,
          mobile: info.mobile,
          address: info.address,
          postal_code: info.postal_code,
        };
        let url = "";
        let method = "POST";
        let message = "";
        if (mode == "create") {
          url = "/api/addressRegistration";
          message = "کاربر گرامی آدرس شما با موفقیت ثبت شد";
        } else {
          url = `/api/addressEdit/${info.id}`;
          method = "PATCH";
          message = "کاربر گرامی آدرس شما با موفقیت بروزرسانی شد";
        }
        const data = await $fetch(url, {
          method: method,
          body: body,
        });

        useNuxtApp().$toast.success(message, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
        this.ModalAddAddress = true;
        this.addresses = data.addresses;
        this.selectedAddress = data?.addresses?.length
          ? data.addresses[0]
          : null;
        if (this.selectedAddress != null && type != "panel") {
          this.requestShippings();
        }
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/addresses", error);
        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
        this.ModalAddAddress = false;
      } finally {
        this.loadingAddress = false;
      }
    },
    async deletedAddress(id) {
      this.loadingDeleteAddress = true;

      try {
        const data = await $fetch(`/api/deleteAddress/${id}`, {
          method: "DELETE",
        });

        this.addresses = data.addresses;
        this.selectedAddress = data?.addresses?.length
          ? data.addresses[0]
          : null;
        useNuxtApp().$toast.success(
          "کاربر گرامی آدرس مورد نظر با موفقیت از لیست آدرس های شما حذف شد",
          {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          },
        );
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/addresses", error);
        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
      } finally {
        this.loadingDeleteAddress = false;
      }
    },
    async requestShippings() {
      this.loadingShippings = true;
      this.shippings = null;
      this.selectedShipping = null;

      try {
        let body = {
          // address_id: null,
          address_id:
            this.selectedAddress != null ? this.selectedAddress.id : null,
          varieties: [],
        };
        this.carts?.forEach((cart, index) => {
          body.varieties.push({
            id: cart.variety.id,
            quantity: cart.quantity,
            price: cart.price,
          });
        });
        const data = await $fetch("/api/shippings", {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (Array.isArray(data.shippings)) {
          this.shippings = data.shippings;
        } else if (
          typeof data.shippings === "object" &&
          data.shippings !== null
        ) {
          this.shippings = Object.values(data.shippings);
        }

        this.selectedShipping = this.shippings.length
          ? this.shippings[0]
          : null;
        this.cartsShowcase.shipping_amount = this.selectedShipping
          ? this.selectedShipping.pay_at_home == 1
            ? 0
            : this.selectedShipping.amount_showcase
          : 0;
      } catch (error) {
        console.error(
          "❌ خطا در گرفتن داده از /api/shippingsshippingsshippings",
          error,
        );
        let errors = [];
        if (error?.response?._data) {
          errors = makeArry(error?.response?._data?.message ?? "");
        } else if (error?.response?.data) {
          errors = makeArry(error?.response?.message ?? "");
        }
        errors.forEach((error) => {
          useNuxtApp().$toast.error(error, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
            rtl: true,
          });
        });
      } finally {
        this.loadingShippings = false;
      }
    },
    async requestGateways() {
      this.loadingGateways = true;
      this.gateways = null;
      try {
        const data = await $fetch("/api/gateways");
        this.gateways = data.gateways;
        this.selectedGateway =
          this.gateways && this.gateways.length ? this.gateways[0] : null;
      } catch (error) {
        console.error(
          "❌ خطا در گرفتن داده از /api/getewayDatagetewayData",
          error.response,
        );
      } finally {
        this.loadingGateways = false;
      }
    },
    setSelectedGateway(gateway) {
      this.selectedGateway = gateway;
    },
    async setSelectedAddress(address, type) {
      this.selectedAddress = address;
      if (type != "panel") {
        this.requestShippings();
      }
    },
    setSelectedShippnig(shipping) {
      this.cartsShowcase.shipping_amount =
        shipping.pay_at_home == 1 ? 0 : shipping.amount_showcase;

      this.selectedShipping = shipping;
    },
    setCoupon(coupon) {
      this.coupon = coupon;
    },
    async payCarts(pay_wallet) {
      this.loadingPay = true;
      this.transferPortal = false;
      try {
        let body = {
          address_id: this.selectedAddress?.id,
          shipping_id: this.selectedShipping?.id,
          coupon_code: this.coupon,
          driver_name: this.selectedGateway?.driver,
          pay_wallet: pay_wallet,
        };
        const data = await $fetch("/api/pay", {
          method: "POST",
          body: body,
        });
        console.log(data, "datadatadatadatadatadatadata");

        transferPort(data.data);
        // let formContainer = document.getElementById("formContainer");
        // let responseData = data.data;
        // let makeResponse = data.data.make_response;
        // let params = makeResponse.inputs;
        // if (responseData.need_pay) {
        //   useNuxtApp().$toast.success("درحال اتتقال به درگاه پرداهت", {
        //     autoClose: 2000,
        //     dangerouslyHTMLString: true,
        //     rtl: true,
        //   });
        //   this.transferPortal = true;
        //   if (makeResponse.method == "POST") {
        //     const form = document.createElement("form");
        //     form.method = makeResponse.method;
        //     form.action = makeResponse.url;
        //     form.target = "_self"; // اطمینان از اینکه در پنجره جاری باز شود
        //     for (const key in params) {
        //       const input = document.createElement("input");
        //       input.type = "hidden";
        //       input.name = key;
        //       input.value = params[key];
        //       form.appendChild(input);
        //     }
        //     // اضافه کردن فیلدهای مخفی

        //     // اضافه کردن و ارسال فرم
        //     formContainer.value.innerHTML = "";
        //     formContainer.value.appendChild(form);

        //     // این خط باعث ریدایرکت کاربر با متد POST می‌شود
        //     form.submit();
        //   } else {
        //     //اگه متد get بود باید بسنجیم که مقدار inputs اگه پر بود انتهای url به صورت کوییری استرینگ اضافه کنیم و بعدش ریدایرکت کنیم
        //     let query = "";
        //     if (params && typeof params === "object") {
        //       Object.entries(params).forEach(([key, input], index) => {
        //         if (index === 0) {
        //           query += "?" + key + "=" + input;
        //         } else {
        //           query += "&" + key + "=" + input;
        //         }
        //         index++;
        //       });
        //     }
        //     window.location.href = makeResponse.url + query;
        //   }
        // } else {
        //   // this.$router.push("/order/" + responseData.order_id);
        // }
      } catch (error) {
        this.transferPortal = false;
        // useNuxtApp().$toast.error(error.data.data.message, {
        //   autoClose: 2000,
        //   dangerouslyHTMLString: true,
        //   rtl: true,
        // });
        const errorMessage =
          error?.data?.data?.message ||
          error?.data?.message ||
          "یه خطای ناشناخته رخ داده! سرور خسته است 😴";
        useNuxtApp().$toast.error(errorMessage, {
          autoClose: 2000,
          dangerouslyHTMLString: true,
          rtl: true,
        });
        console.error("❌ خطا در گرفتن داده از /api/settings", error);
      } finally {
        this.loadingPay = false;
      }
    },
  },
});
