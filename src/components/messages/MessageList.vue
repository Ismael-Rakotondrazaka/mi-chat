<template>
  <ol>
    <li v-for="message in messages" :key="message.id" class="mb-3">
      <component
        :is="checkMessageComponent(message)"
        :id="message.id"
        :conversationId="message.conversationId"
        :type="message.type"
        :content="message.content"
        :createdAt="message.createdAt"
        :sender="message.sender"
      />
    </li>
  </ol>
</template>

<script setup>
import GroupMessageTextReceived from "./GroupMessageTextReceived.vue";
import GroupMessageImageReceived from "./GroupMessageImageReceived.vue";
import GroupMessageVideoReceived from "./GroupMessageVideoReceived.vue";
import GroupMessageFileReceived from "./GroupMessageFileReceived.vue";
import PersonalMessageTextReceived from "./PersonalMessageTextReceived.vue";
import PersonalMessageImageReceived from "./PersonalMessageImageReceived.vue";
import PersonalMessageVideoReceived from "./PersonalMessageVideoReceived.vue";
import PersonalMessageFileReceived from "./PersonalMessageFileReceived.vue";
import MessageTextSent from "./MessageTextSent.vue";
import MessageImageSent from "./MessageImageSent.vue";
import MessageVideoSent from "./MessageVideoSent.vue";
import MessageFileSent from "./MessageFileSent.vue";

import { useUserStore } from "../../stores";

const userStore = useUserStore();

const props = defineProps({
  messages: {
    type: Array,
    required: false,
    default: () => [],
  },
  conversationType: {
    type: String,
    required: true,
    validator: (value) => {
      return ["group", "personal"].includes(value);
    },
  },
});

const checkMessageComponent = (message) => {
  const messageSentType = {
    text: MessageTextSent,
    image: MessageImageSent,
    video: MessageVideoSent,
    file: MessageFileSent,
  };

  const personalMessageReceivedType = {
    text: PersonalMessageTextReceived,
    image: PersonalMessageImageReceived,
    video: PersonalMessageVideoReceived,
    file: PersonalMessageFileReceived,
  };

  const groupMessageReceivedType = {
    text: GroupMessageTextReceived,
    image: GroupMessageImageReceived,
    video: GroupMessageVideoReceived,
    file: GroupMessageFileReceived,
  };

  if (userStore.is(message.sender.id)) {
    return messageSentType[message.type];
  } else {
    if (props.conversationType === "personal") {
      return personalMessageReceivedType[message.type];
    } else if (props.conversationType === "group") {
      return groupMessageReceivedType[message.type];
    }
  }
};
</script>

<style scoped></style>
