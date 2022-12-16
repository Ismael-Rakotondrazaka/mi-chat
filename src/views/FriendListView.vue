<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading> Loading... </template>

    <template #default>
      <div>
        <h1>Friend List</h1>
        <ul>
          <li v-for="friend in friendStore.friends" :key="friend.id">
            {{ friend }}
          </li>
        </ul>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import { useRouteStore } from "../stores";
import { useFriendStore } from "../stores";

import { computed } from "vue";

const friendStore = useFriendStore();
const routeStore = useRouteStore();

const isLoading = computed(() => routeStore.isSettingFriends);
</script>

<style scoped></style>
