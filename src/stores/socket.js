import { useTokenStore } from "./token";
import { useResetStore } from "./reset";

import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { useRouter } from "vue-router";

import {
  updateUserConnectedHandler,
  updateUserHandler,
  storeFriendRequestHandler,
  destroyFriendRequestHandler,
  storeFriendHandler,
  destroyConversationHandler,
  storeConversationHandler,
  updateConversationHandler,
  destroyFriendHandler,
  destroyMessageHandler,
  storeMessageHandler,
  destroyParticipantHandler,
  storeParticipantHandler,
  updateParticipantHandler,
  destroyUnreadMessageHandler,
} from "../events";

const eventFunction = {
  "usersConnected:update": updateUserConnectedHandler,
  "users:update": updateUserHandler,
  "friendRequests:store": storeFriendRequestHandler,
  "friendRequests:destroy": destroyFriendRequestHandler,
  "friends:store": storeFriendHandler,
  "friends:destroy": destroyFriendHandler,
  "conversations:destroy": destroyConversationHandler,
  "conversations:store": storeConversationHandler,
  "conversations:update": updateConversationHandler,
  "messages:destroy": destroyMessageHandler,
  "messages:store": storeMessageHandler,
  "participants:destroy": destroyParticipantHandler,
  "participants:store": storeParticipantHandler,
  "participants:update": updateParticipantHandler,
  "unreadMessages:destroy": destroyUnreadMessageHandler,
};

export const useSocketStore = defineStore("socket", () => {
  const tokenStore = useTokenStore();
  const resetStore = useResetStore();
  const router = useRouter();

  const socketIO = ref(null);

  const isConnected = computed(() => !!socketIO.value?.connected);

  const connect = () => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || "";
    const socket = io(backendUrl, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${tokenStore.accessToken}`, // ! here we use accessToken, maybe it will be changed
      },
    });

    socket.on("connect_error", (err) => {
      // got a forbidden error, so need to login again
      if (err?.data?.error?.statusCode === 403) {
        resetStore.reset();

        router.push({
          name: "login",
        });
      }
    });

    socket.onAny((eventName, payload) => {
      console.log(eventName, payload);
      eventFunction[eventName]?.(payload);
    });

    socketIO.value = socket;
  };

  const _resetStore = () => {
    socketIO.value?.close();
    socketIO.value = null;
  };

  watch(
    () => tokenStore.accessToken,
    () => {
      _resetStore();
      connect();
    }
  );

  return {
    socketIO,
    isConnected,
    connect,
    resetStore: _resetStore,
  };
});
