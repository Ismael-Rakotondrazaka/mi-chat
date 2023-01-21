<template>
  <div class="flex flex-col">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-col self-start justify-start max-w-xl mr-7">
      <div class="relative flex flex-row items-start w-fit gap-x-1">
        <button @click="openMessageHandler">
          <MessageFile :src="content" />
        </button>

        <div
          v-if="conversationOpenedStore.messageOpenedId === id"
          class="absolute -right-7"
        >
          <vMenu :distance="10" :placement="'right'">
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
        </div>
      </div>

      <MessageDatePresenter :id="id" :date="createdAt" />
    </div>

    <DeleteMessage
      @close="closeDeleteMessage"
      :conversationId="conversationId"
      :shown="showDeleteMessage"
      :id="id"
    />
  </div>
</template>

<script setup>
import MessageFile from "./MessageFile.vue";
import DeleteMessage from "./DeleteMessage.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import DownloadFileButton from "./DownloadFileButton.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import MessageOptionButton from "./MessageOptionButton.vue";
import MessageDatePresenter from "./MessageDatePresenter.vue";
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
