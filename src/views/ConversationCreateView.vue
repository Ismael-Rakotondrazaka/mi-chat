<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ConversationCreateViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation
          class="w-full max-w-md sticky top-0 bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Create group chat</HeaderText>
        </div>

        <CreateConversation class="w-full max-w-md" />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CreateConversation from "../components/conversations/CreateConversation.vue";
import ConversationCreateViewLoader from "../components/loaders/ConversationCreateViewLoader.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import { useRouteStore, useMetaStore } from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const routeStore = useRouteStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(() => routeStore.isSettingFriends);

watch(
  () => route.name === "conversation-create",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Create group chat";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
