<template>
  <article v-if="comment" class="bg-white p-4 flex flex-col gap-1.5">
    <div class="flex items-center justify-between">
      <p class="text-gray-500 text-sm" v-if="comment?.show_name != 1">
        {{
          comment?.customer?.first_name || comment?.customer?.last_name
            ? comment?.customer?.first_name + " " + comment?.customer?.last_name
            : " کاربر"
        }}
      </p>
      <div>
        <div v-if="comment?.rate" class="flex gap-1">
          <span v-for="rate in +comment?.rate" :key="`rate_${rate}`">
            <IconsSelecteStar />
          </span>
          <template v-if="+comment?.rate < 5">
            <span v-for="rate in 5 - +comment?.rate" :key="`rate_${rate}`">
              <IconsUnSelecteStar />
            </span>
          </template>
          <time
            :datetime="comment?.created_at ?? ''"
            v-if="comment?.created_at"
            class="text-gray-500 mr-4"
          >
            {{ new Date(comment?.created_at).toLocaleDateString("fa-IR") }}
          </time>
        </div>
      </div>
    </div>
    <h3 v-if="comment?.title" class="font-bold text-[15px] md:text-base">
      {{ comment?.title }}
    </h3>
    <p v-if="comment?.body" class="text-sm text-justify">
      {{ comment?.body }}
    </p>
  </article>
</template>
<script setup>
defineProps({
  comment: Object,
});
</script>
