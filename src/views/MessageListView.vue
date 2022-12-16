<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Messages</h1>

        <div>
          <div>
            <h2>Conversation</h2>
            <div>
              <div>{{ conversationOpenedStore.conversation }}</div>
              <div>
                <RouterLink
                  :to="{
                    name: 'conversation-edit',
                    params: {
                      conversationId:
                        conversationOpenedStore.conversation?.id || 0,
                    },
                  }"
                  >Edit Conversation</RouterLink
                >
              </div>
            </div>
          </div>

          <div>
            <h2>Messages</h2>
            <div>
              <ul>
                <li
                  v-for="message in conversationOpenedStore.messages"
                  :key="message.id"
                >
                  {{ message }}
                </li>
              </ul>
            </div>
          </div>
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
    routeStore.isSettingUser ||
    routeStore.isSettingConversations ||
    routeStore.isSettingConversationOpened
);
</script>

<style scoped></style>
