<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <div>Loading...</div>
    </template>

    <template #default>
      <div>
        <h1>Conversation Item</h1>
        <div>
          <div>{{ conversationOpenedStore.conversation }}</div>
          <ul>
            <li>
              <RouterLink
                :to="{
                  name: 'conversation-edit',
                  params: {
                    conversationId: conversationOpenedStore.id,
                  },
                }"
                >Edit Conversation</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{
                  name: 'participant-create',
                  params: {
                    conversationId: conversationOpenedStore.id,
                  },
                }"
                >Create Participant</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useConversationOpenedStore, useRouteStore } from "../stores";

import { RouterLink } from "vue-router";
import { computed } from "vue";

const conversationOpenedStore = useConversationOpenedStore();
const routeStore = useRouteStore();

const isLoading = computed(
  () =>
    routeStore.isSettingConversations || routeStore.isSettingConversationOpened
);
</script>

<style scoped></style>
