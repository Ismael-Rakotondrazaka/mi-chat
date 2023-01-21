<template>
  <Transition name="bounce">
    <div
      v-if="error"
      class="flex flex-col items-center justify-center gap-3 p-3 bg-red-100 border-2 rounded-md border-border-danger shadow-button-danger"
    >
      <div class="w-full max-w-[5rem]">
        <img
          v-tooltip="{
            content: 'Don\'t accuse me, I\'m trying to help you 😿.',
            distance: 10,
            position: 'top',
          }"
          src="../../assets/images/logos/logo-sad-solid-danger.svg"
          alt=""
          class="w-full"
        />
      </div>

      <p class="font-bold whitespace-pre-wrap text-border-danger">
        {{ message }}
      </p>
    </div>
  </Transition>
</template>

<script setup>
import {
  userConfig,
  conversationConfig,
  participantConfig,
  messageConfig,
} from "../../configs";

import { AxiosError } from "axios";
import { ref, computed } from "vue";

const props = defineProps({
  error: {
    type: [Error, null],
    required: false,
    default: null,
  },
});

const defaultErrorMessage = ref({
  DEFAULT_GENERAL_ERROR_MESSAGE: "Something went wrong. Please try again.",
  DEFAULT_SERVER_ERROR_MESSAGE: "Something went wrong. Please try again.",
  DEFAULT_BAD_REQUEST_ERROR_MESSAGE:
    "The request can not be processed. Please try again.",
  DEFAULT_NOT_FOUND_ERROR_MESSAGE: "The resource is not found.",
  DEFAULT_CONFLICT_ERROR_MESSAGE: "The action produce conflict in our records.",
  DEFAULT_UNAUTHORIZED_ERROR_MESSAGE:
    "Please, verify that you are authenticated before accessing this resource.",
  DEFAULT_FORBIDDEN_ERROR_MESSAGE: "Access denied for this resource.",
  DEFAULT_UNKNOWN_ERROR_MESSAGE: "An unknown error occurred. Please try again.",
});

const codeMessage = ref({
  E2_1: "Email is required.",
  E2_2: "Invalid email address.",
  E2_3: "Invalid email address.",
  E2_4: "Password is required.",
  E2_5: "Invalid password.",
  E2_6: `Password is too short. ${userConfig.MIN_PASSWORD_LENGTH} characters is the minimum allowed.`,
  E2_7: "First name is required.",
  E2_8: "Invalid first name.",
  E2_9: `Invalid first name. ${userConfig.MAX_FIRST_NAME_LENGTH} characters long is the maximum allowed.`,
  E2_10: "Last name is required.",
  E2_11: "Invalid last name. Please try again.",
  E2_12: `Invalid last name. ${userConfig.MAX_LAST_NAME_LENGTH} characters long is the maximum allowed.`,
  E2_13: "The password confirmation is required.",
  E2_14: "Password confirmation must be the same as the password provided.",
  E2_15: "Invalid description. Please try again.",
  E2_16: `Description is too long. ${userConfig.MAX_DESCRIPTION_LENGTH} characters is the maximum allowed.`,
  E2_17: "refreshToken is missing.",
  E2_18: "No change found.",
  E2_19: defaultErrorMessage.value.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
  E2_20: defaultErrorMessage.value.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
  E2_21: "The user does not exist.",
  E2_22:
    "Invalid first name, it should NOT contain non-Unicode letters, numbers or special characters.",
  E2_23:
    "Invalid last name, it should NOT contain non-Unicode letters, numbers or special characters.",
  E2_24: "The group name is required.",
  E2_25: "Participants are required.",
  E2_26: defaultErrorMessage.value.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
  E2_27: "One or more id in field participants are in a bad format.",
  E2_28: "participants contains auth user id.",
  E2_29: "The user does not exist.",
  E2_30: "You only can add your friends as members.",
  E2_31: "Invalid description.",
  E2_32: `Description is too long. ${conversationConfig.MAX_DESCRIPTION_LENGTH} characters is the maximum allowed.`,
  E2_33: "Invalid group name.",
  E2_34: `The group name is too long. ${conversationConfig.MAX_GROUP_NAME_LENGTH} characters is the maximum allowed.`,
  E2_35: `Need at least ${
    conversationConfig.MIN_GROUP_PARTICIPANT_COUNT - 1
  } members apart from you.`,
  E2_36: "Role is required.",
  E2_37: "Invalid role.",
  E2_38: "Can't turn an admin of a chat into a participant.",
  E2_39: "Invalid nickname.",
  E2_40: `Nickname is too long. ${participantConfig.MAX_NICKNAME_LENGTH} characters is the maximum allowed.`,
  E2_41: "A message must have a content.",
  E2_42: "Invalid message content.",
  E2_43: "A message must have a content.",
  E2_44: `Message too long. ${messageConfig.MAX_MESSAGE_LENGTH} characters is the maximum allowed.`,
  E2_45: defaultErrorMessage.value.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
  E2_46: defaultErrorMessage.value.DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
  E2_47: "The chat does not exist.",
  E2_48: "Invalid image file. Please, try with another one.",

  E4: defaultErrorMessage.value.DEFAULT_CONFLICT_ERROR_MESSAGE,
  E4_1: "The email is already in use. Try with another one.",
  E4_2: "You can't send a friend request to yourself.",
  E4_3: "Can't send a friend request to a friend.",
  E4_4: "You already have a friend request from this user.",
  E4_5: "You already sent a friend request to this user.",
  E4_6: "This user is already a member in this chat.",

  E6: defaultErrorMessage.value.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
  E6_1: defaultErrorMessage.value.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
  E6_2: "Credential doesn't match to our records.",
});

const message = computed(() => {
  let result = defaultErrorMessage.value.DEFAULT_GENERAL_ERROR_MESSAGE;

  if (props.error instanceof AxiosError && props.error?.response?.data?.error) {
    let customErrorMessage =
      codeMessage.value[props.error.response.data.error?.code];

    if (customErrorMessage) {
      result = customErrorMessage;
    }
  }

  return result;
});
</script>

<style scoped></style>
