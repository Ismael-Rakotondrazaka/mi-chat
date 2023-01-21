<template>
  <div class="flex flex-row items-center justify-between p-3 bg-emerald-400">
    <div class="w-[80%] flex flex-row items-center gap-x-2">
      <button
        @click="goBackHandler"
        class="block px-1 text-2xl text-white hover:cursor-pointer md:hidden"
      >
        <fa-icon icon="chevron-left" />
      </button>

      <AvatarUI
        :src="avatarSrc"
        :size="'sm'"
        :type="conversationOpenedStore.conversation.type"
      />

      <div class="w-[80%]">
        <div class="flex flex-col">
          <p
            class="truncate text-md md:text-lg font-bold text-slate-900"
          >
            {{ conversationName }}
          </p>
        </div>
      </div>
    </div>

    <button
      @click="openConversationItemHandler"
      class="block px-2 text-2xl text-white hover:cursor-pointer"
    >
      <fa-icon icon="bars" />
    </button>
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import { useConversationOpenedStore } from "../../stores";

import { computed } from "vue";
import { useRouter } from "vue-router";

const conversationOpenedStore = useConversationOpenedStore();
const router = useRouter();

const avatarSrc = computed(() =>
  conversationOpenedStore.conversation.type === "personal"
    ? conversationOpenedStore.conversation.converser.imageUrl
    : conversationOpenedStore.conversation.imageUrl
);

const conversationName = computed(() =>
  conversationOpenedStore.conversation.type === "personal"
    ? conversationOpenedStore.conversation.converser.participation?.nickname ||
      conversationOpenedStore.conversation.converser.name.full
    : conversationOpenedStore.conversation.name
);

const openConversationItemHandler = () => {
  router.push({
    name: "conversation-item",
    params: {
      conversationId: conversationOpenedStore.conversation.id,
    },
  });
};

const goBackHandler = () => {
  router.back();
};
</script>

<style scoped></style>
