<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Conversation List</h1>
        <ul>
          <li
            v-for="conversation in conversationStore.conversations"
            :key="conversation.id"
          >
            <div>
              {{ conversation }}
            </div>

            <div>
              <ul>
                <li>
                  <RouterLink
                    :to="{
                      name: 'conversation-item',
                      params: {
                        conversationId: conversation.id,
                      },
                    }"
                  >
                    Show conversation
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    :to="{
                      name: 'message-list',
                      params: {
                        conversationId: conversation.id,
                      },
                    }"
                  >
                    Open Messages
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    :to="{
                      name: 'participant-list',
                      params: {
                        conversationId: conversation.id,
                      },
                    }"
                  >
                    Open Participants
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    :to="{
                      name: 'conversation-media',
                      params: {
                        conversationId: conversation.id,
                      },
                    }"
                  >
                    Open Medias
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useConversationStore, useRouteStore } from "../stores";

import { RouterLink } from "vue-router";
import { computed } from "vue";

const conversationStore = useConversationStore();
const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingConversations);
</script>

<style scoped></style>
