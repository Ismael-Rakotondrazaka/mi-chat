<template>
  <CustomInput
    :modelValue="firstName"
    @update:modelValue="
      (newValue) => {
        firstName = newValue.trim();
      }
    "
    label="First name:"
    class="w-full"
    placeholder="John"
    :status="firstNameStatus"
    :message="error"
    icon="a"
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
});

const emit = defineEmits(["firstName:valid", "firstName:invalid", "resettled"]);

const firstName = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  const formatted = newValue
    .replace(/\s+/g, " ") // replace multiple whitespace with a single one
    .trim(); // then trim it

  const firstNameMaxLength = userConfig.MAX_FIRST_NAME_LENGTH;

  if (formatted.length === 0) {
    result = "First name is required.";
  } else if (!/^[\p{L}\p{M} ]+$/gu.test(formatted)) {
    result =
      "Invalid first name. It contains non-Unicode letters, numbers or special characters.";
  } else if (newValue.length > firstNameMaxLength) {
    result = `Invalid first name. ${firstNameMaxLength} characters long is the maximum allowed.`;
  }

  return result;
};

const resetData = () => {
  firstName.value = props.default;
};

const { error } = useValidation(
  firstName,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "firstName:valid",
    invalid: "firstName:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const firstNameStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
