<template>
  <div>
    <FatalErrorPresenter :error="fatalError" />

    <form @submit.prevent="updateUserHandler" method="POST">
      <NicknameInput
        @nickname:valid="validNicknameHandler"
        @nickname:invalid="invalidNicknameHandler"
        @resettled="resettled"
        :default="
          conversationOpenedStore.participant.participation.nickname || ''
        "
        :reset="reset"
      />

      <RoleInput
        v-show="canEditRole"
        @role:valid="validLevelHandler"
        @role:invalid="invalidLevelHandler"
        @resettled="resettled"
        :default="conversationOpenedStore.participant.participation.role"
        :reset="reset"
      />

      <div class="flex flex-row items-center justify-end w-full gap-x-3">
        <ButtonUI @click="cancelHandler" status="disabled" variant="outlined">
          Cancel
        </ButtonUI>

        <ButtonUI
          :isProcessing="updateParticipantProcessing"
          :hasError="!hasChange"
          status="info"
          type="submit"
        >
          Save changes
        </ButtonUI>
      </div>
    </form>
  </div>
</template>

<script setup>
import NicknameInput from "./NicknameInput.vue";
import ButtonUI from "../ui/ButtonUI.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import RoleInput from "./RoleInput.vue";
import { useConversationOpenedStore, useParticipantStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const conversationOpenedStore = useConversationOpenedStore();
const participantStore = useParticipantStore();
const router = useRouter();

const errors = ref({
  nickname: null,
  role: null,
});

const hasError = computed(() =>
  Object.values(errors.value).some((value) => !!value)
);

const fatalError = ref(null);

const nickname = ref("");
const validNicknameHandler = (newValue) => {
  errors.value.nickname = null;
  nickname.value = newValue;
};
const invalidNicknameHandler = (errorMessage) => {
  errors.value.nickname = errorMessage;
};
watch(nickname, (newValue) => {
  if (
    (newValue === "" &&
      conversationOpenedStore.participant.participation.nickname !== null) ||
    (newValue !== "" &&
      conversationOpenedStore.participant.participation.nickname !== newValue)
  ) {
    changes.value.nickname = true;
  } else {
    changes.value.nickname = false;
  }
});

const role = ref(conversationOpenedStore.participant.participation.role);
const validLevelHandler = (newValue) => {
  role.value = newValue;
  errors.value.role = null;
};
const invalidLevelHandler = (errorMessage) => {
  errors.value.role = errorMessage;
};
watch(role, (newValue) => {
  if (newValue !== conversationOpenedStore.participant.participation.role) {
    changes.value.role = true;
  } else {
    changes.value.role = false;
  }
});

const reset = ref(false);

const resettled = () => {
  reset.value = false;
};

const resetData = () => {
  reset.value = true;
};

const updateParticipantProcessing = ref(false);

const changes = ref({
  nickname: false,
  role: false,
});

const hasChange = computed(() =>
  Object.values(changes.value).some((value) => value)
);

const updateUserHandler = async () => {
  if (
    !updateParticipantProcessing.value &&
    !hasError.value &&
    hasChange.value
  ) {
    try {
      updateParticipantProcessing.value = true;
      fatalError.value = null;

      const data = {
        nickname: nickname.value,
        role: role.value,
      };

      await participantStore.updateParticipant({
        conversationId: conversationOpenedStore.conversation.id,
        participantId: conversationOpenedStore.participant.id,
        data: data,
      });

      updateParticipantProcessing.value = false;

      resetData();

      router.push({
        name: "participant-list",
        params: {
          conversationId: conversationOpenedStore.conversation.id,
        },
      });
    } catch (error) {
      updateParticipantProcessing.value = false;
      fatalError.value = error;
    }
  }
};

watch([nickname, role], () => {
  fatalError.value = null;
});

const cancelHandler = () => {
  resetData();

  router.push({
    name: "participant-list",
    params: {
      conversationId: conversationOpenedStore.conversation.id,
    },
  });
};

const canEditRole = computed(
  () =>
    conversationOpenedStore.conversation.type === "group" &&
    conversationOpenedStore.conversation.participation.role === "admin" &&
    conversationOpenedStore.participant.participation.role === "participant"
);
</script>

<style scoped></style>
