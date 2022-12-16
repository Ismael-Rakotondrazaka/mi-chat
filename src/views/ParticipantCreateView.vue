<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Participant Create</h1>
        <div>
          <h2>Conversation</h2>
          <div>{{ conversationOpenedStore.conversation }}</div>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useRouteStore, useConversationOpenedStore } from "../stores";

import { computed } from "vue";

const routeStore = useRouteStore();
const conversationOpenedStore = useConversationOpenedStore();

const isLoading = computed(
  () => routeStore.isSettingFriends || routeStore.isSettingConversationOpened
);
</script>

<style scoped></style>
