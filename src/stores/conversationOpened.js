import { axios } from "@/services/axios";
import { conversationResource } from "../resources";
import { updateParticipantHandler } from "../events";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useConversationOpenedStore = defineStore(
  "conversationOpened",
  () => {
    const conversation = ref(null);

    const hasConversationOpened = computed(() => !!conversation.value);

    const id = computed(() =>
      hasConversationOpened.value ? conversation.value.id : 0
    );

    const is = computed(
      () => (conversationId) =>
        hasConversationOpened.value && conversation.value.id === conversationId
    );

    const isConverser = computed(
      () => (userId) =>
        hasConversationOpened.value &&
        type.value === "personal" &&
        conversation.value.converser.id === userId
    );

    const type = computed(() =>
      hasConversationOpened.value ? conversation.value.type : null
    );

    const participation = computed(() =>
      hasConversationOpened.value ? conversation.value.participation : null
    );

    const converser = computed(() =>
      type.value === "personal" ? conversation.value.converser : null
    );

    const messages = ref([]);

    const medias = computed(() =>
      messages.value.filter((message) =>
        ["image", "video", "file"].includes(message.type)
      )
    );

    const latestMessage = computed(() =>
      messages.value.length > 0
        ? messages.value[0]
        : hasConversationOpened.value
        ? conversation.value.latestMessage
        : null
    );

    const addMessage = (message) => {
      const index = messages.value.findIndex(
        (value) => value.id === message.id
      );

      if (index < 0) {
        messages.value = messages.value
          .concat(message)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
    };

    const removeMessage = ({ messageId }) => {
      const index = messages.value.findIndex(
        (message) => message.id === messageId
      );

      if (index < 0) {
        messages.value.splice(index, 1);
      }
    };

    const participants = ref([]);

    const addOrUpdateParticipant = (participant) => {
      const found = participants.value.find(
        (value) => value.id === participant.id
      );

      if (found) {
        for (const key in participant) {
          if (Object.hasOwnProperty.call(participant, key)) {
            found[key] = participant[key];
          }
        }
      } else {
        participants.value = participants.value
          .concat(participant)
          .sort((a, b) => a.name.full.localeCompare(b.name.full));
      }
    };

    const removeParticipant = ({ userId }) => {
      const index = participants.value.findIndex(
        (value) => value.id === userId
      );

      if (index >= 0) {
        participants.value.splice(index, 1);
      }
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

    const setConversation = async ({ conversationId, params }) => {
      const axiosResponseData = (
        await axios({
          url: `/conversations/${conversationId}`,
          method: "GET",
          params: params,
        })
      ).data;

      conversation.value = conversationResource(
        axiosResponseData.data.conversation
      );
    };

    const updateConversation = (conversationUpdates) => {
      for (const key in conversationUpdates) {
        if (Object.hasOwnProperty.call(conversationUpdates, key)) {
          conversation.value[key] = conversationUpdates[key];
        }
      }
    };

    const setParticipants = async ({ conversationId, params }) => {
      const axiosResponseData = (
        await axios({
          url: `/conversations/${conversationId}/participants`,
          method: "GET",
          params: params,
        })
      ).data;

      participants.value = axiosResponseData.data.participants
        .map((participant) => {
          participant.createdAt = new Date(participant.createdAt);
          participant.participation.createdAt = new Date(
            participant.participation.createdAt
          );

          if (participant.friendship.isFriend) {
            participant.friendship.createdAt = new Date(
              participant.friendship.createdAt
            );
          }

          return participant;
        })
        .sort((a, b) => a.name.full.localeCompare(b.name.full)); // ASC order
    };

    const setMessages = async ({ conversationId, params }) => {
      const axiosResponseData = (
        await axios({
          url: `/conversations/${conversationId}/messages`,
          params: params,
        })
      ).data;

      messages.value = axiosResponseData.data.messages
        .map((message) => {
          message.createdAt = new Date(message.createdAt);
          message.sender.createdAt = new Date(message.sender.createdAt);

          if (message.sender.participation) {
            message.sender.participation.createdAt = new Date(
              message.sender.participation.createdAt
            );
          }

          return message;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // DESC order
    };

    const setConversationOpened = async ({ conversationId }) => {
      await Promise.all([
        setConversation({ conversationId }),
        setParticipants({ conversationId }),
        setMessages({ conversationId }),
      ]);
    };

    const resetStore = () => {
      conversation.value = null;
      participants.value = [];
      messages.value = [];
    };

    return {
      conversation: conversation,
      hasConversationOpened,
      is,
      isConverser,
      setConversationOpened,
      setConversation,
      updateConversation,
      type,
      converser,
      participation,
      latestMessage,
      participants,
      setParticipants,
      addOrUpdateParticipant,
      removeParticipant,
      updateParticipant,
      messages,
      medias,
      id,
      setMessages,
      addMessage,
      removeMessage,
      resetStore,
    };
  }
);
