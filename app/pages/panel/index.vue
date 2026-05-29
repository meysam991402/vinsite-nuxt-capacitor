<template>
  <div>
    <ProfileEditInformation
      :profile="profile"
      @openEditInformation="showEditInformation = false"
      v-if="showEditInformation"
    />
    <ProfileInformation
      :loading="loading"
      :profile="profile"
      @openEditInformation="showEditInformation = true"
      v-else
    />
  </div>
</template>
<script setup>
const store = useUserStore();
let profile = computed(() => store.getProfile);
let loading = computed(() => store.getLoading);
let showEditInformation = ref(false);
</script>
