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
    @resolved="deleteConversationHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 v-if="type === 'group'" class="mb-2 text-lg font-bold">
        Delete the conversation
        <span class="text-info">
          {{ name }}
        </span>
        ?
      </h1>

      <h1 v-else>
        Delete the conversation with
        <span class="text-info">
          {{ converser.name.full }}
        </span>
        ?
      </h1>

      <InfoList :infos="infos" status="danger" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import InfoList from "../commons/InfoList.vue";
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
  type: {
    type: String,
    required: true,
  },
  name: {
    type: [String, null],
    required: false,
    default: null,
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
  updatedAt: {
    type: Date,
    required: true,
  },
  converser: {
    type: [Object, null],
    required: false,
    default: null,
  },
  participation: {
    type: [Object, null],
    required: false,
    default: null,
  },
});

const infos = computed(() => {
  let result = ["Messages on this chat will be permanently hidden for you."];

  result.push(
    props.type === "personal"
      ? `${props.converser.name.full} will continue to see the messages.`
      : "Others participants on this chat will continue to see the messages."
  );

  result.push("You will receive future messages.");

  if (props.type === "group") {
    result.push("You're still a participant on this chat.");
  }

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

const deleteConversationHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await conversationStore.destroyConversation({
      conversationId: props.id,
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
