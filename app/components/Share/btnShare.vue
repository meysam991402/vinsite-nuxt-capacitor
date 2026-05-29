<template>
  <button @click="share">
    <IconsShare />
  </button>
</template>
<script setup>
let props = defineProps({
  title: String,
});
function share() {
  if (navigator.share) {
    navigator
      .share({
        title: props?.title ?? "",
        text: "این محصول رو بهت پیشنهاد میکنم",
        url: "https://" + window.location.host + "/products/",
      })
      .then(() => { })
      .catch((error) => console.error(error));
  }
}
</script>
