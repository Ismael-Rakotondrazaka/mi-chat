<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="friendRequest in friendRequests"
      :key="friendRequest.id"
      class="w-full mb-3 first:mt-0 md:mb-4"
    >
      <FriendRequestItem
        :id="friendRequest.id"
        :receiverId="friendRequest.receiverId"
        :createdAt="friendRequest.createdAt"
        :sender="friendRequest.sender"
      />
    </li>
  </TransitionGroup>
</template>

<script setup>
import FriendRequestItem from "./FriendRequestItem.vue";

defineProps({
  friendRequests: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style scoped></style>
