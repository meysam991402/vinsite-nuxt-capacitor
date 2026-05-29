<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-1">
      <div class="flex justify-between">
        <span class="text-md text-gray-900">مجموع قیمت ها :</span>
        <div class="flex items-center gap-1">
          <span class="text-lg text-gray-900">{{
            cartsShowcase?.items_real_amount?.toLocaleString() ?? "-"
          }}</span>
          <span class="text-md text-gray-900">تومان</span>
        </div>
      </div>
      <div class="flex justify-between">
        <span class="text-md text-green-500">تخفیف:</span>
        <div class="flex items-center gap-1">
          <span class="text-lg text-green-500">{{
            cartsShowcase?.items_discount_amount?.toLocaleString() ?? "-"
          }}</span>
          <span class="text-md text-green-500">تومان</span>
        </div>
      </div>
      <div
        class="flex justify-between text-neutral-500"
        v-if="selectedShipping"
      >
        <span class="text-md">هزینه ارسال:</span>
        <span class="text-md">
          {{
            selectedShipping?.pay_at_home == 1
              ? "درب منزل"
              : selectedShipping?.amount_showcase == 0
                ? "رایگان"
                : `${selectedShipping?.amount_showcase?.toLocaleString()} تومان`
          }}
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-lg font-bold text-red-600">پرداخت نهایی:</span>
        <div class="flex items-center gap-1">
          <span class="text-lg font-bold text-red-600">{{
            (
              Number(cartsShowcase?.items_final_amount) +
              Number(cartsShowcase?.shipping_amount ?? 0)
            )?.toLocaleString() ?? "-"
          }}</span>
          <span class="text-lg font-bold text-red-600">تومان</span>
        </div>
      </div>
    </div>
    <form class="discount-form mx-auto flex items-center">
      <input
        type="text"
        placeholder="کد تخفیف را وارد کنید"
        v-model="coupon"
        class="discount-input bg-neutral-200 p-2 rounded-r-md w-32 md:w-48"
      />
      <button
        type="button"
        class="discount-btn bg-neutral-400 text-white text-md py-[7px] px-3 rounded-l-md"
        @click="sendCoupon"
        >
        ثبت کد تخفیف
      </button>
    </form>
  </div>
</template>
<script setup>
const storeCarts = useCartStore();
let cartsShowcase = computed(() => storeCarts.getCartsShowcase);
let selectedShipping = computed(() => storeCarts.getSelectedShipping);
const coupon = computed(() => storeCarts.getCoupon);
const sendCoupon = (coupon) => {
  storeCarts.setCoupon(coupon);
};
</script>
