<template>
  <PopUp
    :shown="shown"
    status="danger"
    title="Confirm"
    rejectButtonValue="Cancel"
    resolveButtonValue="Yes, logout"
    :isProcessing="isProcessing"
    @closed="closedHandler"
    @rejected="rejectedHandler"
    @resolved="endSessionHandler"
  >
    <div class="w-full px-3 pt-2">
      <FatalErrorPresenter :error="fatalError" />

      <h1 class="mb-2 text-lg font-bold">Logout on this device?</h1>

      <InfoList :infos="infos" status="danger" />
    </div>
  </PopUp>
</template>

<script setup>
import PopUp from "../commons/PopUp.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import InfoList from "../commons/InfoList.vue";
import { useSessionStore } from "../../stores";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const sessionStore = useSessionStore();
const router = useRouter();

defineProps({
  shown: {
    type: Boolean,
    required: true,
  },
});

const infos = computed(() => {
  let result = [
    "You will be marked as inactive, unless you are connected with another device.",
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

const endSessionHandler = async () => {
  try {
    isProcessing.value = true;
    fatalError.value = null;

    await sessionStore.endSession();

    resetData();
    emit("close");

    router.push({
      name: "home",
    });
  } catch (error) {
    isProcessing.value = false;
    fatalError.value = error;
  }
};
</script>

<style></style>
