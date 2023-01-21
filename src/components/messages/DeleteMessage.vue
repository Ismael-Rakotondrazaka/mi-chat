<template>
  <PopUp
    :shown="shown"
    status="danger"
    title="Confirm"
    rejectButtonValue="Cancel"
    resolveButtonValue="Yes, delete"
    :isProcessing="isProcessing"
    @closed="closedHandler"
    @rejected="rejectedHandler"
    @resolved="destroyMessageHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">Delete the message?</h1>

      <InfoList :infos="infos" status="danger" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import InfoList from "../commons/InfoList.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import { useMessageStore } from "../../stores";

import { ref, computed } from "vue";

const messageStore = useMessageStore();

const props = defineProps({
  shown: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  conversationId: {
    type: Number,
    required: true,
  },
});

const infos = computed(() => {
  let result = [
    "The message will be hidden only for you.",
    "Others participants on this chat will continue to see the message.",
  ];

  return result;
});

const fatalError = ref(null);
const isProcessing = ref(false);

const resetData = () => {
  isProcessing.value = false;
  fatalError.value = null;
};

const emit = defineEmits(["close"]);

const closedHandler = () => {
  resetData();
  emit("close");
};

const rejectedHandler = () => {
  resetData();
  emit("close");
};

const destroyMessageHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await messageStore.destroyMessage({
      conversationId: props.conversationId,
      messageId: props.id,
    });

    resetData();
    emit("close");
  } catch (error) {
    isProcessing.value = false;
    fatalError.value = error;
  }
};
</script>

<style></style>
