<template>
  <div>
    <h2 class="sm:text-lg lg:text-2xl font-bold mb-8">
      امتیاز و دیدگاه کاربران
    </h2>
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="w-full lg:w-[250px]">
        <button @click="formModal = true"
          class="flex items-center justify-center lg:justify-start w-full lg:w-fit gap-3 bg-gray-100 border border-gray-400 py-2 px-3 rounded-lg mb-4">
          <p class="flex flex-col">
            <strong class="text-nowrap">ثبت دیدگاه</strong>
            <span class="text-sm text-gray-500 text-nowrap">به عنوان کاربر</span>
          </p>
          <span class="flex">
            <IconsMessage class="size-6" />
          </span>
        </button>
        <p class="text-sm text-gray-500 text-center lg:text-start">
          شمـا هـم دربـاره ایـن کــالا دیــدگاه ثبــت کنید.
        </p>
      </div>
      <div class="grow divide-y divide-gray-300 max-h-[300px] sm:max-h-[400px] overflow-auto">
        <template v-if="comments && comments.length">
          <shareCommentCard v-for="(comment, index) in comments" :key="comment?.id ?? index" :comment="comment" />
        </template>
        <h4 v-else class="text-center">هنوز برای این محصول نظری ثبت نشده</h4>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal @close="formModal = false" v-if="formModal">
        <ProductDetailInformationsUserCommentsForm @close="formModal = false" />
      </Modal>
    </Transition>
  </Teleport>
</template>
<script setup>
let formModal = ref(false);
defineProps({
  comments: Array,
});
</script>
