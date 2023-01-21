<template>
  <CustomInput
    :modelValue="nickname"
    @update:modelValue="
      (newValue) => {
        nickname = newValue.trim();
      }
    "
    label="Nickname:"
    class="w-full"
    placeholder="Cool nickname"
    :status="nicknameStatus"
    :message="error"
    icon="a"
  />
</template>

<script setup>
import CustomInput from "../commons/CustomInput.vue";
import { participantConfig } from "../../configs";
import { useReset, useDefaultReset, useValidation } from "../../composables";

import { ref, computed } from "vue";

const props = defineProps({
  default: {
    type: String,
    required: false,
    default: "",
  },
  customValidators: {
    type: Array,
    required: false,
    default: () => [],
  },
  reset: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["nickname:valid", "nickname:invalid", "resettled"]);

const nickname = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  if (newValue.length > participantConfig.MAX_NICKNAME_LENGTH) {
    result = `Nickname is too long. ${participantConfig.MAX_NICKNAME_LENGTH} characters is the maximum allowed.`;
  }

  return result;
};

const resetData = () => {
  nickname.value = props.default;
};

const { error } = useValidation(
  nickname,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "nickname:valid",
    invalid: "nickname:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const nicknameStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
