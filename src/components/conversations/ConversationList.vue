<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="conversation in conversations"
      :key="conversation.id"
      class="w-full mb-3 first:mt-0 md:mb-4"
    >
      <ConversationItem
        :id="conversation.id"
        :type="conversation.type"
        :name="conversation.name"
        :imageUrl="conversation.imageUrl"
        :description="conversation.description"
        :createdAt="conversation.createdAt"
        :updatedAt="conversation.updatedAt"
        :converser="conversation.converser || null"
        :participation="conversation.participation"
        :latestMessage="conversation.latestMessage"
        :unreadMessagesCount="conversation.unreadMessagesCount"
      />
    </li>
  </TransitionGroup>
</template>

<script setup>
import ConversationItem from "./ConversationItem.vue";

defineProps({
  conversations: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style scoped></style>
