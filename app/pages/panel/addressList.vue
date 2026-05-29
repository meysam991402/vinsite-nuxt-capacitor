<template>
  <section>
    <Address title="لیست آدرس ها" typePage="panel" />
    <!-- <div v-if="addresses && addresses.length" class="space-y-4">
    
      <template
        v-for="(address, index) in addresses"
        :key="address?.id ?? index"
      >
        <AddressCard
          :index="index"
          @selectedAddress="selectedAddress"
          :activeBox="activeBox"
          v-if="address"
          :address="address"
        />
      </template>

</div>

<h4 class="mt-2 text-center font-semibold text-sm lg:text-base" v-else>
  اطلاعاتی برای نمایش وجود ندارد
</h4> -->
  </section>
</template>
<script setup>
// let activeBox = ref(null);
// function selectedAddress(address) {

//   activeBox.value = address.id;
// }
</script>
