<template>
  <CustomInput
    :modelValue="password"
    @update:modelValue="(newValue) => (password = newValue)"
    :label="label"
    class="w-full"
    :placeholder="props.placeholder"
    :status="passwordStatus"
    :message="error"
    icon="asterisk"
    type="password"
    :showPassword="props.showPassword"
  />
</template>

<script setup>
import CustomInput from "../commons/CustomInput.vue";
import { userConfig } from "../../configs";
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
  placeholder: {
    type: String,
    required: false,
    default: "strong password",
  },
  label: {
    type: String,
    required: false,
    default: "Password:",
  },
  showPassword: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["password:valid", "password:invalid", "resettled"]);

const password = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  if (newValue.length === 0) {
    result = "Password is required.";
  } else if (newValue.length < userConfig.MIN_PASSWORD_LENGTH) {
    result = `Password is too short. ${userConfig.MIN_PASSWORD_LENGTH} characters is the minimum allowed.`;
  }

  return result;
};

const resetData = () => {
  password.value = props.default;
};

const { error } = useValidation(
  password,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "password:valid",
    invalid: "password:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const passwordStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
