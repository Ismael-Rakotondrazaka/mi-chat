<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <SearchViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation
          class="w-full max-w-md sticky top-0 bg-sky-50 z-[1]"
        />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Search</HeaderText>
        </div>

        <UserFilter class="sticky w-full max-w-md bg-sky-50 top-14 z-[1]" />

        <div class="relative w-full max-w-md z-[0]">
          <UserList :users="userStore.usersFiltered" class="w-full" />
        </div>
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import UserFilter from "../components/users/UserFilter.vue";
import UserList from "../components/users/UserList.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import SearchViewLoader from "../components/loaders/SearchViewLoader.vue";
import { useRouteStore, useUserStore, useMetaStore } from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const routeStore = useRouteStore();
const userStore = useUserStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(() => routeStore.isSettingUser);

watch(
  () => route.name === "search",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Search";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
