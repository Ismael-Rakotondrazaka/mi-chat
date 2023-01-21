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
    @resolved="deleteFriendRequestHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">
        Delete the friend request from
        <span class="text-info"> {{ sender.name.full }}</span
        >?
      </h1>

      <InfoList :infos="infos" status="danger" />
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
  receiverId: {
    type: Number,
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

const infos = computed(() => {
  let result = [`${props.sender.name.first} will be notified.`];

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

const deleteFriendRequestHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await friendRequestStore.destroyFriendRequest({
      friendRequestId: props.id,
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
