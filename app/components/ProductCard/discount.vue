<template>
  <span v-if="price?.discount != 0"
    class="bg-red-600 px-1.5 font-bold absolute top-2 left-2 pt-0.5 rounded-full rounded-bl-none text-white text-sm">
    <!-- {{
      `${price?.discount ?? ""} ${
        price?.discount_type == "percentage" ? "%" : "تومان"
      }`
    }} -->
    <span v-if="price?.discount_type == 'percentage'">
      {{ `${price?.discount ?? ""} %` }}
    </span>
    <span v-else>
      {{ `${price?.discount.toLocaleString() ?? ""} تومان` }}
    </span>
  </span>
</template>
<script setup>
defineProps({
  price: Object,
});
</script>
