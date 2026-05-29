<template>
  <div class="w-[90%] sm:w-[500px] rounded-xl py-6 px-4 bg-white">
    <Logo class="w-36 md:w-52 mx-auto" />
    <div class="mt-4 sm:mt-8 w-[90%] mx-auto">
      <LoginRegister
        @changeStep="changeStep"
        @setMobile="setMobile"
        v-if="activeStep.loginRegister"
      />
      <LoginVerifyToken
        @changeStep="changeStep"
        :mobile="mobile"
        v-if="activeStep.verifyToken"
      />
    </div>
  </div>
</template>
<script setup>
let activeStep = ref({
  loginRegister: true,
  verifyToken: false,
});
let mobile = ref("");
function setMobile(phone) {
  mobile.value = phone;
}
function changeStep(step) {
  activeStep.value[step.current] = false;
  activeStep.value[step.next] = true;
}
</script>
