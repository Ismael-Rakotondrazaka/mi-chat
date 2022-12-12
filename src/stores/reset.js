import { useConversationStore } from "./conversation";
import { useConversationOpenedStore } from "./conversationOpened";
import { useFriendStore } from "./friend";
import { useFriendRequestStore } from "./friendRequest";
import { useParticipantStore } from "./participant";
import { useProfileOpenedStore } from "./profileOpened";
import { useSessionStore } from "./session";
import { useSocketStore } from "./socket";
import { useTokenStore } from "./token";
import { useUnreadMessageStore } from "./unreadMessage";
import { useUserStore } from "./user";
import { useUserConnectedStore } from "./userConnected";

import { defineStore } from "pinia";

export const useResetStore = defineStore("reset", () => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const friendStore = useFriendStore();
  const friendRequestStore = useFriendRequestStore();
  const participantStore = useParticipantStore();
  const profileOpenedStore = useProfileOpenedStore();
  const sessionStore = useSessionStore();
  const socketStore = useSocketStore();
  const tokenStore = useTokenStore();
  const unreadMessageStore = useUnreadMessageStore();
  const userStore = useUserStore();
  const userConnectedStore = useUserConnectedStore();

  const reset = () => {
    conversationStore.resetStore();
    conversationOpenedStore.resetStore();
    friendStore.resetStore();
    friendRequestStore.resetStore();
    participantStore.resetStore();
    profileOpenedStore.resetStore();
    sessionStore.resetStore();
    socketStore.resetStore();
    tokenStore.resetStore();
    unreadMessageStore.resetStore();
    userStore.resetStore();
    userConnectedStore.resetStore();
  };

  return {
    reset,
  };
});
