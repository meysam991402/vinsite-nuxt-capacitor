<template>
  <table
    class="table-fixed w-full"
    v-if="specifications && specifications.length"
  >
    <tbody>
      <tr
        v-for="(item, index) in specifications"
        :key="item?.id ?? index"
        class="odd:bg-gray-200 text-sm md:text-base"
      >
        <th class="p-3">
          {{ item?.label ?? "" }}
        </th>
        <td class="p-3 text-gray-700">
          {{ item?.values.toString() }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
defineProps({
  specifications: Array,
});
let rows = ref([
  { title: "وزن", value: "40 کیلوگرم", id: 1 },
  { title: "رنگ", value: "آبی, قرمز, مشکی", id: 2 },
  { title: "گارانتی", value: "25 روزه", id: 3 },
  { title: "بلندگو", value: "استریو", id: 4 },
  { title: "تراکم پیکسلی", value: "۴۶۰ پیکسل بر اینچ", id: 5 },
  { title: "تعداد سیم کارت", value: "تک سیم کارت", id: 6 },
]);
</script>
