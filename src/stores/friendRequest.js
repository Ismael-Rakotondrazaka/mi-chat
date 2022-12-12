import { axios } from "@/services/axios";
import { friendRequestCollection } from "@/resources";
import { useFriendStore } from "./friend";
import { useConversationStore } from "./conversation";
import {
  destroyFriendRequestHandler,
  storeFriendRequestHandler,
  storeConversationHandler,
  storeFriendHandler,
} from "../events";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFriendRequestStore = defineStore("friendRequest", () => {
  const friendStore = useFriendStore();
  const conversationStore = useConversationStore();

  const friendRequests = ref([]);

  const hasFriendRequests = computed(() => friendRequests.value.length > 0);

  const is = computed(
    () => (friendRequestId) =>
      hasFriendRequests.value &&
      !!friendRequests.value.find(
        (friendRequest) => friendRequest.id === friendRequestId
      )
  );

  const hasFrom = computed(
    () => (userId) =>
      hasFriendRequests.value &&
      !!friendRequests.value.find(
        (friendRequest) => friendRequest.sender.id === userId
      )
  );

  const resetStore = () => {
    friendRequests.value = [];
  };

  const setFriendRequests = async () => {
    const axiosResponseData = (
      await axios({
        url: "/friendRequests",
        method: "GET",
      })
    ).data;

    friendRequests.value = friendRequestCollection(
      axiosResponseData.data.friendRequests
    ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const addFriendRequest = (friendRequest) => {
    const index = friendRequests.value.findIndex(
      (value) => value.id === friendRequest.id
    );

    if (index < 0) {
      friendRequests.value = friendRequests.value
        .concat(friendRequest)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  };

  const removeFriendRequest = ({ friendRequestId }) => {
    const index = friendRequests.value.findIndex(
      (value) => value.id === friendRequestId
    );

    if (index >= 0) {
      friendRequests.value.splice(index, 1);
    }
  };

  const storeFriendRequest = async ({ data }) => {
    const axiosResponseData = (
      await axios({
        url: "/friendrequests",
        method: "POST",
        data: data,
      })
    ).data;

    storeFriendRequestHandler(axiosResponseData);
  };

  const updateFriendRequest = async ({ friendRequestId }) => {
    const axiosResponseData = (
      await axios({
        url: `/friendrequests/${friendRequestId}`,
        method: "POST",
      })
    ).data;

    destroyFriendRequestHandler({
      data: {
        friendRequest: {
          id: friendRequestId,
        },
      },
    });

    storeFriendHandler(axiosResponseData);

    storeConversationHandler(axiosResponseData);

    const conversationId = axiosResponseData.data.conversation.id;

    const friendData = axiosResponseData.data.user;
    friendData.createdAt = new Date(friendData.createdAt);
    friendData.friendship.createdAt = new Date(friendData.friendship.createdAt);

    friendStore.addFriend(friendData);

    const axiosResponseData2 = (
      await conversationStore.showConversation({ conversationId })
    ).data;

    const conversationData = axiosResponseData2.data.conversation;
    conversationData.createdAt = new Date(conversationData.createdAt);
    conversationData.updatedAt = new Date(conversationData.updatedAt);

    if (conversationData.latestMessage) {
      conversationData.latestMessage.createdAt = new Date(
        conversationData.latestMessage.createdAt
      );
      conversationData.latestMessage.sender.createdAt = new Date(
        conversationData.latestMessage.sender.createdAt
      );
    }

    conversationStore.addOrUpdateConversation(conversationData);
  };

  const destroyFriendRequest = async ({ friendRequestId }) => {
    const axiosResponseData = (
      await axios({
        url: `/friendrequests/${friendRequestId}`,
        method: "DELETE",
      })
    ).data;

    destroyFriendRequestHandler(axiosResponseData);
  };

  return {
    friendRequests,
    is,
    hasFrom,
    hasFriendRequests,
    removeFriendRequest,
    addFriendRequest,
    storeFriendRequest,
    updateFriendRequest,
    destroyFriendRequest,
    setFriendRequests,
    resetStore,
  };
});
