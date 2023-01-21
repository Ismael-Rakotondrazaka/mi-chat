<template>
  <PopUp
    :shown="shown"
    status="danger"
    title="Confirm"
    rejectButtonValue="Cancel"
    resolveButtonValue="Yes, leave"
    :isProcessing="isProcessing"
    @closed="closedHandler"
    @rejected="rejectedHandler"
    @resolved="deleteParticipationHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">
        Remove
        <span class="text-info"> {{ name.full }}</span>
        from the group
        <span class="text-info"> {{ conversationName }} </span>?
      </h1>

      <InfoList :infos="infos" status="danger" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import InfoList from "../commons/InfoList.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import { useConversationStore } from "../../stores";

import { ref, computed } from "vue";

const conversationStore = useConversationStore();

const props = defineProps({
  shown: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: Object,
    required: true,
  },
  imageUrl: {
    type: [String, null],
    required: false,
    default: null,
  },
  description: {
    type: [String, null],
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  participation: {
    type: Object,
    required: true,
  },
  conversationId: {
    type: Number,
    required: true,
  },
  conversationName: {
    type: String,
    required: true,
  },
});

const infos = computed(() => {
  let result = [
    `${props.name.first} will no longer be a participant on this chat.`,
    `${props.name.first} will no longer receive new messages on this chat.`,
    `${props.name.first} can see old messages on this chat, unless he/she delete them.`,
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

const deleteParticipationHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await conversationStore.destroyParticipant({
      conversationId: props.conversationId,
      participantId: props.id,
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
