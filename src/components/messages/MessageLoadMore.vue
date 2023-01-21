<template>
  <div
    v-if="conversationOpenedStore.canShowMoreMessages"
    class="flex flex-col items-center justify-center pt-3"
  >
    <button @click="loadMoreMessageHandler">
      <fa-icon
        icon="rotate-right"
        class="text-xl text-info"
        :class="{
          'animate-spin': isLoading,
        }"
      />

      <span class="sr-only">Load more</span>
    </button>
  </div>
</template>

<script setup>
import { useConversationOpenedStore } from "../../stores";
import { ref } from "vue";

const conversationOpenedStore = useConversationOpenedStore();

const isLoading = ref(false);

const loadMoreMessageHandler = () => {
  isLoading.value = true;
  conversationOpenedStore.showMoreMessages();

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>

<style scoped></style>
