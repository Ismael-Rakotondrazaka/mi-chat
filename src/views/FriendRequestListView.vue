<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <FriendRequestListViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation
          class="w-full max-w-xl sticky top-0 bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Your friend requests list</HeaderText>
        </div>

        <FriendRequestFilter
          class="sticky top-14 w-full max-w-xl z-[1] bg-sky-50"
        />

        <div class="relative w-full max-w-xl z-[0]">
          <FriendRequestList
            :friendRequests="friendRequestStore.friendRequestsFiltered"
            class="w-full"
          />
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import FriendRequestList from "../components/friendRequests/FriendRequestList.vue";
import FriendRequestFilter from "../components/friendRequests/FriendRequestFilter.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import FriendRequestListViewLoader from "../components/loaders/FriendRequestListViewLoader.vue";
import { useRouteStore } from "../stores";
import { useFriendRequestStore, useMetaStore } from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const friendRequestStore = useFriendRequestStore();
const routeStore = useRouteStore();
const route = useRoute();
const metaStore = useMetaStore();

const isLoading = computed(() => routeStore.isSettingFriendRequests);

watch(
  () => route.name === "friendrequest-list",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Friend requests";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
