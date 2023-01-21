<template>
  <div>
    <FatalErrorPresenter :error="fatalError" />

    <form @submit.prevent="editConversationHandler" method="POST">
      <GroupNameInput
        :default="conversationOpenedStore.conversation.name"
        :reset="reset"
        @resettled="resettled"
        @groupName:valid="validGroupNameHandler"
        @groupName:invalid="invalidGroupNameHandler"
      />

      <DescriptionInput
        :default="conversationOpenedStore.conversation.description || ''"
        :reset="reset"
        @resettled="resettled"
        @description:valid="validDescriptionHandler"
        @description:invalid="invalidDescriptionHandler"
      />

      <div class="w-full mb-5">
        <label class="inline-block mb-2" for="profileImage">
          <span class="">Choose profile photo:</span>
        </label>

        <p
          v-if="errors.profileImage"
          class="px-3 py-1 mb-3 text-xs bg-red-100 border-2 border-red-300 rounded-md text-border-danger"
        >
          <fa-icon icon="triangle-exclamation" class="mr-3" />

          {{ errors.profileImage }}
        </p>

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
          :isProcessing="editConversationProcessing"
          :hasError="hasError || !hasChange"
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
import ButtonUI from "../ui/ButtonUI.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import GroupNameInput from "../conversations/GroupNameInput.vue";
import DescriptionInput from "../conversations/DescriptionInput.vue";
import { imageConfig } from "../../configs";
import { useConversationStore, useConversationOpenedStore } from "../../stores";

import { useRouter } from "vue-router";
import { ref, computed, watch } from "vue";

const conversationStore = useConversationStore();
const conversationOpenedStore = useConversationOpenedStore();
const router = useRouter();

const errors = ref({
  groupName: null,
  description: null,
  profileImage: null,
});

const hasError = computed(() =>
  Object.values(errors.value).some((value) => !!value)
);

const changes = ref({
  groupName: false,
  description: false,
  profileImage: false,
});

const hasChange = computed(() =>
  Object.values(changes.value).some((value) => !!value)
);

const groupName = ref("");
const validGroupNameHandler = (newValue) => {
  errors.value.groupName = null;
  groupName.value = newValue;
};
const invalidGroupNameHandler = (errorMessage) => {
  errors.value.groupName = errorMessage;
};
watch(groupName, (newValue) => {
  if (newValue !== conversationOpenedStore.conversation.name) {
    changes.value.groupName = true;
  } else {
    changes.value.groupName = false;
  }
});

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
watch(profileImage, (newValue) => {
  if (newValue && !errors.value.profileImage) {
    changes.value.profileImage = true;
  } else {
    changes.value.profileImage = false;
  }
});

const description = ref("");
const validDescriptionHandler = (newValue) => {
  errors.value.description = null;
  description.value = newValue;
};
const invalidDescriptionHandler = (errorMessage) => {
  errors.value.description = errorMessage;
};
watch(description, (newValue) => {
  if (
    (newValue === "" &&
      conversationOpenedStore.conversation.description !== null) ||
    (newValue !== "" &&
      conversationOpenedStore.conversation.description !== newValue)
  ) {
    changes.value.description = true;
  } else {
    changes.value.description = false;
  }
});

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
  };
  fatalError.value = null;
  //   groupName.value = "";
  profileImage.value = null;
  profileImageRef.value.files = new DataTransfer().files;
  //   description.value = "";
  reset.value = true;
};

const cancelHandler = () => {
  resetData();
  router.push({
    name: "conversation-item",
    params: {
      conversationId: conversationOpenedStore.conversation.id,
    },
  });
};

const editConversationProcessing = ref(false);
const editConversationHandler = async () => {
  if (!editConversationProcessing.value && !hasError.value && hasChange.value) {
    try {
      editConversationProcessing.value = true;
      fatalError.value = null;

      const formData = new FormData();

      formData.append("groupName", groupName.value);

      if (description.value) {
        formData.append("description", description.value);
      }

      if (profileImage.value) {
        formData.append(
          "profileImage",
          profileImage.value || conversationOpenedStore.conversation.imageUrl
        );
      }

      await conversationStore.updateConversation({
        conversationId: conversationOpenedStore.conversation.id,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      editConversationProcessing.value = false;
      resetData();

      router.push({
        name: "conversation-item",
        params: {
          conversationId: conversationOpenedStore.conversation.id,
        },
      });
    } catch (error) {
      editConversationProcessing.value = false;
      fatalError.value = error;
    }
  }
};
</script>

<style scoped></style>
