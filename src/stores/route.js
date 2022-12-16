import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore("route", () => {
  const isSettingConversationOpened = ref(false);
  const isSettingProfileOpened = ref(false);
  const isSettingConversations = ref(false);
  const isSettingUser = ref(false);
  const isSettingFriends = ref(false);
  const isSettingFriendRequests = ref(false);
  const isNotFound = ref(false);

  const resetStore = () => {
    isSettingConversationOpened.value = false;
    isSettingProfileOpened.value = false;
    isSettingConversations.value = false;
    isSettingUser.value = false;
    isSettingFriends.value = false;
    isSettingFriendRequests.value = false;
    isNotFound.value = false;
  };

  return {
    isSettingConversationOpened,
    isSettingProfileOpened,
    isSettingConversations,
    isSettingUser,
    isSettingFriends,
    isSettingFriendRequests,
    isNotFound,
    resetStore,
  };
});
