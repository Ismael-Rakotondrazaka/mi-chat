import { axios } from "../services/axios";
import { participantCollection, participantResource } from "../resources";

import { defineStore } from "pinia";
import { storeParticipantHandler, updateParticipantHandler } from "../events";

export const useParticipantStore = defineStore("participant", () => {
  const indexParticipant = async ({ conversationId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/participants`,
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      participants: participantCollection(axiosResponseData.data.participants),
    };
  };

  const showParticipant = async ({ conversationId, participantId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/participants/${participantId}`,
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      participant: participantResource(axiosResponseData.data.participant),
    };
  };

  const storeParticipant = async ({ conversationId, data, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/participants`,
        method: "POST",
        data: data,
        params: params,
      })
    ).data;

    storeParticipantHandler(axiosResponseData);
  };

  const updateParticipant = async ({
    conversationId,
    participantId,
    data,
    headers,
    params,
  }) => {
    const axiosDataResponse = (
      await axios({
        url: `/conversations/${conversationId}/participants/${participantId}`,
        method: "PUT",
        data: data,
        params: params,
        headers: headers,
      })
    ).data;

    updateParticipantHandler(axiosDataResponse);
  };

  const resetStore = () => {};

  return {
    indexParticipant,
    resetStore,
    showParticipant,
    storeParticipant,
    updateParticipant,
  };
});
