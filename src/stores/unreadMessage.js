import { useConversationStore } from "./conversation";
import { axios } from "../services/axios";
import { destroyUnreadMessageHandler } from "../events";

import { defineStore } from "pinia";
import { computed } from "vue";

export const useUnreadMessageStore = defineStore("unreadMessage", () => {
  const conversationStore = useConversationStore();

  const unreadMessagesCount = computed(() =>
    conversationStore.conversations.reduce(
      (prev, curr) => prev + curr.unreadMessagesCount,
      0
    )
  );

  const destroyUnreadMessage = async ({ conversationId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/unreadmessages`,
        method: "DELETE",
        params: params,
      })
    ).data;

    destroyUnreadMessageHandler(axiosResponseData);
  };

  const resetStore = () => {};

  return {
    unreadMessagesCount,
    destroyUnreadMessage,
    resetStore,
  };
});
