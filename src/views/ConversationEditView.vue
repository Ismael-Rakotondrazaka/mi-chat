<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Conversation Edit</h1>

        <div v-if="routeStore.isSettingConversationOpened">Loading</div>
        <div v-else>
          <div>
            <h2>Conversation</h2>
            <div>{{ conversationOpenedStore.conversation }}</div>
          </div>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useConversationOpenedStore, useRouteStore } from "../stores";

import { computed } from "vue";

const conversationOpenedStore = useConversationOpenedStore();
const routeStore = useRouteStore();

const isLoading = computed(
  () =>
    routeStore.isSettingConversations || routeStore.isSettingConversationOpened
);
</script>

<style scoped></style>
