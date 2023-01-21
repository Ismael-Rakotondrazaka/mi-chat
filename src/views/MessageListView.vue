<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <MessageListViewLoader />
    </template>

    <template #default>
      <div>
        <div
          v-if="showConversationList"
          class="fixed top-0 bottom-0 left-[0%] md:left-[20%] md:w-[34.166666%] xl:w-3/12"
        >
          <div class="flex flex-col w-full p-3">
            <SearchBar
              :modelValue="searchText"
              @update:modelValue="(newValue) => (searchText = newValue)"
              placeholder="Search a chat"
              class="w-full"
            />
          </div>

          <div
            class="fixed overflow-y-auto top-20 bottom-0 left-[0%] md:left-[20%] w-[100%] md:w-[34.166666%] xl:w-3/12 px-3"
          >
            <div class="relative w-full">
              <ConversationList :conversations="conversations" />
            </div>
          </div>
        </div>

        <div
          class="fixed top-0 bottom-0 left-[0%] md:left-[20%] lg:left-[54.166666%] xl:left-[45%] right-0"
        >
          <MessageListHeader />

          <div
            class="fixed pt-0 overflow-y-auto overflow-x-hidden top-16 bottom-24 left-[0%] right-0 border border-primary md:left-[20%] lg:left-[54.166666%] xl:left-[45%] scroll-smooth p-3"
            ref="messageArea"
            @scroll="setCanScroll"
          >
            <MessageLoadMore />

            <MessageList
              :messages="conversationOpenedStore.messagesShown"
              :conversationType="conversationOpenedStore.conversation.type"
            />
          </div>

          <div
            v-show="canScroll"
            class="fixed bottom-24 left-[0%] md:left-[20%] lg:left-[54.166666%] xl:left-[45%] right-0 flex flex-row items-center justify-center h-0"
          >
            <div class="relative h-0">
              <button
                @click="
                  () => {
                    scrollToBottom();
                    canScroll = false;
                  }
                "
                class="absolute bottom-0 mb-3 text-3xl text-sky-400"
              >
                <fa-icon icon="circle-down" />
              </button>
            </div>
          </div>

          <div
            class="fixed bottom-0 h-24 p-3 bg-emerald-400 left-[0%] md:left-[20%] lg:left-[54.166666%] xl:left-[45%] right-0"
          >
            <CreateMessage />
          </div>
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import SearchBar from "../components/commons/SearchBar.vue";
import ConversationList from "../components/conversations/ConversationList.vue";
import MessageList from "../components/messages/MessageList.vue";
import CreateMessage from "../components/messages/CreateMessage.vue";
import MessageListHeader from "../components/messages/MessageListHeader.vue";
import MessageLoadMore from "../components/messages/MessageLoadMore.vue";
import MessageListViewLoader from "../components/loaders/MessageListViewLoader.vue";
import {
  useConversationOpenedStore,
  useRouteStore,
  useConversationStore,
  useScreenStore,
  useMetaStore,
} from "../stores";

import { ref, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const conversationOpenedStore = useConversationOpenedStore();
const routeStore = useRouteStore();
const conversationStore = useConversationStore();
const screenStore = useScreenStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(
  () =>
    routeStore.isSettingUser ||
    routeStore.isSettingConversations ||
    routeStore.isSettingConversationOpened ||
    !conversationOpenedStore.conversation
);

const searchText = ref("");

const conversations = computed(() =>
  conversationStore.conversations.filter((conversation) => {
    let toCompare = (
      conversation.type === "group"
        ? conversation.name
        : conversation.converser.name.full
    ).toLowerCase();

    return new RegExp(searchText.value.trim().toLowerCase()).test(toCompare);
  })
);

const messageArea = ref(null);

const canScroll = ref(true);

const setCanScroll = () => {
  nextTick(() => {
    if (messageArea.value) {
      canScroll.value =
        messageArea.value.scrollTop !== messageArea.value.scrollTopMax;
    }
  });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageArea.value) {
      messageArea.value.scrollTop = messageArea.value.scrollHeight;
    }
  });
};

const showConversationList = computed(() => screenStore.width >= 1024);

watch(
  () => conversationOpenedStore.messagesShown,
  (newValue, oldValue) => {
    const newLatestMessage = newValue[newValue.length - 1] || null;

    const oldLatestMessage = oldValue[oldValue.length - 1] || null;

    if (
      newLatestMessage &&
      oldLatestMessage &&
      newLatestMessage.id !== oldLatestMessage.id &&
      newLatestMessage.createdAt.getTime() >
        oldLatestMessage.createdAt.getTime() &&
      messageArea.value &&
      (messageArea.value.scrollTopMax === messageArea.value.scrollTop ||
        messageArea.value.scrollTopMax - messageArea.value.scrollTop < 100)
    ) {
      scrollToBottom();
    }
  },
  {
    flush: "post",
  }
);

watch(
  [
    () => route.name === "message-list",
    () => {
      let result = null;

      if (conversationOpenedStore.conversation) {
        if (conversationOpenedStore.conversation.type === "personal") {
          result = conversationOpenedStore.conversation.converser.name.full;
        } else if (conversationOpenedStore.conversation.type === "group") {
          result = conversationOpenedStore.conversation.name;
        }
      }

      return result;
    },
  ],
  ([newRouteName, newConversationName]) => {
    if (newRouteName && newConversationName) {
      metaStore.title = `mi-chat | ${newConversationName} messages`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
