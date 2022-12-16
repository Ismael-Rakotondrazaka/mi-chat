<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Participant List</h1>
        <div>
          <h2>Conversation</h2>
          <div>{{ conversationOpenedStore.conversation }}</div>
        </div>
        <div>
          <h2>Participants</h2>
          <div>
            <ul>
              <li
                v-for="participant in conversationOpenedStore.participants"
                :key="participant.id"
              >
                <div>
                  {{ participant }}
                </div>
                <div>
                  <ul>
                    <li>
                      <RouterLink
                        :to="{
                          name: 'participant-edit',
                          params: {
                            conversationId:
                              conversationOpenedStore.conversation?.id || 0,
                            participantId: participant.id,
                          },
                        }"
                      >
                        Edit participant
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useRouteStore, useConversationOpenedStore } from "../stores";

import { RouterLink } from "vue-router";
import { computed } from "vue";

const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingConversationOpened);

const conversationOpenedStore = useConversationOpenedStore();
</script>

<style scoped></style>
