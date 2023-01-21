<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ParticipantEditViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation class="w-full max-w-md sticky top-0 bg-sky-50" />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Edit member</HeaderText>
        </div>

        <EditParticipant class="w-full max-w-md" />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import EditParticipant from "../components/participants/EditParticipant.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import ParticipantEditViewLoader from "../components/loaders/ParticipantEditViewLoader.vue";
import {
  useRouteStore,
  useConversationOpenedStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const routeStore = useRouteStore();
const conversationOpenedStore = useConversationOpenedStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(
  () =>
    routeStore.isSettingConversationOpened ||
    !conversationOpenedStore.conversation ||
    !conversationOpenedStore.participant
);

watch(
  () => route.name === "participant-edit",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Edit member";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
