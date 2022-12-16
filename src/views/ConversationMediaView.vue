<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Conversation Media</h1>
        <div>
          <div>
            <h2>Conversation</h2>
            <div>{{ conversationOpenedStore.conversation }}</div>
          </div>
          <div>
            <h2>Medias</h2>
            <ul>
              <li
                v-for="media in conversationOpenedStore.medias"
                :key="media.id"
              >
                {{ media }}
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

import { computed } from "vue";

const conversationOpenedStore = useConversationOpenedStore();
const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingConversationOpened);
</script>

<style scoped></style>
