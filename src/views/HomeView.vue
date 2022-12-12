<script setup>
import TheWelcome from "../components/TheWelcome.vue";

import {
  useUserStore,
  useProfileOpenedStore,
  useConversationStore,
  useFriendStore,
  useFriendRequestStore,
  useConversationOpenedStore,
} from "../stores";

import { onMounted } from "vue";

const userStore = useUserStore();
const profileOpenedStore = useProfileOpenedStore();
const conversationStore = useConversationStore();
const friendStore = useFriendStore();
const friendRequestStore = useFriendRequestStore();
const conversationOpenedStore = useConversationOpenedStore();
onMounted(async () => {
  await userStore.setAuthUser();
  await profileOpenedStore.setProfileOpened({
    userId: 1,
  });
  await conversationStore.setConversations();

  await friendStore.setFriends();

  await friendRequestStore.setFriendRequests();

  await conversationOpenedStore.setConversationOpened({
    conversationId: 26,
  });
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
