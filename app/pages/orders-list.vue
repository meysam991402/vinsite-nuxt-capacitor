<script setup>
definePageMeta({
  middleware: "check-auth",
});
const storeCart = useCartStore();
let carts = computed(() => storeCart.getCarts);
let selectedAddress = computed(() => storeCart.getSelectedAddress);
let selectedShipping = computed(() => storeCart.getSelectedShipping);
const route = useRoute();
const router = useRouter();
import IconsStep1svg from "@/components/Icons/step1svg.vue";
import IconsStep2svg from "@/components/Icons/step2svg";
import IconsStep3svg from "@/components/Icons/step3svg";
let showModalAddAddress = ref(false);
let deliveryVModal = ref(false);
const ordersList = ref([
  { key: "step1", index: 0, link: "/orders-list", svg: IconsStep1svg },
  { key: "step2", index: 1, link: "/orders-list/step2", svg: IconsStep2svg },
  { key: "step3", index: 2, link: "/orders-list/step3", svg: IconsStep3svg },
]);

// وضعیت کلی مرحله (0=قبل، 1=فعال، 2=گذشته)
let currentStep = computed(() => {
  const p = route.path.replace(/\/$/, ""); // remove trailing slash
  if (p.startsWith("/orders-list/step3")) return 2;
  if (p.startsWith("/orders-list/step2")) return 1;
  if (p === "/orders-list") return 0;
  return -1;
});
// watch(()=>route.path,(newPath)=>{
//   if (route.path === "/orders-list/step3") return 2;
//   if (route.path === "/orders-list/step2") return 1;
//   if (route.path === "/orders-list") return 0;
//   return -1;
// })
// وضعیت آیکون
const getIconStatus = (stepIndex) => {
  if (currentStep.value === -1) return "inactive";
  return stepIndex <= currentStep.value ? "active" : "inactive";
};

// وضعیت خط
const getLineStatus = (lineIndex) => {
  if (currentStep.value === -1) return "line-inactive";
  if (currentStep.value > lineIndex) return "line-fully-active";
  if (currentStep.value === lineIndex) return "line-low-active";
  return "line-inactive";
};
function nextStep(item) {
  const step = currentStep.value;

  // قانون اول: اگر کاربر روی مرحله فعلی یا مراحل قبلی کلیک کرد ($item.index \le step$) -> اجازه عبور بده
  if (item.index <= step) {
    router.push(item.link);
    return;
  }

  // اگر کاربر تو مرحله 0 هست و سعی می‌کنه مستقیم بپره مرحله 2!
  if (step === 0 && item.index === 2) {
    useNuxtApp().$toast.warning(
      "دوست من، اول باید آدرس و شیوه ارسال رو مشخص کنی!",
      { rtl: true },
    );
    return;
  }

  // مرحله 0 → مرحله 1
  if (step === 0 && item.index === 1) {
    if (carts.value && carts.value.length > 0) {
      router.push(item.link);
    } else {
      useNuxtApp().$toast.error("سبد خرید شما خالی است!", { rtl: true });
    }
    return;
  }

  // مرحله 1 → مرحله 2
  if (step === 1 && item.index === 2) {
    if (!selectedAddress.value) {
      showModalAddAddress.value = true;
      useNuxtApp().$toast.error("کاربر گرامی ابتدا باید یک آدرس انتخاب کنید", {
        rtl: true,
      });
      return; // فقط return می‌کنیم تا ادامه کد اجرا نشه
    }

    if (!selectedShipping.value) {
      deliveryVModal.value = true;
      useNuxtApp().$toast.error(
        "کاربر گرامی ابتدا باید یک شیوه ارسال انتخاب کنید",
        { rtl: true },
      );
      return; // توست رو نباید return کرد!
    }

    router.push(item.link);
  }
}
// function nextStep(item) {

//   if (item.index < currentStep.value) {
//     return router.push(item.link);
//   }
//   if (
//     currentStep.value == 0 &&
//     item.index == 1 &&
//     carts.value &&
//     carts.value.length
//   ) {
//     router.push(item.link);
//   }
//   if (
//     currentStep.value == 1 &&
//     item.index == 2

//   ) {

//     if (selectedAddress.value == null) {
//       showModalAddAddress.value = true;
//       useNuxtApp().$toast.error("کاربر گرامی ابتدا باید یک آدرس انتخاب کنید", {
//         autoClose: 2000,
//         dangerouslyHTMLString: true,
//         rtl: true,
//       });
//     } else if (selectedShipping.value == null) {
//       deliveryVModal.value = true;
//       useNuxtApp().$toast.error(
//         "کاربر گرامی ابتدا باید یک شیوه ارسال انتخاب کنید",
//         {
//           autoClose: 2000,
//           dangerouslyHTMLString: true,
//           rtl: true,
//         },
//       );
//     } else {

//       router.push(item.link);
//     }
//   }
//   if (item.index === currentStep.value) {
//   return router.push(item.link);
// }
// }
</script>

<template>
  <section class="mt-10 min-h-[50vh] container">
    <div
      class="max-w-4xl mx-auto mt-12 flex justify-center items-center gap-4 lg:gap-6"
    >
      <template v-for="(item, index) in ordersList" :key="item.key">
        <!-- آیکون -->
        <button
          @click="nextStep(item)"
          :class="{
            'opacity-40 grayscale': getIconStatus(index) === 'inactive',
            'text-blue-600': getIconStatus(index) === 'active',
          }"
          class="transition-all duration-300 ease-in-out flex flex-col items-center"
        >
          <component :is="item.svg" class="size-14 lg:size-16" />
        </button>

        <!-- خط اتصال -->
        <span
          v-if="index < ordersList.length - 1"
          class="w-12 lg:w-20 h-0.5 rounded-full transition-all duration-300 ease-in-out"
          :class="{
            'opacity-60': getLineStatus(index) === 'line-inactive',
            'opacity-60': getLineStatus(index) === 'line-low-active',
            'bg-gray-600': getLineStatus(index) === 'line-fully-active',
          }"
        />
      </template>
    </div>
    <div class="">
      <NuxtPage />
    </div>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="showModalAddAddress = false" v-if="showModalAddAddress">
        <AddressModalAddAddress
          @close="showModalAddAddress = false"
          mode="create"
        />
      </Modal>
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="deliveryVModal = false" v-if="deliveryVModal">
        <OrdersListDeliveryMethodModal @close="deliveryVModal = false" />
      </Modal>
    </Transition>
  </Teleport>
</template>
