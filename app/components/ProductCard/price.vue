<template>
  <p
    class="flex items-center gap-1 justify-center text-sm md:text-base text-nowrap flex-wrap"
  >
    <template v-if="price?.discount != 0">
      <s class="text-gray-700">{{ price?.base_amount?.toLocaleString() }}</s>
      <span class="flex gap-1.5">
        <ProductCardDiscount
          class="static!"
          :price="price"
          v-if="price && price?.discount != 0 && them != 'card'"
        />
        <ins class="text-red-600">{{ price?.amount?.toLocaleString() }}</ins>
        <span class="felx">
          <IconsToman />
        </span>
      </span>
    </template>
    <template v-else>
      <span class="text-red-600">
        {{ price?.amount?.toLocaleString() }}
      </span>
      <span class="felx">
        <IconsToman />
      </span>
    </template>
  </p>
</template>
<script setup>
defineProps({
  price: Object,
  them: {
    type: String,
    default: "card",
  },
});
</script>
