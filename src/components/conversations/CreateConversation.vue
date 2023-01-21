<template>
  <div>
    <FatalErrorPresenter :error="fatalError" />

    <form @submit.prevent="storeConversationHandler" method="POST">
      <GroupNameInput
        default=""
        :reset="reset"
        @resettled="resettled"
        @groupName:valid="validGroupNameHandler"
        @groupName:invalid="invalidGroupNameHandler"
      />

      <DescriptionInput
        default=""
        :reset="reset"
        @resettled="resettled"
        @description:valid="validDescriptionHandler"
        @description:invalid="invalidDescriptionHandler"
      />

      <div>
        <label for="">Select members through your friends:</label>

        <ErrorPresenter :error="errors.participants" />

        <SelectUser
          :users="friendStore.friends"
          @update:usersIds="updateUsersIdsHandler"
          :reset="reset"
          @resettled="resettled"
          class="mb-5"
        />
      </div>

      <div class="w-full mb-5">
        <label class="inline-block mb-2" for="profileImage">
          <span class="">Choose profile photo:</span>
        </label>

        <ErrorPresenter :error="errors.profileImage" />

        <input
          @change="profileImageChangeHandler"
          type="file"
          class="block w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-sky-400 file:text-white hover:file:bg-sky-500 hover:cursor-pointer"
          id="profileImage"
          name="profileImage"
          ref="profileImageRef"
        />
      </div>

      <div class="flex flex-row items-center justify-end w-full gap-x-3">
        <ButtonUI @click="cancelHandler" status="disabled" variant="outlined">
          Cancel
        </ButtonUI>

        <ButtonUI
          :isProcessing="storeConversationProcessing"
          :hasError="hasError"
          status="info"
          type="submit"
        >
          Create group chat
        </ButtonUI>
      </div>
    </form>
  </div>
</template>

<script setup>
import SelectUser from "../users/SelectUser.vue";
import ButtonUI from "../ui/ButtonUI.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import ErrorPresenter from "../errors/ErrorPresenter.vue";
import GroupNameInput from "../conversations/GroupNameInput.vue";
import DescriptionInput from "../conversations/DescriptionInput.vue";
import { imageConfig, conversationConfig } from "../../configs";
import { useConversationStore, useFriendStore } from "../../stores";

import { useRouter } from "vue-router";
import { ref, computed, watch } from "vue";

const conversationStore = useConversationStore();
const friendStore = useFriendStore();
const router = useRouter();

const errors = ref({
  groupName: null,
  description: null,
  profileImage: null,
  participants: null,
});

const hasError = computed(() =>
  Object.values(errors.value).some((value) => !!value)
);

const groupName = ref("");
const validGroupNameHandler = (newValue) => {
  errors.value.groupName = null;
  groupName.value = newValue;
};
const invalidGroupNameHandler = (errorMessage) => {
  errors.value.groupName = errorMessage;
};

const profileImageRef = ref(null);
const profileImage = ref(null);
const profileImageChangeHandler = (event) => {
  profileImage.value = event.target.files[0];

  if (imageConfig.IMAGE_MIME_TYPES.includes(profileImage.value.type)) {
    if (profileImage.value.size > imageConfig.MAX_IMAGE_SIZE) {
      errors.value.profileImage = `File too large. ${imageConfig.MAX_IMAGE_SIZE} Bytes is the maximum allowed for the image.`;
    } else if (profileImage.value.size < imageConfig.MIN_IMAGE_SIZE) {
      errors.value.profileImage = `File too small. ${imageConfig.MIN_IMAGE_SIZE} Bytes is the minimum allowed for image.`;
    } else {
      errors.value.profileImage = null;
    }
  } else {
    errors.value.profileImage = "Invalid image format.";
  }
};

const description = ref("");
const validDescriptionHandler = (newValue) => {
  errors.value.description = null;
  description.value = newValue;
};
const invalidDescriptionHandler = (errorMessage) => {
  errors.value.description = errorMessage;
};

const participantsIds = ref([]);
const updateUsersIdsHandler = (newValue) => {
  participantsIds.value = newValue;
};
watch(
  () => participantsIds.value.length,
  (newValue) => {
    if (newValue < conversationConfig.MIN_GROUP_PARTICIPANT_COUNT - 1) {
      // - 1 because authUserId will be added automatically
      errors.value.participants = `Need at least ${
        conversationConfig.MIN_GROUP_PARTICIPANT_COUNT - 1
      } members apart from you.`;
    } else {
      errors.value.participants = null;
    }
  },
  {
    immediate: true,
  }
);

const fatalError = ref(null);

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};
const resetData = () => {
  errors.value = {
    groupName: null,
    description: null,
    profileImage: null,
    participants: null,
  };
  fatalError.value = null;
  groupName.value = "";
  profileImage.value = null;
  profileImageRef.value.files = new DataTransfer().files;
  description.value = "";
  participantsIds.value = [];
  reset.value = true;
};

const cancelHandler = () => {
  resetData();
  router.push({
    name: "conversation-list",
  });
};

const storeConversationProcessing = ref(false);
const storeConversationHandler = async () => {
  if (!storeConversationProcessing.value && !hasError.value) {
    try {
      storeConversationProcessing.value = true;
      fatalError.value = null;

      const formData = new FormData();

      formData.append("groupName", groupName.value);

      formData.append("participants", participantsIds.value);

      if (description.value) {
        formData.append("description", description.value);
      }

      if (profileImage.value) {
        formData.append("profileImage", profileImage.value);
      }

      await conversationStore.storeConversation({
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      storeConversationProcessing.value = false;
      resetData();

      router.push({
        name: "conversation-list",
      });
    } catch (error) {
      storeConversationProcessing.value = false;
      fatalError.value = error;
    }
  }
};
</script>

<style scoped></style>
