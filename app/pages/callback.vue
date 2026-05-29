<script setup>
definePageMeta({
  layout: false
})
const route = useRoute()
const router = useRouter()
const base = useRuntimeConfig();

const { data, error, pending } = await useFetch(() => `${base.public.apiBaseUrl}/callback`, {
  query: {
    payable_id: route.query.payable_id,
    success: route.query.success,
    type: route.query.type
  }
})
if (route.query.type === 'order') {
  router.push(`/orders/${route.query.payable_id}`)
}
else if (route.query.type === 'deposit') {
  router.push(`/panel/wallet`)
}
else if (route.query.type === 'orderUpdater ') {
  router.push(`/panel/orderList?status=all`)
} else {
  router.push(`/`)
}
</script>

<template>
  <section class="flex items-center p-3 overflow-hidden" v-if="false">
    😂😂😂 الکی مثلا من یه صفحه بزرگم
  </section>
</template>

<style scoped>
section {
  height: 100vh;
}

:is(h6, span) {
  font-weight: bold;
  color: #07bc0c;
}

ul {
  border-right: 3px solid rgba(0, 0, 0, 0.1);
}
</style>
