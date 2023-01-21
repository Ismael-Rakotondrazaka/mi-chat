<template>
  <CustomLayout :isLoading="isLoading">
    <template #loading>
      <ProfileItemViewLoader />
    </template>

    <template #default>
      <div class="flex flex-col items-center w-full p-3">
        <CustomNavigation class="sticky top-0 w-full max-w-md bg-sky-50" />

        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>{{ headerText }}</HeaderText>
        </div>

        <UserProfileItem
          :id="profileOpenedStore.user.id"
          :name="profileOpenedStore.user.name"
          :imageUrl="profileOpenedStore.user.imageUrl"
          :description="profileOpenedStore.user.description"
          :createdAt="profileOpenedStore.user.createdAt"
          :friendship="profileOpenedStore.user.friendship"
          :friendRequest="profileOpenedStore.user.friendRequest"
          :friends="profileOpenedStore.user.friends"
          class="w-full max-w-md"
        />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import UserProfileItem from "../components/users/UserProfileItem.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import CustomNavigation from "../components/navigations/CustomNavigation.vue";
import ProfileItemViewLoader from "../components/loaders/ProfileItemViewLoader.vue";
import {
  useProfileOpenedStore,
  useRouteStore,
  useUserStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const profileOpenedStore = useProfileOpenedStore();
const userStore = useUserStore();
const routeStore = useRouteStore();
const metaStore = useMetaStore();
const route = useRoute();

const isLoading = computed(
  () =>
    routeStore.isSettingUser ||
    routeStore.isSettingProfileOpened ||
    !profileOpenedStore.user
);

const headerText = computed(() => {
  let result = "Profile";

  if (profileOpenedStore.user) {
    if (userStore.is(profileOpenedStore.user.id)) {
      result = "Your profile";
    } else {
      result = `${profileOpenedStore.user.name.full}'s profile`;
    }
  }

  return result;
});

watch(
  [
    () => route.name === "profile-item",
    () => profileOpenedStore.user?.name?.full,
  ],
  ([newRouteName, newFullName]) => {
    if (newRouteName && newFullName) {
      metaStore.title = `mi-chat | ${newFullName}'s profile`;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
