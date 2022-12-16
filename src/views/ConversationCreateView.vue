<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Conversation create</h1>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useRouteStore } from "../stores";

import { computed } from "vue";

const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingFriends);
</script>

<style scoped></style>
