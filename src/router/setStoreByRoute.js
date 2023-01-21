import {
  useRouteStore,
  useUserStore,
  useConversationStore,
  useConversationOpenedStore,
  useFriendStore,
  useFriendRequestStore,
  useProfileOpenedStore,
} from "../stores";
import { AxiosError } from "axios";

const setStoreByRoute = async (route) => {
  const routeStore = useRouteStore();
  const profileOpenedStore = useProfileOpenedStore();
  const setProfileOpened = async (userId) => {
    profileOpenedStore.resetStore();
    routeStore.isNotFound = false;
    routeStore.isSettingProfileOpened = true;
    await profileOpenedStore.setProfileOpened({ userId });
    routeStore.isSettingProfileOpened = false;
    routeStore.isNotFound = false;
  };
  // match order: user => profileOpened
  const profileOpenedRoutes = ["profile-item", "friend-list"];
  routeStore.isNotFound = false;

  try {
    const userStore = useUserStore();
    const conversationStore = useConversationStore();
    const conversationOpenedStore = useConversationOpenedStore();
    const friendStore = useFriendStore();
    const friendRequestStore = useFriendRequestStore();

    // match order: conversations => conversationOpened
    const conversationOpenedRoutes = [
      "conversation-item",
      "message-list",
      "conversation-edit",
      "conversation-media",
      "participant-list",
      "participant-edit",
      "participant-create",
    ];

    const setAuthUser = async () => {
      routeStore.isSettingUser = true;
      await userStore.setAuthUser();
      routeStore.isSettingUser = false;
    };

    const setFriends = async () => {
      routeStore.isNotFound = false;
      routeStore.isSettingFriends = true;
      await friendStore.setFriends();
      routeStore.isSettingFriends = false;
      routeStore.isNotFound = false;
    };

    const setConversations = async () => {
      routeStore.isNotFound = false;
      routeStore.isSettingConversations = true;
      await conversationStore.setConversations();
      routeStore.isSettingConversations = false;
      routeStore.isNotFound = false;
    };

    const setConversationOpened = async (conversationId) => {
      routeStore.isNotFound = false;
      conversationOpenedStore.messages = [];
      conversationOpenedStore.participants = [];
      conversationOpenedStore.participant = null;
      conversationOpenedStore.messageShownCount = 5;
      conversationOpenedStore.participantTypeFilter = "participant-type-all";
      conversationOpenedStore.participantOrderFilter = "participant-order-asc";
      conversationOpenedStore.participantNameFilter = "";
      await conversationOpenedStore.setConversationOpened({ conversationId });
      routeStore.isSettingConversationOpened = false;
      routeStore.isNotFound = false;
    };

    const setParticipant = async ({ conversationId, participantId }) => {
      routeStore.isNotFound = false;
      routeStore.isSettingConversations = true;
      await conversationOpenedStore.setParticipant({
        conversationId,
        participantId,
      });
      routeStore.isSettingConversations = false;
      routeStore.isNotFound = false;
    };

    const setFriendRequests = async () => {
      routeStore.isNotFound = false;
      routeStore.isSettingFriendRequests = true;
      await friendRequestStore.setFriendRequests();
      routeStore.isSettingFriendRequests = false;
      routeStore.isNotFound = false;
    };

    if (!userStore.user) {
      await setAuthUser();
    }

    if (!friendStore.hasFriends) {
      await setFriends();
    }

    if (!conversationStore.hasConversations) {
      await setConversations();
    }

    if (conversationOpenedRoutes.includes(route.name)) {
      const conversationId = +route.params.conversationId;

      if (!conversationStore.hasConversations) {
        await setConversations();
      }

      if (!conversationOpenedStore.is(conversationId)) {
        await setConversationOpened(conversationId);
      }

      if (route.name === "participant-edit") {
        const participantId = +route.params.participantId;
        await setParticipant({ conversationId, participantId });
      }
    }

    if (!friendStore.hasFriends) {
      await setFriends();
    }

    if (!friendRequestStore.hasFriendRequests) {
      await setFriendRequests();
    }

    // ! this one can be auth and unauth so need to redo it if the auth is failed
    if (profileOpenedRoutes.includes(route.name)) {
      const userId = +route.params.userId;

      if (!profileOpenedStore.is(userId)) {
        await setProfileOpened(userId);
      }
    }

    if (
      route.name === "conversation-edit" &&
      conversationOpenedStore.conversation.type === "personal"
    ) {
      routeStore.isNotFound = true;
    }
  } catch (error) {
    routeStore.isSettingConversationOpened = false;
    routeStore.isSettingConversations = false;
    routeStore.isSettingFriendRequests = false;
    routeStore.isSettingFriends = false;
    routeStore.isSettingProfileOpened = false;

    if (profileOpenedRoutes.includes(route.name)) {
      const userId = +route.params.userId;

      if (!profileOpenedStore.is(userId)) {
        await setProfileOpened(userId);
      }
    }
    routeStore.isSettingUser = false;

    const notFoundHandler = () => {
      routeStore.isNotFound = true;
    };

    const forbiddenHandler = async () => {
      routeStore.isNotFound = true;
    };

    const statusCodeHandler = {
      404: notFoundHandler,
      403: forbiddenHandler,
    };

    if (error instanceof AxiosError) {
      const errorResponse = error?.response?.data?.error;

      statusCodeHandler[errorResponse?.statusCode]?.(errorResponse); // ! can be undefined
    }
  }
};

export { setStoreByRoute };
