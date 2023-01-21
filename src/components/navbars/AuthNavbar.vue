<template>
  <Teleport to="body" :disabled="!authNavbarStore.isSlide">
    <header
      class="fixed top-0 left-0 right-0 md:right-[unset] bottom-0 bg-primary md:w-[20%] duration-200 z-[3] overflow-y-auto"
      :class="[navClass]"
    >
      <nav>
        <div class="flex flex-row justify-end w-full md:hidden">
          <button @click="closeNavbar" class="mt-3 mr-5 text-2xl text-white">
            <fa-icon icon="xmark" />

            <span class="sr-only">Close</span>
          </button>
        </div>

        <ul>
          <li v-for="link in links" :key="link.to">
            <div
              class="flex flex-col items-start m-3 transition-colors duration-200"
            >
              <RouterLink
                v-if="link.type === 'routerLink'"
                :to="link.to"
                class="flex items-center justify-between md:justify-center lg:justify-between relative lg:static, w-full px-3 py-3 pl-5 text-left text-white border-2 border-transparent rounded-full hover:border-white truncate"
                :class="link.class"
              >
                <span>
                  <fa-icon
                    :icon="link.icon"
                    class="inline-block mr-3 text-2xl"
                  />
                  <span class="inline md:hidden lg:inline">{{
                    link.text
                  }}</span>
                </span>

                <BadgeUI
                  v-if="link.badge"
                  class="absolute right-3 bottom-1 lg:bottom-auto lg:translate-y-1 lg:static,"
                >
                  {{ link.badge }}
                </BadgeUI>
              </RouterLink>

              <button
                v-else-if="link.type === 'button'"
                @click="link.onClickHandler"
                class="block w-full px-3 py-3 pl-5 text-left text-white truncate border-2 border-transparent rounded-full lg:text-left md:text-center hover:border-white"
                :class="link.class"
              >
                <span>
                  <fa-icon
                    :icon="link.icon"
                    class="inline-block mr-3 text-2xl"
                  />
                  <span class="inline md:hidden lg:inline">{{
                    link.text
                  }}</span>
                </span>

                <BadgeUI
                  v-if="link.badge"
                  class="absolute right-3 bottom-1, lg:static"
                >
                  {{ link.badge }}
                </BadgeUI>
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <EndSession
        :shown="showEndSession"
        @close="closeEndSessionHandler"
        class=""
      />
    </header>
  </Teleport>
</template>

<script setup>
import EndSession from "../sessions/EndSession.vue";
import BadgeUI from "../ui/BadgeUI.vue";
import {
  useUserStore,
  useFriendRequestStore,
  useConversationStore,
  useAuthNavbarStore,
} from "../../stores";

import { RouterLink, useRouter, useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const friendRequestStore = useFriendRequestStore();
const conversationStore = useConversationStore();
const authNavbarStore = useAuthNavbarStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const linkActiveClass =
  "bg-white rounded-full !text-border-primary !border-border-primary !shadow-button-primary !hover:shadow-border-primary";

const links = computed(() => [
  {
    type: "routerLink",
    icon: "home",
    text: "Home",
    to: {
      name: "home",
    },
    class: {
      [linkActiveClass]: route.name === "home" && !showEndSession.value,
    },
  },
  {
    type: "routerLink",
    icon: "magnifying-glass",
    text: "Search",
    to: {
      name: "search",
    },
    class: {
      [linkActiveClass]:
        (route.name === "search" ||
          (route.name === "profile-item" &&
            route.params.userId != userStore.user.id) ||
          (route.name === "friend-list" &&
            route.params.userId != userStore.user.id)) &&
        !showEndSession.value,
    },
  },
  {
    type: "routerLink",
    icon: "message",
    text: "Chats",
    to: {
      name: "conversation-list",
    },
    class: {
      [linkActiveClass]:
        [
          "conversation-list",
          "conversation-item",
          "conversation-media",
          "conversation-edit",
          "conversation-create",
          "message-list",
          "participant-list",
          "participant-edit",
          "participant-create",
        ].includes(route.name) && !showEndSession.value,
    },
    badge:
      conversationStore.unreadMessagesCount > 99
        ? "+99"
        : conversationStore.unreadMessagesCount,
  },
  {
    type: "routerLink",
    icon: "user-plus",
    text: "Friend requests",
    to: {
      name: "friendrequest-list",
    },
    class: {
      [linkActiveClass]:
        route.name === "friendrequest-list" && !showEndSession.value,
    },
    badge:
      friendRequestStore.friendRequestsCount > 99
        ? "+99"
        : friendRequestStore.friendRequestsCount,
  },
  {
    type: "button",
    icon: "user-group",
    text: "Friends",
    onClickHandler: () => {
      router.push({
        name: "friend-list",
        params: {
          userId: userStore.user.id,
        },
      });
    },
    class: {
      [linkActiveClass]:
        route.name === "friend-list" &&
        route.params.userId == userStore.user.id &&
        !showEndSession.value,
    },
  },
  {
    type: "button",
    icon: "user",
    text: "Profile",
    onClickHandler: () => {
      router.push({
        name: "profile-item",
        params: {
          userId: userStore.user.id,
        },
      });
    },
    class: {
      [linkActiveClass]:
        ((route.name === "profile-item" &&
          route.params.userId == userStore.user.id) ||
          route.name === "profile-edit") &&
        !showEndSession.value,
    },
  },
  {
    type: "routerLink",
    icon: "circle-info",
    text: "About",
    to: {
      name: "about",
    },
    class: {
      [linkActiveClass]: route.name === "about" && !showEndSession.value,
    },
  },
  {
    type: "button",
    icon: "arrow-right-from-bracket",
    text: "Logout",
    onClickHandler: openEndSessionHandler,
    class: {
      [linkActiveClass]: showEndSession.value,
    },
  },
]);

const closeNavbar = () => {
  authNavbarStore.showAuthNavbar = false;
};

const showEndSession = ref(false);
const openEndSessionHandler = () => {
  showEndSession.value = true;
};
const closeEndSessionHandler = () => {
  showEndSession.value = false;
};

const navClass = computed(() => {
  let result = "";

  if (authNavbarStore.isSlide) {
    if (authNavbarStore.showAuthNavbar) {
      result = "translate-x-0";
    } else {
      result = "translate-x-[-100%]";
    }
  }

  return result;
});

watch(
  () => route.path,
  () => {
    if (authNavbarStore.isSlide) {
      authNavbarStore.showAuthNavbar = false;
    }
  }
);
</script>

<style scoped></style>
