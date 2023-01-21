import { axios } from "@/services/axios";
import {
  conversationResource,
  participantCollection,
  messageCollection,
  participantResource,
} from "../resources";
import { useUnreadMessageStore } from "./unreadMessage";

import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useConversationOpenedStore = defineStore(
  "conversationOpened",
  () => {
    const unreadMessageStore = useUnreadMessageStore();

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

    // participant opened
    const participant = ref(null);

    const setParticipant = async ({
      conversationId,
      participantId,
      params,
    }) => {
      const axiosResponseData = (
        await axios({
          url: `/conversations/${conversationId}/participants/${participantId}`,
          method: "GET",
          params: params,
        })
      ).data;

      participant.value = participantResource(
        axiosResponseData.data.participant
      );
    };

    const updateParticipant = (participantUpdates) => {
      if (participantUpdates.value) {
        for (const key in participantUpdates) {
          if (Object.hasOwnProperty.call(participantUpdates, key)) {
            participant.value = participantUpdates[key];
          }
        }
      } else {
        participant.value = participantUpdates;
      }
    };

    const participation = computed(() =>
      hasConversationOpened.value ? conversation.value.participation : null
    );

    const converser = computed(() =>
      type.value === "personal" ? conversation.value.converser : null
    );

    const messages = ref([]);

    const messageOpenedId = ref(0);

    const initialMessageShownCount = 10; // 5
    const messageShownStep = 10;

    const messageShownCount = ref(initialMessageShownCount);

    const medias = computed(() =>
      messages.value.filter((message) =>
        ["image", "video", "file"].includes(message.type)
      )
    );

    const mediaSenders = computed(() => {
      let result = [];

      const senderIds = new Set();

      medias.value.forEach((media) => {
        if (!senderIds.has(media.sender.id)) {
          result.push(media.sender);
          senderIds.add(media.sender.id);
        }
      });

      return result;
    });

    const mediaTypeFilter = ref("media-type-all");
    const mediaTypeAllFilter = () => medias.value.filter(() => true);

    const mediaTypeImageFilter = () =>
      medias.value.filter((media) => media.type === "image");
    const mediaTypeVideoFilter = () =>
      medias.value.filter((media) => media.type === "video");
    const mediaTypeFileFilter = () =>
      medias.value.filter((media) => media.type === "file");
    const mediaTypeFilters = {
      "media-type-all": mediaTypeAllFilter,
      "media-type-image": mediaTypeImageFilter,
      "media-type-video": mediaTypeVideoFilter,
      "media-type-file": mediaTypeFileFilter,
    };
    const mediaTypeFiltered = computed(
      () => mediaTypeFilters[mediaTypeFilter.value]?.() || []
    );

    const mediaOrderFilter = ref("media-order-desc");
    const mediaOrderDescFilter = () => [...mediaTypeFiltered.value].reverse(); // the array is already sorted in asc
    const mediaOrderAscFilter = () => [...mediaTypeFiltered.value];
    const mediaOrderFilters = {
      "media-order-desc": mediaOrderDescFilter,
      "media-order-asc": mediaOrderAscFilter,
    };
    const mediaOrderFiltered = computed(
      () => mediaOrderFilters[mediaOrderFilter.value]?.() || []
    );

    const mediaSenderNameFilter = ref("");
    const mediaSenderFiltered = computed(() =>
      mediaSenderNameFilter.value.length === 0
        ? []
        : mediaSenders.value.filter((sender) => {
            const toCompare = sender.name.full.toLowerCase();

            return new RegExp(mediaSenderNameFilter.value).test(toCompare);
          })
    );

    const mediaSenderId = ref(0);

    const mediaSender = computed(
      () =>
        mediaSenders.value.find(
          (sender) => sender.id === mediaSenderId.value
        ) || null
    );

    const mediasFiltered = computed(() =>
      mediaSenderId.value !== 0
        ? mediaOrderFiltered.value.filter(
            (media) => media.sender.id === mediaSenderId.value
          )
        : mediaOrderFiltered.value
    );

    const showableMediasFiltered = computed(() =>
      mediasFiltered.value.filter((media) =>
        ["image", "video"].includes(media.type)
      )
    );

    const isMasonryLayout = ref(true);
    const showMediaModal = ref(false);
    const mediaSwiper = ref(null);
    const mediaOpenedId = ref(0);

    watch(mediaOpenedId, (newValue) => {
      if (mediaSwiper.value) {
        const index = showableMediasFiltered.value.findIndex(
          (media) => media.id === newValue
        );

        mediaSwiper.value.slideTo(index, 500, false);
      }
    });

    const openMedia = (mediaId) => {
      showMediaModal.value = true;
      mediaOpenedId.value = mediaId;
    };

    const messagesShown = computed(() =>
      messages.value.slice(messageShownCount.value * -1)
    );

    const firstMessageOfDays = computed(() => {
      let result = [];

      messagesShown.value.forEach((message, index, arr) => {
        const a = message.createdAt.toDateString();
        let b;

        if (index !== 0) {
          b = arr[index - 1].createdAt.toDateString();
        }

        if (index === 0 || a !== b) {
          result.push(message.id);
        }
      });

      return result;
    });

    const canShowMoreMessages = computed(
      () => messages.value.length > messageShownCount.value
    );

    const showMoreMessages = () => {
      if (canShowMoreMessages.value) {
        messageShownCount.value += messageShownStep;
      }
    };

    const toggleMessage = (messageId) => {
      let messageToOpenId = 0;

      if (messageId === messageOpenedId.value) {
        const latest = messagesShown.value[messagesShown.value.length - 1];

        if (latest) {
          messageToOpenId = latest.id;
        }
      } else {
        messageToOpenId = messageId;
      }

      messageOpenedId.value = messageToOpenId;
    };

    watch(
      () => conversation.value?.id,
      (newValue) => {
        // reset the messageShownCount
        messageShownCount.value = initialMessageShownCount;

        // open the latest message
        const latest = messagesShown.value[messagesShown.value.length - 1];
        messageOpenedId.value = latest ? latest.id : 0;

        // reset the unreadMessagesCount
        if (newValue && /^\d+$/.test(newValue) && newValue > 0) {
          unreadMessageStore.destroyUnreadMessage({
            conversationId: newValue,
          });
        }
      }
    );

    const mediasCount = computed(() => medias.value.length);

    const latestMessage = computed(() =>
      messages.value.length > 0
        ? messages.value[messages.value.length - 1]
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
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      }
    };

    const removeMessage = ({ messageId }) => {
      const index = messages.value.findIndex(
        (message) => message.id === messageId
      );

      if (index >= 0) {
        messages.value.splice(index, 1);
      }
    };

    const participants = ref([]);

    const participantTypeAllFilter = () =>
      participants.value.filter(() => true);

    const participantTypeFriendFilter = () =>
      participants.value.filter((user) => user.friendship.isFriend);

    const participantTypeNotFriendFilter = () =>
      participants.value.filter((user) => !user.friendship.isFriend);

    const participantTypeFilter = ref("participant-type-all");

    const participantTypeFilters = {
      "participant-type-all": participantTypeAllFilter,
      "participant-type-friend": participantTypeFriendFilter,
      "participant-type-not-friend": participantTypeNotFriendFilter,
    };

    const participantsTypeFiltered = computed(
      () => participantTypeFilters[participantTypeFilter.value]?.() || []
    );

    const participantOrderAscFilter = () =>
      [...participantsTypeFiltered.value].sort((a, b) =>
        a.name.full.localeCompare(b.name.full)
      );

    const participantOrderDescFilter = () =>
      [...participantsTypeFiltered.value].sort((a, b) =>
        b.name.full.localeCompare(a.name.full)
      );

    const participantOrderFilters = {
      "participant-order-asc": participantOrderAscFilter,
      "participant-order-desc": participantOrderDescFilter,
    };

    const participantOrderFilter = ref("participant-order-asc");

    const participantsOrderFiltered = computed(
      () => participantOrderFilters[participantOrderFilter.value]?.() || []
    );

    const participantNameFilter = ref("");

    const participantsFiltered = computed(() =>
      participantNameFilter.value.length === 0
        ? participantsOrderFiltered.value
        : participantsOrderFiltered.value.filter((participant) => {
            const toCompare = participant.name.full.toLowerCase();

            return new RegExp(participantNameFilter.value).test(toCompare);
          })
    );

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

      participants.value = participantCollection(
        axiosResponseData.data.participants
      ).sort((a, b) => a.name.full.localeCompare(b.name.full)); // ASC order
    };

    const setMessages = async ({ conversationId, params }) => {
      const axiosResponseData = (
        await axios({
          url: `/conversations/${conversationId}/messages`,
          params: params,
        })
      ).data;

      messages.value = messageCollection(axiosResponseData.data.messages).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      ); // DESC order
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
      messages.value = [];
      participants.value = [];
      participant.value = null;
      isMasonryLayout.value = true;
      showMediaModal.value = false;
      messageShownCount.value = initialMessageShownCount;
      participantTypeFilter.value = "participant-type-all";
      participantOrderFilter.value = "participant-order-asc";
      participantNameFilter.value = "";
      mediaTypeFilter.value = "media-type-all";
      mediaOrderFilter.value = "media-order-desc";
      mediaSenderNameFilter.value = "";
      mediaSenderId.value = 0;
    };

    return {
      // conversation
      conversation: conversation,
      hasConversationOpened,
      is,
      id,
      isConverser,
      setConversationOpened,
      setConversation,
      updateConversation,
      type,
      converser,
      participation,
      latestMessage,

      // participants
      participants,
      participantTypeFilter,
      participantOrderFilter,
      participantNameFilter,
      participantsFiltered,
      participant,
      setParticipant,
      updateParticipant,
      setParticipants,
      addOrUpdateParticipant,
      removeParticipant,

      // messages
      messages,
      messageOpenedId,
      firstMessageOfDays,
      messagesShown,
      messageShownCount,
      canShowMoreMessages,
      toggleMessage,
      showMoreMessages,
      setMessages,
      addMessage,
      removeMessage,

      // medias
      medias,
      mediaSenders,
      showableMediasFiltered,
      mediasCount,
      mediaTypeFilter,
      mediaOrderFilter,
      mediaSenderNameFilter,
      mediaSenderFiltered,
      mediaSenderId,
      mediaSender,
      mediasFiltered,
      isMasonryLayout,
      showMediaModal,
      mediaSwiper,
      openMedia,

      resetStore,
    };
  }
);
