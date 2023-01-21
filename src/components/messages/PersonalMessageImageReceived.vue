<template>
  <div class="flex flex-col">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-col self-start justify-start max-w-xl mr-7">
      <div class="relative flex flex-row items-start w-fit gap-x-1">
        <button @click="openMessageHandler">
          <MessageImage :src="content" />
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
                    <MaximizeMediaButton @click="openModalHandler" />
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

    <ImageModal
      @close="closeModalHandler"
      :shown="showModal"
      :src="content"
      :needAuth="true"
    />

    <DeleteMessage
      @close="closeDeleteMessage"
      :conversationId="conversationId"
      :shown="showDeleteMessage"
      :id="id"
    />
  </div>
</template>

<script setup>
import MessageImage from "./MessageImage.vue";
import DeleteMessage from "./DeleteMessage.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import MaximizeMediaButton from "./MaximizeMediaButton.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import ImageModal from "../commons/ImageModal.vue";
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
      return value === "image";
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
  conversationId: {
    type: Number,
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

const showModal = ref(false);
const openModalHandler = () => {
  showModal.value = true;
};
const closeModalHandler = () => {
  showModal.value = false;
};
</script>

<style scoped></style>
