<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Participant Edit</h1>
        <div>
          <div>
            <h2>Participant</h2>
            {{ participant }}
          </div>
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
import { useRouteStore } from "../stores";
import { useConversationOpenedStore } from "../stores";
import { useRoute } from "vue-router";

import { computed } from "vue";

const routeStore = useRouteStore();
const conversationOpenedStore = useConversationOpenedStore();
const route = useRoute();

const isLoading = computed(() => routeStore.isSettingConversationOpened);

const participantId = computed(() => +route.params.participantId);

const participant = computed(
  () =>
    conversationOpenedStore.participants.find(
      (participant) => participant.id === participantId.value
    ) || null
);
</script>

<style scoped></style>
