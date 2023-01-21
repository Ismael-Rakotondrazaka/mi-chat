<template>
  <AuthNavbar v-if="isAuth" />
  <UnauthNavbar v-else />

  <PuSkeletonTheme color="hsl(200, 20%, 80%)" highlight="hsl(200, 20%, 85%)">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade">
        <KeepAlive :exclude="['ConversationEditView', 'NotFoundView']">
          <component :is="Component" :key="route.name" :class="[viewClass]" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </PuSkeletonTheme>
</template>

<script setup>
import AuthNavbar from "./components/navbars/AuthNavbar.vue";
import UnauthNavbar from "./components/navbars/UnauthNavbar.vue";
import { authRoutes, canBeAuthRoutes } from "./router/routes";
import { useTokenStore, useUserStore } from "./stores";

import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const tokenStore = useTokenStore();
const route = useRoute();
const userStore = useUserStore();

const isAuth = computed(
  () =>
    (authRoutes.includes(route.name) || canBeAuthRoutes.includes(route.name)) &&
    tokenStore.hasRefreshToken &&
    userStore.user
);

const viewClass = computed(() => (isAuth.value ? "ml-0 md:ml-[20%]" : ""));
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  display: none;
}

.fade-enter-active {
  transition: all 500ms ease-in-out;
}
</style>
