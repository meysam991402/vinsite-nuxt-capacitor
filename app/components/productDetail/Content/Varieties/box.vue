<template>
  <button
    class="min-w-14 min-h-14 grid place-items-center rounded-full border border-solid border-gray-500 overflow-hidden text-sm"
  >
    {{ attribute?.title ?? "" }}
  </button>
</template>
<script setup>
defineProps({
  attribute: Object,
});
</script>
