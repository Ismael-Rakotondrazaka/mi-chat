import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouteStore = defineStore("route", () => {
  const isSettingConversationOpened = ref(true);
  const isSettingProfileOpened = ref(true);
  const isSettingConversations = ref(true);
  const isSettingUser = ref(true);
  const isSettingFriends = ref(true);
  const isSettingFriendRequests = ref(true);
  const isNotFound = ref(false);

  const resetStore = () => {
    isSettingConversationOpened.value = true;
    isSettingProfileOpened.value = true;
    isSettingConversations.value = true;
    isSettingUser.value = true;
    isSettingFriends.value = true;
    isSettingFriendRequests.value = true;
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
