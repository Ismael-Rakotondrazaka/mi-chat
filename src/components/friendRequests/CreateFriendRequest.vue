<template>
  <PopUp
    :shown="shown"
    status="info"
    title="Confirm"
    rejectButtonValue="Cancel"
    resolveButtonValue="Yes, send"
    :isProcessing="isProcessing"
    @closed="closedHandler"
    @rejected="rejectedHandler"
    @resolved="storeFriendRequestHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">
        Send friend request to
        <span class="text-info"> {{ name.full }}</span
        >?
      </h1>

      <InfoList :infos="infos" status="info" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import InfoList from "../commons/InfoList.vue";
import { useFriendRequestStore } from "../../stores";

import { ref, computed } from "vue";

const friendRequestStore = useFriendRequestStore();

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
});

const infos = computed(() => {
  let result = [`${props.name.full} will be notified.`];

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

const storeFriendRequestHandler = async () => {
  if (!isProcessing.value) {
    try {
      isProcessing.value = true;
      fatalError.value = null;

      await friendRequestStore.storeFriendRequest({
        data: {
          userId: props.id,
        },
      });

      resetData();
      emit("close");
    } catch (error) {
      isProcessing.value = false;
      fatalError.value = error;
    }
  }
};
</script>

<style></style>
