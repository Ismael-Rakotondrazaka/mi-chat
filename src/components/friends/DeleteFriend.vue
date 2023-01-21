<template>
  <PopUp
    :shown="shown"
    status="danger"
    title="Unfriend"
    rejectButtonValue="Cancel"
    resolveButtonValue="Yes, unfriend"
    :isProcessing="isProcessing"
    @closed="closedHandler"
    @rejected="rejectedHandler"
    @resolved="deleteFriendHandler"
  >
    <div class="px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">
        Remove
        <span class="text-sky-400">{{ name.full }}</span> from your friend list?
      </h1>

      <InfoList :infos="infos" status="danger" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import InfoList from "../commons/InfoList.vue";
import { useFriendStore } from "../../stores";

import { ref, computed } from "vue";

const friendStore = useFriendStore();

const isProcessing = ref(false);
const fatalError = ref(null);

const emit = defineEmits(["close"]);

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
    required: false,
  },
  friendship: {
    type: Object,
    required: true,
  },
});

const infos = computed(() => {
  let result = ["You won't be able to send messages each over."];

  return result;
});

const resetData = () => {
  isProcessing.value = false;
  fatalError.value = null;
};

const closedHandler = () => {
  resetData();
  emit("close");
};

const rejectedHandler = () => {
  resetData();
  emit("close");
};

const deleteFriendHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await friendStore.destroyFriend({
      userId: props.id,
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
