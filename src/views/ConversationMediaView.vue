<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ConversationMediaViewLoader />
    </template>

    <template #default>
      <div class="w-full p-3">
        <div class="flex flex-col items-center w-full">
          <CustomNavigation class="w-full max-w-md top-0 bg-sky-50" />

          <div class="mt-3 mb-10">
            <HeaderText>{{ headerText }}</HeaderText>
          </div>

          <MediaFilter class="w-full max-w-md" />
        </div>

        <MediaList :medias="conversationOpenedStore.mediasFiltered" />

        <MediaModal
          :shown="conversationOpenedStore.showMediaModal"
          @closed="closeMediaModalHandler"
          :medias="conversationOpenedStore.showableMediasFiltered"
        />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import MediaList from "../components/medias/MediaList.vue";
import MediaFilter from "../components/medias/MediaFilter.vue";
import MediaModal from "../components/medias/MediaModal.vue";
import ConversationMediaViewLoader from "../components/loaders/ConversationMediaViewLoader.vue";
import {
  useRouteStore,
  useConversationOpenedStore,
  useUserStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const conversationOpenedStore = useConversationOpenedStore();
const metaStore = useMetaStore();
const routeStore = useRouteStore();
const userStore = useUserStore();
const route = useRoute();

const isLoading = computed(
  () =>
    routeStore.isSettingConversationOpened ||
    !conversationOpenedStore.conversation ||
    !userStore.user
);

const headerText = computed(() => {
  let result = "Medias";

  if (conversationOpenedStore.mediaSender) {
    result = `Medias sent by ${conversationOpenedStore.mediaSender.name.full}`;
  }

  return result;
});

const closeMediaModalHandler = () => {
  conversationOpenedStore.showMediaModal = false;
};

watch(
  [
    () => route.name === "conversation-media",
    () => {
      let result = null;

      if (conversationOpenedStore.conversation) {
        if (conversationOpenedStore.conversation.type === "personal") {
          result = `mi-chat | ${conversationOpenedStore.conversation.converser.name.full} chat medias`;
        } else if (conversationOpenedStore.conversation.type === "group") {
          result = `mi-chat | ${conversationOpenedStore.conversation.name} group chat medias`;
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
