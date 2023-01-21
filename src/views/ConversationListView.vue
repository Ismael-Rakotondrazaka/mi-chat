<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ConversationListViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3 relative,">
        <CustomNavigation
          class="sticky top-0 w-full max-w-md bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Chats</HeaderText>
        </div>

        <ConversationFilter
          class="sticky w-full max-w-md bg-sky-50 top-14 z-[1]"
        />

        <div class="w-full max-w-md relative z-[0]">
          <ConversationList
            :conversations="conversationStore.conversationsFiltered"
            class="w-full"
          />
        </div>

        <div class="fixed bottom-7 md:bottom-10 right-[10%]">
          <ButtonUI
            @click="createConversationHandler"
            status="info"
            class="!rounded-full"
          >
            <fa-icon icon="plus" class="inline-block text-lg" />

            <span class="hidden lg:inline ml-3">New</span>
          </ButtonUI>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import ConversationListViewLoader from "../components/loaders/ConversationListViewLoader.vue";
import CustomLayout from "../components/commons/CustomLayout.vue";
import ConversationList from "../components/conversations/ConversationList.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import ConversationFilter from "../components/conversations/ConversationFilter.vue";
import ButtonUI from "../components/ui/ButtonUI.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import { useConversationStore, useRouteStore, useMetaStore } from "../stores";

import { computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const conversationStore = useConversationStore();
const routeStore = useRouteStore();
const metaStore = useMetaStore();
const router = useRouter();
const route = useRoute();

const isLoading = computed(() => routeStore.isSettingConversations);

const createConversationHandler = () => {
  router.push({
    name: "conversation-create",
  });
};

watch(
  () => route.name === "conversation-list",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Chats";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
