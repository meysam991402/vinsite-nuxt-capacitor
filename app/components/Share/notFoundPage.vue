<template>
  <div class="flex items-center justify-center flex-col mt-28 h-[40vh]">
    <div class="flex justify-between items-center">
      <div class="font-bold text-8xl md:text-9xl text-[#293b49]">4</div>
      <div class="relative w-44 md:w-52 mx-5 md:mx-8">
        <div
          class="circle absolute -bottom-16 left-0 rounded-[50%] w-36 md:w-44 h-40 md:h-48 bg-[#293b49]"
        ></div>
        <div
          class="circle absolute -bottom-8 left-8 rounded-[50%] w-20 md:w-28 h-24 md:h-32 bg-white"
        ></div>
        <div
          class="clip absolute left-1/2 -bottom-[3.8rem] -translate-x-1/2 overflow-hidden w-48 md:w-[13.5rem] h-52 md:h-56"
        >
          <div class="paper">
            <div class="face">
              <div class="eyes">
                <div class="eye eye-left"></div>
                <div class="eye eye-right"></div>
              </div>
              <div class="rosyCheeks rosyCheeks-left"></div>
              <div class="rosyCheeks rosyCheeks-right"></div>
              <div class="mouth"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="font-bold text-8xl md:text-9xl text-[#293b49]">4</div>
    </div>

    <div class="text mt-20 text-2xl text-[#293b49]">
      {{ message }}
    </div>
    <NuxtLink
      to="/"
      class="button mt-10 py-2 px-5 text-white bg-cyan-900 hover:bg-cyan-950 transition-all duration-500 ease-linear"
    >
      باز گشت به صفحه اصلی</NuxtLink
    >
  </div>
</template>
<script setup>
defineProps({
  message: {
    type: String,
    default: "صفحه مورد نظر یافت نشد....",
  },
});
</script>
