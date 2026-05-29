<template>
  <section
    class="w-[90%] sm:w-[500px] md:w-[600px] max-h-10/12 overflow-auto rounded-xl p-6 bg-white"
  >
    <div
      class="flex justify-between items-center pb-2 border-b-1 border-b-neutral-200"
    >
      <span class="textbase font-bold"> جزییات رنگ ها </span>
      <button type="button" @click="emit('close')">
        <IconsDeleted />
      </button>
    </div>
    <div class="flex flex-col gap-3 pt-4 py-2">
      <div
        class="w-full flex flex-col gap-1"
        v-for="(color, index) in colorsRange"
        :key="color?.id ?? index"
      >
        <div class="flex gap-1 items-center">
          <figure class="border-1 border-gray-300 h-9 w-9 flex p-1 rounded-lg">
            <NuxtImg
              format="webp"
              loading="lazy"
              decoding="async"
              :src="color?.logo?.url ?? ''"
              class="w-full"
              :alt="color?.title ?? ''"
            />
          </figure>
          <span class="text-sm"> {{ color?.title ?? "" }} </span>
        </div>
        <p class="text-base text-neutral-700">
          {{ color?.description ?? "" }}
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
const emit = defineEmits("close");
defineProps({
  colorsRange: Object,
});
</script>
