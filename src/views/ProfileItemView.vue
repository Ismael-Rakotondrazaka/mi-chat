<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <h1>Profile Item</h1>
      <div>
        {{ profileOpenedStore.user }}
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useProfileOpenedStore, useRouteStore } from "../stores";

import { computed } from "vue";

const profileOpenedStore = useProfileOpenedStore();
const routeStore = useRouteStore();

const isLoading = computed(
  () => routeStore.isSettingUser || routeStore.isSettingProfileOpened
);
</script>

<style scoped></style>
