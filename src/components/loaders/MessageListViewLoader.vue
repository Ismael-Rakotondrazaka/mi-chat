<template>
  <div>
    <div
      v-if="showConversationList"
      class="fixed top-0 bottom-0 left-[0%] md:left-[20%] md:w-[34.166666%] xl:w-3/12"
    >
      <div class="flex flex-col w-full p-3">
        <SearchBarLoader class="w-full" />
      </div>

      <div
        class="fixed overflow-y-auto top-20 bottom-0 left-[0%] md:left-[20%] w-[100%] md:w-[34.166666%] xl:w-3/12 px-3"
      >
        <div class="relative w-full">
          <ItemListLoader />
        </div>
      </div>
    </div>

    <div
      class="fixed top-0 bottom-0 left-[0%] md:left-[20%] lg:left-[54.166666%] xl:left-[45%] right-0"
    >
      <MessageListHeaderLoader />

      <div
        class="fixed pt-0 overflow-y-auto overflow-x-hidden top-16 bottom-24 left-[0%] right-0 border border-primary md:left-[20%] lg:left-[54.166666%] xl:left-[45%] scroll-smooth p-3"
        ref="messageArea"
        @scroll="setCanScroll"
      >
        <MessageListLoader />
      </div>

      <div
        class="fixed bottom-0 h-24 p-3 bg-emerald-400 left-[0%] md:left-[20%] lg:left-[54.166666%] xl:left-[45%] right-0"
      >
        <CreateMessageLoader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useScreenStore } from "../../stores";
import CreateMessageLoader from "./CreateMessageLoader.vue";
import ItemListLoader from "./ItemListLoader.vue";
import MessageListHeaderLoader from "./MessageListHeaderLoader.vue";
import MessageListLoader from "./MessageListLoader.vue";
import SearchBarLoader from "./SearchBarLoader.vue";

const screenStore = useScreenStore();

const showConversationList = computed(() => screenStore.width >= 1024);
</script>

<style scoped></style>
