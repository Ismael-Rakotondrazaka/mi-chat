<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Friend request List</h1>
        <ul>
          <li
            v-for="friendRequest in friendRequestStore.friendRequests"
            :key="friendRequest.id"
          >
            {{ friendRequest }}
          </li>
        </ul>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useRouteStore } from "../stores";
import { useFriendRequestStore } from "../stores";

import { computed } from "vue";

const friendRequestStore = useFriendRequestStore();
const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingFriendRequests);
</script>

<style scoped></style>
