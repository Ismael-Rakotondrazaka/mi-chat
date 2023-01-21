<template>
  <div class="flex flex-col items-end">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-col items-end max-w-xl ml-12">
      <div class="relative flex flex-row items-start peer gap-x-1">
        <vMenu
          v-if="conversationOpenedStore.messageOpenedId === id"
          :triggers="['focus', 'hover']"
          :distance="10"
          :placement="'left'"
          class="absolute shrink-0 -left-7"
        >
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

        <button @click="openMessageHandler">
          <MessageVideo
            :src="content"
            :pause="pauseVideoThumb"
            @video:paused="videoThumbPausedHandler"
          />
        </button>
      </div>

      <MessageDatePresenter :id="id" :date="createdAt" />
    </div>

    <VideoModal
      :shown="showModal"
      :src="content"
      :pause="pauseVideo"
      :needAuth="true"
      @close="closeModalHandler"
      @video:paused="videoPausedHandler"
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
import MessageVideo from "./MessageVideo.vue";
import DeleteMessage from "./DeleteMessage.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import MaximizeMediaButton from "./MaximizeMediaButton.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import VideoModal from "../commons/VideoModal.vue";
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
      return value === "video";
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

const pauseVideoThumb = ref(false);

const videoThumbPausedHandler = () => {
  if (pauseVideoThumb.value) {
    pauseVideoThumb.value = false;
  }
};

const pauseVideo = ref(false);
const videoPausedHandler = () => {
  if (pauseVideo.value) {
    pauseVideo.value = false;
  }
};

const showModal = ref(false);
const openModalHandler = () => {
  pauseVideoThumb.value = true;
  showModal.value = true;
};
const closeModalHandler = () => {
  pauseVideo.value = true;
  showModal.value = false;
};
</script>

<style scoped></style>
