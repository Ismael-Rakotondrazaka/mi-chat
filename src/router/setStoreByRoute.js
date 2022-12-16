import {
  useRouteStore,
  useUserStore,
  useConversationStore,
  useConversationOpenedStore,
  useFriendStore,
  useFriendRequestStore,
  useProfileOpenedStore,
} from "../stores";
import { authRoutes } from "./routes";
import { AxiosError } from "axios";

const setStoreByRoute = async (route) => {
  const routeStore = useRouteStore();
  try {
    const userStore = useUserStore();
    const conversationStore = useConversationStore();
    const conversationOpenedStore = useConversationOpenedStore();
    const friendStore = useFriendStore();
    const friendRequestStore = useFriendRequestStore();
    const profileOpenedStore = useProfileOpenedStore();

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
    const conversationsRoutes = ["conversation-list"];

    const friendsRoutes = ["friend-list"];

    const friendRequestsRoutes = ["friendrequest-list"];

    // match order: user => profileOpened
    const profileOpenedRoutes = ["profile-item"];

    const setAuthUser = async () => {
      routeStore.isSettingUser = true;
      await userStore.setAuthUser();
      routeStore.isSettingUser = false;
    };

    const setFriends = async () => {
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
      conversationOpenedStore.resetStore();
      routeStore.isNotFound = false;
      routeStore.isSettingConversationOpened = true;
      await conversationOpenedStore.setConversationOpened({ conversationId });
      routeStore.isSettingConversationOpened = false;
      routeStore.isNotFound = false;
    };

    const setFriendRequests = async () => {
      routeStore.isSettingFriendRequests = true;
      await friendRequestStore.setFriendRequests();
      routeStore.isSettingFriendRequests = false;
      routeStore.isNotFound = false;
    };

    const setProfileOpened = async (userId) => {
      profileOpenedStore.resetStore();
      routeStore.isNotFound = false;
      routeStore.isSettingProfileOpened = true;
      await profileOpenedStore.setProfileOpened({ userId });
      routeStore.isSettingProfileOpened = false;
      routeStore.isNotFound = false;
    };

    if (authRoutes.includes(route.name) && !userStore.user) {
      await setAuthUser();
    }

    if (authRoutes.includes(route.name) && !friendStore.hasFriends) {
      await setFriends();
    }

    if (conversationsRoutes.includes(route.name)) {
      if (!conversationStore.hasConversations) {
        await setConversations();
      }
    }

    if (conversationOpenedRoutes.includes(route.name)) {
      const conversationId = +route.params.conversationId;

      // because "0" is accepted by the router we need to deny it manually
      // if (conversationId <= 0) {
      //   routeStore.isNotFound = true;
      //   conversationOpenedStore.resetStore();
      // } else {
      if (!conversationStore.hasConversations) {
        await setConversations();
      }

      if (!conversationOpenedStore.is(conversationId)) {
        await setConversationOpened(conversationId);
      }
      // }
    }

    if (friendsRoutes.includes(route.name)) {
      if (!friendStore.hasFriends) {
        await setFriends();
      }
    }

    if (friendRequestsRoutes.includes(route.name)) {
      if (!friendRequestStore.hasFriendRequests) {
        await setFriendRequests();
      }
    }

    if (profileOpenedRoutes.includes(route.name)) {
      const userId = +route.params.userId;

      if (!profileOpenedStore.is(userId)) {
        await setProfileOpened(userId);
      }
    }

    // routeStore.isNotFound = false;
  } catch (error) {
    routeStore.isSettingConversationOpened = false;
    routeStore.isSettingConversations = false;
    routeStore.isSettingFriendRequests = false;
    routeStore.isSettingFriends = false;
    routeStore.isSettingProfileOpened = false;
    routeStore.isSettingUser = false;

    const notFoundHandler = () => {
      routeStore.isNotFound = true;
    };

    const forbiddenHandler = () => {
      routeStore.isNotFound = true;
    };

    const statusCodeHandler = {
      404: notFoundHandler,
      403: forbiddenHandler,
    };

    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data?.error;

      statusCodeHandler[errorResponse.statusCode]?.(errorResponse);
    }
  }
};

export { setStoreByRoute };
