<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <EditProfileViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation class="w-full max-w-md sticky top-0 bg-sky-50" />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Edit profile</HeaderText>
        </div>

        <EditUser class="w-full max-w-md" />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import EditUser from "../components/users/EditUser.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import EditProfileViewLoader from "../components/loaders/EditProfileViewLoader.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import { useRouteStore, useUserStore } from "../stores";

import { computed } from "vue";

const routeStore = useRouteStore();
const userStore = useUserStore();

const isLoading = computed(() => routeStore.isSettingUser || !userStore.user);
</script>

<style scoped></style>
