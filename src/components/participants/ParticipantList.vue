<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="participant in participants"
      :key="participant.id"
      class="w-full mb-3 first:mt-0 md:mb-4"
    >
      <ParticipantItem
        :conversationId="conversation.id"
        :conversationName="conversation.name"
        :conversationType="conversation.type"
        :conversationDescription="conversation.description"
        :conversationImageUrl="conversation.imageUrl"
        :conversationConverser="conversation.converser"
        :conversationParticipation="conversation.participation"
        :conversationCreatedAt="conversation.createdAt"
        :conversationUpdatedAt="conversation.updatedAt"
        :id="participant.id"
        :name="participant.name"
        :imageUrl="participant.imageUrl"
        :description="participant.description"
        :createdAt="participant.createdAt"
        :friendship="participant.friendship"
        :participation="participant.participation"
      />
    </li>
  </TransitionGroup>
</template>

<script setup>
import ParticipantItem from "./ParticipantItem.vue";

defineProps({
  conversation: {
    type: Object,
    required: true,
  },
  participants: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style scoped></style>
