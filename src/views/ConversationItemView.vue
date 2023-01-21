<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ProfileItemViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation class="w-full max-w-md sticky top-0 bg-sky-50" />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>{{ headerText }}</HeaderText>
        </div>

        <ConversationProfileItem
          class="w-full max-w-md"
          :id="conversationOpenedStore.conversation.id"
          :type="conversationOpenedStore.conversation.type"
          :name="conversationOpenedStore.conversation.name"
          :imageUrl="conversationOpenedStore.conversation.imageUrl"
          :description="conversationOpenedStore.conversation.description"
          :createdAt="conversationOpenedStore.conversation.createdAt"
          :updatedAt="conversationOpenedStore.conversation.updatedAt"
          :converser="conversationOpenedStore.conversation.converser || null"
          :participation="conversationOpenedStore.conversation.participation"
          :participants="conversationOpenedStore.participants"
          :sharedMediasCount="conversationOpenedStore.mediasCount"
        />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import ConversationProfileItem from "../components/conversations/ConversationProfileItem.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import ProfileItemViewLoader from "../components/loaders/ProfileItemViewLoader.vue";
import {
  useConversationOpenedStore,
  useRouteStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const conversationOpenedStore = useConversationOpenedStore();
const routeStore = useRouteStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(
  () =>
    !conversationOpenedStore.hasConversationOpened ||
    routeStore.isSettingConversations ||
    routeStore.isSettingConversationOpened
);

const headerText = computed(() => {
  let result = "Chat";

  if (conversationOpenedStore.conversation?.type === "group") {
    result = "Group chat";
  }

  return result;
});

watch(
  [
    () => route.name === "conversation-item",
    () => {
      let result = null;

      if (conversationOpenedStore.conversation) {
        if (conversationOpenedStore.conversation.type === "personal") {
          result = `mi-chat | ${conversationOpenedStore.conversation.converser.name.full} chat`;
        } else if (conversationOpenedStore.conversation.type === "group") {
          result = `mi-chat | ${conversationOpenedStore.conversation.name} group chat`;
        }
      }

      return result;
    },
  ],
  ([newRouteName, newTitle]) => {
    if (newRouteName && newTitle) {
      metaStore.title = newTitle;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
