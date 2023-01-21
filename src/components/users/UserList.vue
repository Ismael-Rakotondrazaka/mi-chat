<template>
  <TransitionGroup name="list" tag="ul">
    <li
      v-for="user in users"
      :key="user.id"
      class="w-full mb-3 first:mt-0 md:mb-4"
    >
      <UserItem
        :id="user.id"
        :name="user.name"
        :imageUrl="user.imageUrl"
        :description="user.description"
        :createdAt="user.createdAt"
        :friendship="user.friendship"
      />
    </li>
  </TransitionGroup>
</template>

<script setup>
import UserItem from "./UserItem.vue";

defineProps({
  users: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style scoped></style>
