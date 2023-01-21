<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ParticipantListViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation
          class="w-full max-w-xl sticky top-0 bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>{{ headerText }}</HeaderText>
        </div>

        <ParticipantFilter
          class="sticky top-14 w-full bg-sky-50 max-w-xl z-[1]"
        />

        <div class="relative w-full max-w-xl z-[0]">
          <ParticipantList
            :conversation="conversationOpenedStore.conversation"
            :participants="conversationOpenedStore.participantsFiltered"
            class="w-full"
          />
        </div>

        <div class="fixed bottom-7 md:bottom-10 right-[10%]">
          <ButtonUI
            @click="createParticipantHandler"
            status="info"
            class="!rounded-full"
          >
            <fa-icon icon="plus" class="inline-block text-lg" />

            <span class="hidden lg:inline ml-3">Add</span>
          </ButtonUI>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import ParticipantFilter from "../components/participants/ParticipantFilter.vue";
import ParticipantList from "../components/participants/ParticipantList.vue";
import ButtonUI from "../components/ui/ButtonUI.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import ParticipantListViewLoader from "../components/loaders/ParticipantListViewLoader.vue";
import {
  useRouteStore,
  useConversationOpenedStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const routeStore = useRouteStore();
const conversationOpenedStore = useConversationOpenedStore();
const metaStore = useMetaStore();
const router = useRouter();
const route = useRoute();

const isLoading = computed(
  () =>
    routeStore.isSettingConversationOpened ||
    !conversationOpenedStore.hasConversationOpened
);

const headerText = computed(() => {
  let result = "Members list";

  if (conversationOpenedStore.conversation?.type === "group") {
    result = `${conversationOpenedStore.conversation.name}'s members list`;
  }

  return result;
});

const createParticipantHandler = () => {
  router.push({
    name: "participant-create",
    params: {
      conversationId: conversationOpenedStore.conversation.id,
    },
  });
};

watch(
  [() => route.name === "participant-list", headerText],
  ([newRouteName, newHeaderText]) => {
    if (newRouteName && newHeaderText) {
      metaStore.title = `mi-chat | ${newHeaderText}`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
