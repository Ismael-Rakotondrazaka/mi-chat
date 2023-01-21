<template>
  <div class="flex flex-col">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-row items-start self-start max-w-xl gap-2 mr-7">
      <AvatarUI :src="sender.imageUrl" :size="'xs'" class="mt-[2px]" />

      <div>
        <h2
          class="text-xs md:text-base font-semibold"
          :class="[senderNameClass]"
        >
          {{ senderName }}
        </h2>

        <div class="flex flex-row items-start w-fit gap-x-1">
          <button @click="openMessageHandler">
            <MessageVideo
              :src="content"
              :pause="pauseVideoThumb"
              @video:paused="videoThumbPausedHandler"
            />
          </button>

          <div
            v-if="conversationOpenedStore.messageOpenedId === id"
            class="shrink-0"
          >
            <vMenu
              :distance="10"
              :triggers="['focus', 'hover']"
              :placement="'right'"
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
          </div>
        </div>

        <MessageDatePresenter :id="id" :date="createdAt" />
      </div>
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
import AvatarUI from "../ui/AvatarUI.vue";
import MessageVideo from "./MessageVideo.vue";
import DeleteMessage from "./DeleteMessage.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import MaximizeMediaButton from "./MaximizeMediaButton.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import VideoModal from "../commons/VideoModal.vue";
import MessageOptionButton from "./MessageOptionButton.vue";
import MessageDatePresenter from "./MessageDatePresenter.vue";
import { useConversationOpenedStore } from "../../stores";

import { ref, computed } from "vue";

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

const senderName = computed(
  () => props.sender.participation?.nickname || props.sender.name.first
);

const senderNameClass = computed(() =>
  props.sender.participation ? "text-emerald-700" : "text-slate-500"
);

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
