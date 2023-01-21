<template>
  <div class="flex flex-col items-center w-full p-3">
    <CustomNavigationLoader class="sticky top-0 w-full max-w-md bg-sky-50" />

    <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
      <HeaderTextLoader />
    </div>

    <CreateConversationLoader class="w-full max-w-md" />
  </div>
</template>

<script setup>
import CreateConversationLoader from "./CreateConversationLoader.vue";
import CustomNavigationLoader from "./CustomNavigationLoader.vue";
import HeaderTextLoader from "./HeaderTextLoader.vue";
</script>

<style scoped></style>
