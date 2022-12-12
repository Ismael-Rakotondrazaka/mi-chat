import { axios } from "../services/axios";
import { conversationCollection, conversationResource } from "../resources";
import {
  destroyConversationHandler,
  storeConversationHandler,
  updateConversationHandler,
} from "../events";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useConversationStore = defineStore("conversation", () => {
  const conversations = ref([]);

  const hasConversations = computed(() => conversations.value.length > 0);

  const unreadMessagesCount = computed(() =>
    conversations.value.reduce(
      (prev, curr) => prev + curr.unreadMessagesCount,
      0
    )
  );

  const setConversations = async () => {
    const axiosResponseData = (
      await axios({
        url: "/conversations",
        method: "GET",
      })
    ).data;

    conversations.value = conversationCollection(
      axiosResponseData.data.conversations
    ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  };

  const indexConversation = async ({ params }) => {
    const axiosResponseData = (
      await axios({
        url: "/conversations",
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      conversations: conversationCollection(
        axiosResponseData.data.conversations
      ),
    };
  };

  const showConversation = async ({ conversationId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}`,
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      conversation: conversationResource(axiosResponseData.data.conversation),
    };
  };

  const storeConversation = async ({ data, params, headers }) => {
    const axiosResponseData = await axios({
      url: "/conversations",
      method: "POST",
      data: data,
      headers: headers,
      params: params,
    });

    storeConversationHandler(axiosResponseData);
  };

  const addOrUpdateConversation = (conversation) => {
    const found = conversations.value.find(
      (value) => value.id === conversation.id
    );

    if (found) {
      for (const key in conversation) {
        if (Object.hasOwnProperty.call(conversation, key)) {
          found[key] = conversation[key];
        }
      }
    } else {
      conversations.value.unshift(conversation);
    }

    conversations.value.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  };

  const removeConversation = ({ conversationId }) => {
    const index = conversations.value.findIndex(
      (conversation) => conversation.id === conversationId
    );

    if (index >= 0) {
      conversations.value.splice(index, 1);
    }
  };

  const updateConversation = async ({
    conversationId,
    data,
    params,
    headers,
  }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}`,
        method: "PUT",
        data: data,
        params: params,
        headers: headers,
      })
    ).data;

    updateConversationHandler(axiosResponseData);
  };

  const destroyConversation = async ({ conversationId }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}`,
        method: "DELETE",
      })
    ).data;

    destroyConversationHandler(axiosResponseData);
  };

  const resetStore = () => {
    conversations.value = [];
  };

  return {
    conversations,
    hasConversations,
    unreadMessagesCount,
    indexConversation,
    storeConversation,
    showConversation,
    setConversations,
    addOrUpdateConversation,
    removeConversation,
    updateConversation,
    destroyConversation,
    resetStore,
  };
});
