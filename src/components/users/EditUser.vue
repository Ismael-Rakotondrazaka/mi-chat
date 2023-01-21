<template>
  <div>
    <FatalErrorPresenter :error="fatalError" />

    <DescriptionInput
      @description:valid="validDescriptionHandler"
      @description:invalid="invalidDescriptionHandler"
      @resettled="resettled"
      :default="userStore.user.description || ''"
      :reset="reset"
    />

    <div class="w-full">
      <label class="inline-block mb-2" for="profileImage">
        <span class="">Choose profile photo:</span>
      </label>

      <input
        @change="profileImageChangeHandler"
        type="file"
        class="block w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-sky-400 file:text-white hover:file:bg-sky-500 hover:cursor-pointer"
        id="profileImage"
        name="profileImage"
        ref="profileImageRef"
      />

      <p
        class="text-sm text-red-400 font-medium"
        :class="{ invisible: !errors.profileImage }"
      >
        <span class="mr-1">
          <fa-icon icon="circle-exclamation" />
        </span>
        {{ errors.profileImage }}
      </p>
    </div>

    <div class="flex flex-row items-center justify-end w-full gap-x-3">
      <ButtonUI @click="cancelHandler" status="disabled" variant="outlined">
        Cancel
      </ButtonUI>

      <ButtonUI
        @click="updateUserHandler"
        :isProcessing="updateUserProcessing"
        :hasError="!hasChange"
        status="info"
      >
        Save changes
      </ButtonUI>
    </div>
  </div>
</template>

<script setup>
import DescriptionInput from "./DescriptionInput.vue";
import ButtonUI from "../ui/ButtonUI.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import { useUserStore } from "../../stores";
import { imageConfig } from "../../configs";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const errors = ref({
  description: null,
  profileImage: null,
});

const hasError = computed(() => {
  let result = false;

  for (const key in errors.value) {
    if (Object.hasOwnProperty.call(errors.value, key)) {
      if (errors.value[key]) {
        result = true;
        break;
      }
    }
  }

  return result;
});

const fatalError = ref(null);

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
    (newValue === "" && userStore.user.description !== null) ||
    (newValue !== "" && userStore.user.description !== newValue)
  ) {
    changes.value.description = true;
  } else {
    changes.value.description = false;
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

const reset = ref(false);

const resettled = () => {
  reset.value = false;
};

const resetData = () => {
  reset.value = true;
  profileImage.value = null;
  profileImageRef.value.files = new DataTransfer().files;
};

const updateUserProcessing = ref(false);

const changes = ref({
  description: false,
  profileImage: false,
});

const hasChange = computed(() =>
  Object.values(changes.value).some((value) => value)
);

const updateUserHandler = async () => {
  if (!updateUserProcessing.value && !hasError.value && hasChange.value) {
    try {
      updateUserProcessing.value = true;
      fatalError.value = null;

      const formData = new FormData();

      formData.append("description", description.value || /* null */ "");

      formData.append(
        "profileImage",
        profileImage.value || userStore.user.profileImage
      );

      await userStore.updateUser({
        userId: userStore.user.id,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      updateUserProcessing.value = false;

      resetData();

      router.back();
    } catch (error) {
      fatalError.value = error;
      updateUserProcessing.value = false;
    }
  }
};

watch([description, profileImage], () => {
  fatalError.value = null;
});

const cancelHandler = () => {
  resetData();

  router.back();
};
</script>

<style scoped></style>
