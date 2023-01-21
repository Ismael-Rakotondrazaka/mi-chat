<template>
  <CustomLayout :isLoading="false">
    <template #default>
      <main
        class="bg-bottom bg-repeat-x"
        :style="{
          'background-image':
            'url(\'/src/assets/images/illustrations/waves-2-primary.svg\')',
        }"
      >
        <button
          v-if="showMenu"
          @click="openAuthNavbarHandler"
          class="mx-3 mt-3 block md:hidden text-2xl border-2 border-transparent rounded-full"
        >
          <fa-icon icon="bars" />

          <span class="inline-block md:hidden ml-3 font-bold text-lg">
            Menu
          </span>
        </button>

        <TheWelcome class="" />

        <AdvantageList />

        <div class="flex flex-col items-center p-3">
          <TheFooter class="w-full max-w-md mt-24" />
        </div>
      </main>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import TheWelcome from "../components/commons/TheWelcome.vue";
import AdvantageList from "../components/advantages/AdvantageList.vue";
import TheFooter from "../components/footers/TheFooter.vue";
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
  () => route.name === "home",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat";
    }
  },
  {
    immediate: true,
  }
);
</script>
