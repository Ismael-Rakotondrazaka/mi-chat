import { axios } from "../services/axios";
import { conversationCollection, conversationResource } from "../resources";
import {
  destroyConversationHandler,
  storeConversationHandler,
  updateConversationHandler,
  updateParticipantHandler,
  destroyParticipantHandler,
} from "../events";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useConversationStore = defineStore("conversation", () => {
  const conversations = ref([]);

  const typeFilter = ref("type-all");

  const typeAllFilter = () => conversations.value.filter(() => true);

  const typePersonalAllFilter = () =>
    conversations.value.filter(
      (conversation) => conversation.type === "personal"
    );

  const typePersonalFriendFilter = () =>
    conversations.value.filter(
      (conversation) =>
        conversation.type === "personal" &&
        conversation.converser.friendship.isFriend
    );

  const typePersonalNotFriendFilter = () =>
    conversations.value.filter(
      (conversation) =>
        conversation.type === "personal" &&
        !conversation.converser.friendship.isFriend
    );

  const typeGroupAllFilter = () =>
    conversations.value.filter((conversation) => conversation.type === "group");

  const typeGroupMemberFilter = () =>
    conversations.value.filter(
      (conversation) =>
        conversation.type === "group" && !!conversation.participation
    );

  const typeGroupNotMemberFilter = () =>
    conversations.value.filter(
      (conversation) =>
        conversation.type === "group" && !conversation.participation
    );

  const typeFilters = {
    "type-all": typeAllFilter,
    "type-personal-all": typePersonalAllFilter,
    "type-personal-friend": typePersonalFriendFilter,
    "type-personal-not-friend": typePersonalNotFriendFilter,
    "type-group-all": typeGroupAllFilter,
    "type-group-member": typeGroupMemberFilter,
    "type-group-not-member": typeGroupNotMemberFilter,
  };

  const conversationsTypeFiltered = computed(
    () => typeFilters[typeFilter.value]?.() || []
  );

  const orderFilter = ref("order-update-desc");

  const orderUpdateDesc = () =>
    [...conversationsTypeFiltered.value].sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );

  const orderUpdateAsc = () =>
    [...conversationsTypeFiltered.value].sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
    );

  const orderNameAsc = () =>
    [...conversationsTypeFiltered.value].sort((a, b) => {
      const aCompare = a.type === "personal" ? a.converser.name.full : a.name;

      const bCompare = b.type === "personal" ? b.converser.name.full : b.name;

      return aCompare.localeCompare(bCompare);
    });

  const orderNameDesc = () =>
    [...conversationsTypeFiltered.value].sort((a, b) => {
      const aCompare = a.type === "personal" ? a.converser.name.full : a.name;

      const bCompare = b.type === "personal" ? b.converser.name.full : b.name;

      return bCompare.localeCompare(aCompare);
    });

  const orderFilters = {
    "order-update-desc": orderUpdateDesc,
    "order-update-asc": orderUpdateAsc,
    "order-name-asc": orderNameAsc,
    "order-name-desc": orderNameDesc,
  };

  const conversationsOrderFiltered = computed(
    () => orderFilters[orderFilter.value]?.() || []
  );

  const nameFilter = ref("");

  const conversationsFiltered = computed(() =>
    nameFilter.value.length === 0
      ? conversationsOrderFiltered.value
      : conversationsOrderFiltered.value.filter((conversation) => {
          const toCompare =
            conversation.type === "personal"
              ? conversation.converser.name.full.toLowerCase()
              : conversation.name.toLowerCase();

          return new RegExp(nameFilter.value).test(toCompare);
        })
  );

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
    const axiosResponseData = (
      await axios({
        url: "/conversations",
        method: "POST",
        data: data,
        headers: headers,
        params: params,
      })
    ).data;

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

  const updateParticipant = async ({
    conversationId,
    participantId,
    data,
    params,
  }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/participants/${participantId}`,
        method: "POST",
        data: data,
        params: params,
      })
    ).data;

    updateParticipantHandler(axiosResponseData);
  };

  const destroyParticipant = async ({
    conversationId,
    participantId,
    data,
    params,
  }) => {
    const axiosResponseData = (
      await axios({
        url: `/conversations/${conversationId}/participants/${participantId}`,
        method: "DELETE",
        data: data,
        params: params,
      })
    ).data;

    destroyParticipantHandler(axiosResponseData);
  };

  const resetStore = () => {
    conversations.value = [];
    typeFilter.value = "type-all";
    orderFilter.value = "order-update-desc";
    nameFilter.value = "";
  };

  return {
    conversations,
    hasConversations,
    unreadMessagesCount,
    typeFilter,
    orderFilter,
    nameFilter,
    conversationsFiltered,
    indexConversation,
    storeConversation,
    showConversation,
    setConversations,
    addOrUpdateConversation,
    removeConversation,
    updateConversation,
    destroyConversation,
    updateParticipant,
    destroyParticipant,
    resetStore,
  };
});
