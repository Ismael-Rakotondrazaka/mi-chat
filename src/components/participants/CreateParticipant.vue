<template>
  <div>
    <FatalErrorPresenter :error="fatalError" />

    <form @submit.prevent="storeParticipantHandler" method="POST">
      <label for="">Select new members through your friends:</label>

      <ErrorPresenter :error="errors.participants" />

      <SelectUser
        :users="friendsFiltered"
        @update:usersIds="updateUsersIdsHandler"
        :reset="reset"
        @resettled="resettled"
        class="mb-5"
      />

      <div class="flex flex-row items-center justify-end w-full gap-x-3">
        <ButtonUI @click="cancelHandler" status="disabled" variant="outlined">
          Cancel
        </ButtonUI>

        <ButtonUI
          :isProcessing="createParticipantProcessing"
          :hasError="hasError"
          status="info"
          type="submit"
        >
          Add new members
        </ButtonUI>
      </div>
    </form>
  </div>
</template>

<script setup>
import SelectUser from "../users/SelectUser.vue";
import ButtonUI from "../ui/ButtonUI.vue";
import ErrorPresenter from "../errors/ErrorPresenter.vue";
import {
  useConversationOpenedStore,
  useFriendStore,
  useParticipantStore,
} from "../../stores";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";

const friendStore = useFriendStore();
const participantStore = useParticipantStore();
const conversationOpenedStore = useConversationOpenedStore();
const router = useRouter();

const participantsIds = ref([]);

const updateUsersIdsHandler = (newValue) => {
  participantsIds.value = newValue;
};

const errors = ref({
  participants: null,
});

watch(
  () => participantsIds.value.length,
  (newValue) => {
    if (newValue > 0) {
      errors.value.participants = null;
    } else {
      errors.value.participants = "Need at least 1 new member.";
    }
  },
  {
    immediate: true,
  }
);

const errorsArr = computed(() =>
  Object.values(errors.value).reduce((prev, curr) => {
    if (curr) {
      return prev.concat(curr);
    } else {
      return prev;
    }
  }, [])
);

const hasError = computed(() => errorsArr.value.length > 0);

const fatalError = ref(null);

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};
const resetData = () => {
  reset.value = true;
  fatalError.value = null;
  errors.value = {
    participants: null,
  };
};

const cancelHandler = () => {
  resetData();
  router.push({
    name: "participant-list",
    params: {
      conversationId: conversationOpenedStore.conversation.id,
    },
  });
};

const alreadyParticipantsIds = computed(() =>
  conversationOpenedStore.participants.map((participant) => participant.id)
);

const friendsFiltered = computed(() =>
  friendStore.friends.filter(
    (friend) => !alreadyParticipantsIds.value.includes(friend.id)
  )
);

const createParticipantProcessing = ref(false);

const storeParticipantHandler = async () => {
  if (!createParticipantProcessing.value && !hasError.value) {
    try {
      createParticipantProcessing.value = true;
      fatalError.value = null;

      const data = {
        participants: participantsIds.value,
      };

      await participantStore.storeParticipant({
        conversationId: conversationOpenedStore.conversation.id,
        data: data,
      });

      createParticipantProcessing.value = false;

      resetData();

      router.push({
        name: "participant-list",
        params: {
          conversationId: conversationOpenedStore.conversation.id,
        },
      });
    } catch (error) {
      createParticipantProcessing.value = false;
      fatalError.value = error;
    }
  }
};
</script>

<style scoped></style>
