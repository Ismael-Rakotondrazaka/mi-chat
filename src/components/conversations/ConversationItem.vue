<template>
  <button class="w-full" @click="openConversationHandler">
    <div
      class="flex flex-row items-start justify-between p-2 border-2 rounded-md md:p-3 flex-nowrap gap-x-3 border-border hover:border-border-primary shadow-button hover:shadow-border-primary hover:bg-primary"
      :class="[conversationClass]"
    >
      <AvatarUI
        :src="avatarSrc"
        size="sm"
        :type="type"
        :userId="avatarUserId"
      />

      <div class="w-full overflow-hidden">
        <div class="flex flex-col items-start justify-between">
          <p class="text-xs font-bold truncate md:text-sm text-slate-900">
            {{ conversationName }}
          </p>

          <p v-if="latestMessage" class="mr-1 text-xs truncate md:text-sm">
            <span class="font-light text-gray-900">
              {{ latestMessageSender }} </span
            >:

            <span :class="[latestMessageClass]">
              {{ appropriateMessage }}
            </span>
          </p>
        </div>
      </div>

      <div
        :class="{
          'self-center': unreadMessagesCount > 0,
        }"
      >
        <div class="flex flex-col items-end justify-between">
          <p class="mb-1 text-xs font-light text-right">
            <span class="whitespace-nowrap">
              {{ formattedUpdatedAt }}
            </span>
          </p>

          <BadgeUI v-if="unreadMessagesCount > 0">
            {{ conversationUnreadMessagesCount }}
          </BadgeUI>

          <p v-else class="sr-only">No new message</p>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import BadgeUI from "../ui/BadgeUI.vue";
import AvatarUI from "../ui/AvatarUI.vue";
import {
  useUserStore,
  useConversationOpenedStore,
  useDateStore,
} from "../../stores";

import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDateFormat } from "@vueuse/core";

const userStore = useUserStore();
const conversationOpenedStore = useConversationOpenedStore();
const dateStore = useDateStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return ["personal", "group"].includes(value);
    },
  },
  name: {
    type: [String, null],
    required: false,
    default: null,
  },
  imageUrl: {
    type: [String, null],
    required: false,
    default: null,
  },
  description: {
    type: [String, null],
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  converser: {
    type: [Object, null],
    required: false,
    default: null,
  },
  participation: {
    type: [Object, null],
    required: false,
    default: null,
  },
  latestMessage: {
    type: [Object, null],
    required: false,
    default: null,
  },
  unreadMessagesCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const openConversationHandler = () => {
  router.push({
    name: "message-list",
    params: {
      conversationId: props.id,
    },
  });
};

const avatarSrc = computed(() => {
  return props.type === "personal" ? props.converser.imageUrl : props.imageUrl;
});

const avatarUserId = computed(() => {
  return props.type === "personal" ? props.converser.id : 0;
});

const conversationName = computed(() => {
  return props.type === "personal"
    ? props.converser.participation?.nickname || props.converser.name.full
    : props.name;
});

const conversationUnreadMessagesCount = computed(() => {
  return props.unreadMessagesCount <= 100 ? props.unreadMessagesCount : "+100";
});

const latestMessageSender = computed(() => {
  return props.latestMessage
    ? userStore.is(props.latestMessage.sender.id)
      ? "You"
      : props.latestMessage.sender.participation?.nickname
      ? props.latestMessage.sender.participation.nickname
      : props.latestMessage.sender.name.first
    : "";
});

const conversationClass = computed(() => {
  return conversationOpenedStore.is(props.id) && route.name === "message-list"
    ? "!bg-primary !border-border-primary !shadow-border-primary"
    : "!bg-white";
});

const latestMessageClass = computed(() => {
  return props.latestMessage && props.unreadMessagesCount > 0
    ? "font-bold"
    : "font-light";
});

const appropriateMessage = computed(() => {
  let result = "";

  if (props.latestMessage) {
    const typeText = {
      video: "Sent a video",
      image: "Sent an image",
      file: "Sent a file",
    };

    if (Object.hasOwnProperty.call(typeText, props.latestMessage.type)) {
      result = typeText[props.latestMessage.type];
    } else {
      result = props.latestMessage.content;
    }
  }

  return result;
});

const updatedAtDateFormat = computed(() => {
  let result = "";

  if (dateStore.isToday(props.updatedAt)) {
    result = "HH:mm";
  } else if (dateStore.isOnThisWeek(props.updatedAt)) {
    result = "ddd";
  } else if (dateStore.isOnThisYear(props.updatedAt)) {
    result = "MMM D";
  } else {
    result = "MMM D, YYYY";
  }

  return result;
});

const formattedUpdatedAt = useDateFormat(props.updatedAt, updatedAtDateFormat);
</script>

<style scoped></style>
