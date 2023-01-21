<template>
  <CustomLayout :isLoading="false">
    <div
      class="w-full min-h-screen bg-bottom bg-repeat-x"
      :style="{
        'background-image':
          'url(\'/src/assets/images/illustrations/waves-2-primary.svg\')',
      }"
    >
      <button
        v-if="showMenu"
        @click="openAuthNavbarHandler"
        class="block mx-3 mt-3 text-2xl border-2 border-transparent rounded-full md:hidden"
      >
        <fa-icon icon="bars" />

        <span class="inline-block ml-3 text-lg font-bold md:hidden">
          Menu
        </span>
      </button>

      <ThePrivacyPolicy />

      <div class="flex flex-col items-center p-3">
        <TheFooter class="w-full max-w-md mt-24" />
      </div>
    </div>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import TheFooter from "../components/footers/TheFooter.vue";
import ThePrivacyPolicy from "../components/privacyPolicies/ThePrivacyPolicy.vue";
import { authRoutes, canBeAuthRoutes } from "../router/routes";
import {
  useTokenStore,
  useUserStore,
  useAuthNavbarStore,
  useMetaStore,
} from "../stores";

import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const tokenStore = useTokenStore();
const route = useRoute();
const userStore = useUserStore();
const authNavbarStore = useAuthNavbarStore();
const metaStore = useMetaStore();

const isAuth = computed(
  () =>
    (authRoutes.includes(route.name) || canBeAuthRoutes.includes(route.name)) &&
    tokenStore.hasRefreshToken &&
    userStore.user
);

const openAuthNavbarHandler = () => {
  if (authNavbarStore.isSlide) {
    authNavbarStore.showAuthNavbar = true;
  }
};

const showMenu = computed(() => isAuth.value && authNavbarStore.isSlide);

watch(
  () => route.name === "privacy-policy",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Privacy policy";
    }
  },
  {
    immediate: true,
  }
);
</script>
