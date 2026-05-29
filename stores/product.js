import { defineStore } from "pinia";
export const useProductStore = defineStore("useProduct", {
  state: () => {
    return {
      product: null,
      productStatus: null,
      related_products: null,
      loading: false,
      errorNotFound: false,
      mainImage: null,
      selectedVariety: null,

      // اطلاعات مربوت به اینکه کدوم اتربوت در بالاتربین سطح کلیک کردن قرار داره و اینکه ساختار چند ردیفه هست
      countVarieties: {},
      //یک ابجکت هست که بر اساس کلید های اتربویت برای مقدار یک ارایه دارد مثلا size:[]
      productAttributes: {},
      price: null,
      allImages: null,
    };
  },
  getters: {
    getProduct(state) {
      return state.product;
    },

    getProductStatus(state) {
      return state.productStatus;
    },
    getAllImagesProduct(state) {
      return state.allImages;
    },
    getProductPrice(state) {
      return state.price;
    },
    getMainImage(state) {
      return state.mainImage;
    },
    getRelatedProducts(state) {
      return state.related_products;
    },

    getLoading(state) {
      return state.loading;
    },
    getErrorNotFound(state) {
      return state.errorNotFound;
    },
    getProductAttributes(state) {
      return state.productAttributes;
    },
    getSelectedVariety(state) {
      return state.selectedVariety;
    },
    getSelectedQuantity(state) {
      return state.selectedQuantity;
    },
    getCountVarieties(state) {
      return state.countVarieties;
    },
  },
  actions: {
    async requestProduct(slug = "") {
      this.loading = true;
      this.errorNotFound = false;
      this.product = null;
      this.productAttributes = {};
      this.selectedVariety = null;

      try {
        const safeSlug = encodeURIComponent(slug);
        const data = await $fetch(`/api/product/${safeSlug}`);
        this.product = data.product;
        this.productStatus = data.product.status;
        this.price = data.product.final_price;
        this.allImages = data.product.both_images;
        this.mainImage = data.product?.main_image ?? null;
        this.related_products = data.related_products;
        if (data.product?.varieties.length) {
          this.setProductAttributes(data.product?.varieties ?? []);
        }
      } catch (error) {
        console.error("❌", error);
        if (error.statusCode == "404") {
          this.errorNotFound = true;
        }
      } finally {
        this.loading = false;
      }
    },
    async setProductAttributes(varieties) {
      // ساختن کلید های اتربیوت
      this.makeKeyAttributes(varieties[0].attributes);

      if (varieties.length == 1) {
        if (varieties[0].attributes.length) {
          this.countVarieties = varieties[0].attributes.length
            ? varieties[0].attributes.length
            : null;
          await this.makeProductAttributes(varieties);
        } else {
          varieties[0].product_title = this.product?.title;
          this.selectedVariety = varieties[0];
        }
      } else {
        this.countVarieties = varieties[0].attributes.length
          ? varieties[0].attributes.length
          : null;
        await this.makeProductAttributes(varieties);
      }
    },
    async makeProductAttributes(varieties) {
      varieties.forEach((variety) => {
        variety.product_title = this.product?.title;
        variety?.attributes?.forEach((attribute) => {
          let findIndex = this.productAttributes[attribute.name].findIndex(
            (item) => item.pivot.value == attribute.pivot.value,
          );

          attribute.isAvailable =
            this.countVarieties == 1 && variety?.store?.balance == 0
              ? false
              : true;

          if (findIndex == -1) {
            this.productAttributes[attribute.name].push({
              ...attribute,
              images: variety.images,
              variety_item: variety,
              variety_ids: [
                {
                  variety_id: attribute?.pivot?.variety_id,
                  varietyQuantity: variety?.store?.balance ?? 0,
                },
              ],
            });
          } else {
            if (
              this.productAttributes[attribute.name][findIndex].images.length ==
              0
            ) {
              if (variety.images.length != 0) {
                this.productAttributes[attribute.name][findIndex].images =
                  variety.images;
              }
            }
            this.productAttributes[attribute.name][findIndex].variety_ids.push({
              variety_id: attribute?.pivot?.variety_id,
              varietyQuantity: variety?.store?.balance,
            });
          }
        });
      });
    },
    //کلید های اتربویت رو میسازه
    makeKeyAttributes(attribute) {
      attribute.forEach((attribute) => {
        this.productAttributes[attribute.name] = [];
      });
    },
    setSelectedVariety(variety) {
      this.selectedVariety = variety;
      this.price = variety?.final_price ?? null;
    },
    setSelectedQuantity(quantity) {
      this.selectedQuantity = quantity;
    },
    setMainImage(image) {
      this.mainImage = image;
    },
    disabledVarieties(selectVarietyUser) {
      let arry = [];

      const attributesSelecteKeys = Object.keys(selectVarietyUser);
      const allAttributesKeys = Object.keys(this.productAttributes);
      let otherKeys = allAttributesKeys.filter(
        (key) => !attributesSelecteKeys.includes(key),
      );

      // allAttributesKeys.forEach((key) => {
      //   let findIndex = attributesSelecteKeys.findIndex((item) => item == key);
      //   if (findIndex != -1) {
      //     otherKeys.push(key);
      //   }
      // });

      // this.product.varieties.forEach((variety) => {
      //   variety.attributes.forEach((attribute) => {
      //     attributesSelecteKeys.forEach((selectVariety) => {

      //       if (attribute.name == selectVariety) {
      //         if (
      //           attribute.pivot.value ==
      //           selectVarietyUser[selectVariety].pivot.value
      //         ) {
      //           arry.push(variety);
      //         }
      //       }
      //     });
      //   });
      // });

      this.product.varieties.forEach((variety) => {
        // فرض می کنیم این variety مطابق انتخاب کاربر است تا خلافش ثابت شود
        let matchesAllSelectedAttributes = true;

        // اگر کاربر هیچ ویژگی ای انتخاب نکرده بود، همه varieties ها باید نمایش داده شوند
        if (attributesSelecteKeys.length === 0) {
          matchesAllSelectedAttributes = true;
        } else {
          // برای هر ویژگی که کاربر انتخاب کرده است، بررسی می کنیم که آیا در variety فعلی وجود دارد و مقدارش هم مطابقت دارد
          for (const selectKey of attributesSelecteKeys) {
            const selectedValue = selectVarietyUser[selectKey].pivot.value;

            // پیدا کردن attribute مربوطه در variety فعلی
            const matchingAttribute = variety.attributes.find(
              (attr) => attr.name === selectKey,
            );

            // اگر attribute یافت نشد، یا مقدارش مطابقت نداشت، این variety انتخاب نمی شود
            if (
              !matchingAttribute ||
              matchingAttribute.pivot.value !== selectedValue
            ) {
              matchesAllSelectedAttributes = false;
              break; // نیازی به بررسی سایر ویژگی های انتخاب شده نیست، این variety مطابقت ندارد
            }
          }
        }

        // اگر تمام ویژگی های انتخاب شده توسط کاربر با ویژگی های variety مطابقت داشتند
        if (matchesAllSelectedAttributes) {
          arry.push(variety);
        }
      });
      this.productAttributes[otherKeys[0]].forEach((element, index) => {
        if (arry[index].store.balance == 0) {
          element.isAvailable = false;
        } else {
          element.isAvailable = true;
        }
      });
    },
  },
});
