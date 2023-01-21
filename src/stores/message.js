import { defineStore } from "pinia";
import { destroyMessageHandler, storeMessageHandler } from "../events";
import { axios } from "../services/axios";

export const useMessageStore = defineStore("message", () => {
  const storeMessage = async ({ conversationId, data, params, headers }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/messages`,
        method: "POST",
        data: data,
        params: params,
        headers: headers,
      })
    ).data;

    storeMessageHandler(axiosResponseData);
  };

  const destroyMessage = async ({
    conversationId,
    messageId,
    params,
    headers,
  }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/messages/${messageId}`,
        method: "DELETE",
        params: params,
        headers: headers,
      })
    ).data;

    destroyMessageHandler(axiosResponseData);
  };

  const resetStore = () => {};

  return {
    storeMessage,
    destroyMessage,
    resetStore,
  };
});
