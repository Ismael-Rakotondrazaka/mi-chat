<template>
  <div
    class="flex flex-col px-3 py-5 bg-white border-2 rounded-lg border-border"
  >
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="mb-5 w-fit last:mb-0"
      :class="[message.type === 'sent' ? 'self-end ml-5' : 'self-start mr-5']"
    >
      <MessageSentUI v-if="message.type === 'sent'">
        {{ message.content }}
      </MessageSentUI>

      <MessageReceivedUI v-else-if="message.type === 'received'">
        {{ message.content }}
      </MessageReceivedUI>
    </div>
  </div>
</template>

<script setup>
import MessageSentUI from "@/components/ui/MessageSentUI.vue";
import MessageReceivedUI from "@/components/ui/MessageReceivedUI.vue";

import { ref } from "vue";

const messages = ref([
  {
    type: "sent",
    content: "I saw on your profile that you are a model",
  },
  {
    type: "received",
    content: "Yes, that's true\nAnd you?",
  },
  {
    type: "sent",
    content: "I work for a photography agency",
  },
  {
    type: "sent",
    content: "We have an offer that might interest you",
  },
  {
    type: "received",
    content: "Yes, I'm interested",
  },
  {
    type: "sent",
    content:
      "So, I'm going to add you to our group chat\nAnd you will see in it the additional information",
  },
  {
    type: "received",
    content: "That's fine",
  },
]);
</script>

<style scoped></style>
