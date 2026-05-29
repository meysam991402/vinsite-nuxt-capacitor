<template>
  <div v-if="data?.last_page > 1" class="paginate flex justify-center mt-8">
    <Paginate
      v-model="currentPage"
      :page-count="data.last_page"
      :page-range="3"
      :initial-page="currentPage"
      :click-handler="changePage"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination-list'"
      :hide-prev-next="true"
      :disabled-class="disabled"
    >
    </Paginate>
  </div>
</template>
<script setup>
import Paginate from "vuejs-paginate-next";
const { addQuery } = useAddQuery();
let route = useRoute();
defineProps({
  data: Object,
});
const currentPage = ref(route.query.page || 1);
function changePage(activePage) {
  addQuery({ page: activePage });
}
onMounted(() => {
  currentPage.value = route.query.page || 1;
});
</script>
