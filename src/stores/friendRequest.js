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

  const friendRequestsCount = computed(() => friendRequests.value.length);

  const hasFriendRequests = computed(() => friendRequestsCount.value > 0);

  const orderNameAscFilter = () =>
    [...friendRequests.value].sort((a, b) =>
      a.sender.name.full.localeCompare(b.sender.name.full)
    );

  const orderNameDescFilter = () =>
    [...friendRequests.value].sort((a, b) =>
      b.sender.name.full.localeCompare(a.sender.name.full)
    );

  const orderSentAscFilter = () =>
    [...friendRequests.value].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

  const orderSentDescFilter = () =>
    [...friendRequests.value].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

  const orderFilter = ref("order-sent-desc");

  const orderFilters = {
    "order-name-asc": orderNameAscFilter,
    "order-name-desc": orderNameDescFilter,
    "order-sent-asc": orderSentAscFilter,
    "order-sent-desc": orderSentDescFilter,
  };

  const friendRequestsOrderFiltered = computed(
    () => orderFilters[orderFilter.value]?.() || []
  );

  const nameFilter = ref("");

  const friendRequestsFiltered = computed(() =>
    nameFilter.value.length === 0
      ? friendRequestsOrderFiltered.value
      : friendRequestsOrderFiltered.value.filter((friendRequest) => {
          const toCompare = friendRequest.sender.name.full.toLowerCase();

          return new RegExp(nameFilter.value).test(toCompare);
        })
  );

  const is = computed(
    () => (friendRequestId) =>
      hasFriendRequests.value &&
      friendRequests.value.some(
        (friendRequest) => friendRequest.id === friendRequestId
      )
  );

  const hasFrom = computed(
    () => (userId) =>
      hasFriendRequests.value &&
      friendRequests.value.some(
        (friendRequest) => friendRequest.sender.id === userId
      )
  );

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
        method: "PUT",
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

  const resetStore = () => {
    friendRequests.value = [];
    orderFilter.value = "order-sent-desc";
    nameFilter.value = "";
  };

  return {
    friendRequests,
    friendRequestsCount,
    is,
    hasFrom,
    hasFriendRequests,
    orderFilter,
    nameFilter,
    friendRequestsFiltered,
    removeFriendRequest,
    addFriendRequest,
    storeFriendRequest,
    updateFriendRequest,
    destroyFriendRequest,
    setFriendRequests,
    resetStore,
  };
});
