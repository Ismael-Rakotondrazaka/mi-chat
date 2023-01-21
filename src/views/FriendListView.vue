<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <FriendListViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation
          class="w-full max-w-md sticky top-0 bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>{{ headerText }}</HeaderText>
        </div>

        <FriendFilter class="sticky top-14 w-full max-w-md bg-sky-50 z-[1]" />

        <div class="relative w-full max-w-md z-[0]">
          <UserList
            :users="profileOpenedStore.friendsFiltered"
            class="w-full"
          />
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import FriendListViewLoader from "../components/loaders/FriendListViewLoader.vue";
import CustomLayout from "../components/commons/CustomLayout.vue";
import UserList from "../components/users/UserList.vue";
import FriendFilter from "../components/friends/FriendFilter.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import {
  useProfileOpenedStore,
  useRouteStore,
  useUserStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const routeStore = useRouteStore();
const profileOpenedStore = useProfileOpenedStore();
const userStore = useUserStore();
const route = useRoute();
const metaStore = useMetaStore();

const isLoading = computed(
  () =>
    routeStore.isSettingUser ||
    routeStore.isSettingProfileOpened ||
    !profileOpenedStore.user
);

const headerText = computed(() => {
  let result = "Friends list";

  if (profileOpenedStore.user) {
    if (userStore.is(profileOpenedStore.user.id)) {
      result = "Your friends list";
    } else {
      result = `${profileOpenedStore.user.name.full}'s friends list`;
    }
  }

  return result;
});

watch(
  [
    () => route.name === "friend-list",
    () => profileOpenedStore.user?.name?.full,
  ],
  ([newRouteName, newFullName]) => {
    if (newRouteName && newFullName) {
      metaStore.title = `mi-chat | ${newFullName}'s friends list`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
