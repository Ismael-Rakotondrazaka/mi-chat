<template>
  <div class="flex flex-col items-end">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-col items-end max-w-xl ml-12">
      <div class="relative flex flex-row items-start peer gap-x-1">
        <vMenu
          v-if="conversationOpenedStore.messageOpenedId === id"
          :triggers="['focus', 'hover']"
          :distance="10"
          placement="left"
          class="absolute shrink-0 -left-7"
        >
          <template #default>
            <MessageOptionButton />
          </template>

          <template #popper>
            <div class="p-1">
              <ul class="flex flex-row items-center justify-center">
                <li>
                  <DownloadFileButton :src="content" />
                </li>

                <li>
                  <DeleteMessageButton @click="openDeleteMessageHandler" />
                </li>
              </ul>
            </div>
          </template>
        </vMenu>

        <button @click="openMessageHandler">
          <MessageFile :src="content" />
        </button>
      </div>

      <div class="flex flex-row-reverse">
        <MessageDatePresenter :id="id" :date="createdAt" />
      </div>

      <DeleteMessage
        @close="closeDeleteMessage"
        :id="id"
        :conversationId="conversationId"
        :shown="showDeleteMessage"
      />
    </div>
  </div>
</template>

<script setup>
import MessageFile from "./MessageFile.vue";
import DeleteMessage from "./DeleteMessage.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import MessageDatePresenter from "./MessageDatePresenter.vue";
import MessageOptionButton from "./MessageOptionButton.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import DownloadFileButton from "./DownloadFileButton.vue";
import { useConversationOpenedStore } from "../../stores";

import { ref } from "vue";

const conversationOpenedStore = useConversationOpenedStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return value === "file";
    },
  },
  conversationId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  sender: {
    type: Object,
    required: true,
  },
});

const openMessageHandler = () => {
  conversationOpenedStore.toggleMessage(props.id);
};

const showDeleteMessage = ref(false);
const openDeleteMessageHandler = () => {
  showDeleteMessage.value = true;
};
const closeDeleteMessage = () => {
  showDeleteMessage.value = false;
};
</script>

<style scoped></style>
