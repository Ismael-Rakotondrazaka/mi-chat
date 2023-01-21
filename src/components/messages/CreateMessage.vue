<template>
  <form
    class="flex flex-row items-start w-full h-full gap-x-3"
    @submit.prevent="sendMessageHandler"
    method="POST"
  >
    <!--
        adding the line below make sending message when clicking enter
        but it creates a conflict with shift+enter on mobile device
        @keyup.enter.exact.prevent="submitMessageHandler" 
        -->
    <textarea
      v-if="editorMode === 'text'"
      name=""
      v-model="textMessage"
      id=""
      cols=""
      rows=""
      placeholder="Type message"
      class="w-full h-full px-3 text-lg leading-5 rounded-lg resize-none bg-slate-100 focus-visible:outline-none"
      autofocus
    ></textarea>

    <div
      v-else-if="editorMode === 'file'"
      class="px-3 w-[90%] sm:w-[95%] h-full leading-5 rounded-lg relative resize-none focus-visible:outline-none bg-emerald-50 bg-opacity-80"
    >
      <input
        @change="fileMessageChangeHandler"
        type="file"
        class="block mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-sky-400 file:text-white hover:file:bg-sky-500 hover:cursor-pointer"
        id="fileMessage"
        name="fileMessage"
        ref="fileMessageRef"
      />

      <ErrorPresenter :error="errors.file" class="my-1 w-max" />

      <button
        @click="cancelFileMessageHandler"
        class="absolute top-0 right-0 mr-3 text-xl text-red-400"
      >
        <fa-icon icon="xmark" />

        <span class="sr-only">Cancel</span>
      </button>
    </div>

    <div class="w-[10%] sm:w-[5%] h-full shrink-0">
      <div
        class="flex flex-col items-start justify-between h-full"
        :class="[buttonIconClass]"
      >
        <div class="w-full">
          <div class="relative w-full h-0">
            <p
              class="absolute text-center -bottom-[3px] text-xs font-bold whitespace-nowrap w-full text-black"
              style="font-size: 0.5rem"
            >
              {{ textMessage.trim().length }}/300
            </p>
          </div>

          <button
            v-tooltip.top="{
              triggers: [],
              shown: showTooltip,
              content: tooltipContent,
              distance: 20,
            }"
            class="w-full hover:cursor-pointer"
            type="submit"
          >
            <fa-icon icon="paper-plane" class="w-full text-2xl" />

            <span class="sr-only">Send</span>
          </button>
        </div>

        <div class="w-full">
          <button @click="toggleEditorMode" class="w-full">
            <fa-icon icon="file-upload" class="w-full text-2xl" />

            <span class="sr-only">Send file</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import ErrorPresenter from "../errors/ErrorPresenter.vue";
import {
  useConversationOpenedStore,
  useSocketStore,
  useMessageStore,
} from "../../stores";
import { fileConfig, messageConfig } from "../../configs";

import { ref, computed, watch } from "vue";

const conversationOpenedStore = useConversationOpenedStore();
const socketStore = useSocketStore();
const messageStore = useMessageStore();

const editorMode = ref("text");

const toggleEditorMode = () => {
  if (editorMode.value === "text") {
    editorMode.value = "file";
  } else if (editorMode.value === "file") {
    editorMode.value = "text";
  }
};

const textMessage = ref("");

const fileMessage = ref(null);

const fileMessageRef = ref(null);

const canSendMessage = computed(() => {
  let result = false;

  if (conversationOpenedStore.conversation?.type === "personal") {
    if (conversationOpenedStore.converser.friendship.isFriend) {
      result = true;
    }
  } else if (conversationOpenedStore.conversation?.type === "group") {
    if (conversationOpenedStore.conversation.participation) {
      result = true;
    }
  }

  return result;
});

const errors = ref({
  file: null,
  text: null,
});

const hasError = computed(() => !!errors.value[editorMode.value]);

const showTooltip = computed(
  () => !!errors.value.text || !canSendMessage.value
);

const tooltipContent = computed(() => {
  let result = "";

  if (!canSendMessage.value) {
    result = "Can't send messages on this chat.";
  } else if (errors.value.text) {
    result = errors.value.text;
  }

  return result;
});

const buttonIconClass = computed(() =>
  canSendMessage.value ? "text-white" : "text-slate-600"
);

const fatalError = ref(null);

const resetText = () => {
  textMessage.value = "";
};

const resetFile = () => {
  fileMessage.value = null;
  if (fileMessageRef.value) {
    fileMessageRef.value.files = new DataTransfer().files;
  }
};

const resetData = () => {
  errors.value = {
    file: null,
    text: null,
  };
  fatalError.value = null;
  resetText();
  resetFile();
};

const cancelFileMessageHandler = () => {
  resetFile();
  errors.value.file = null;
  editorMode.value = "text";
};

const fileMessageChangeHandler = (event) => {
  fileMessage.value = event.target.files[0];

  if (fileMessage.value.size > fileConfig.MAX_FILE_SIZE) {
    errors.value.file = `File too large. ${Math.round(
      fileConfig.MAX_FILE_SIZE / 1000000
    )} Mb is the maximum allowed.`;
  } else {
    errors.value.file = null;
  }
};

watch(textMessage, (newValue) => {
  const trimmed = newValue.trim();

  const maxMessageLength = messageConfig.MAX_MESSAGE_LENGTH;

  if (trimmed.length > maxMessageLength) {
    errors.value.text = `Message too long. ${maxMessageLength} characters is the maximum allowed.`;
  } else {
    errors.value.text = null;
  }
});

const sendFileMessage = async () => {
  if (!hasError.value && fileMessage.value) {
    try {
      fatalError.value = null;
      const formData = new FormData();

      formData.append("content", fileMessage.value);

      await messageStore.storeMessage({
        conversationId: conversationOpenedStore.conversation?.id,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resetFile();

      editorMode.value = "text";
    } catch (error) {
      fatalError.value = error;
    }
  }
};

const sendTextMessage = () => {
  if (!hasError.value && textMessage.value && socketStore.isConnected) {
    try {
      fatalError.value = null;

      const trimmed = textMessage.value.trim();

      const data = {
        conversationId: conversationOpenedStore.conversation?.id,
        content: trimmed,
      };

      socketStore.socketIO.emit("messages:store", data);

      resetText();
    } catch (error) {
      fatalError.value = error;
    }
  }
};

const sendMessageHandler = async () => {
  if (canSendMessage.value) {
    if (editorMode.value === "text") {
      sendTextMessage();
    } else if (editorMode.value === "file") {
      await sendFileMessage();
    }
  }
};

watch(
  () => conversationOpenedStore.conversation?.id,
  () => {
    resetData();
    editorMode.value = "text";
  }
);
</script>

<style scoped></style>
