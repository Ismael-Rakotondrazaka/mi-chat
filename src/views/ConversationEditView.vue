<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ConversationEditViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation class="w-full max-w-md sticky top-0 bg-sky-50" />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Edit chat</HeaderText>
        </div>

        <EditConversation class="w-full max-w-md" />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import EditConversation from "../components/conversations/EditConversation.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import ConversationEditViewLoader from "../components/loaders/ConversationEditViewLoader.vue";
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
    routeStore.isSettingConversations ||
    routeStore.isSettingConversationOpened ||
    !conversationOpenedStore.conversation
);

watch(
  [
    () => route.name === "conversation-edit",
    () => conversationOpenedStore.conversation?.name,
  ],
  ([newRouteName, newGroupName]) => {
    if (newRouteName && newGroupName) {
      metaStore.title = `mi-chat | Edit ${newGroupName} group chat`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
