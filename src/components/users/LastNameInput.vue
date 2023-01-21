<template>
  <CustomInput
    :modelValue="lastName"
    @update:modelValue="
      (newValue) => {
        lastName = newValue.trim();
      }
    "
    label="Last name:"
    class="w-full"
    placeholder="Doe"
    :status="lastNameStatus"
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

const emit = defineEmits(["lastName:valid", "lastName:invalid", "resettled"]);

const lastName = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  const formatted = newValue
    .replace(/\s+/g, " ") // replace multiple whitespace with a single one
    .trim(); // then trim it

  const lastNameMaxLength = userConfig.MAX_LAST_NAME_LENGTH;

  if (formatted.length === 0) {
    result = "Last name is required.";
  } else if (!/^[\p{L}\p{M} ]+$/gu.test(formatted)) {
    result =
      "Invalid last name. It contains non-Unicode letters, numbers or special characters.";
  } else if (newValue.length > lastNameMaxLength) {
    result = `Invalid last name. ${lastNameMaxLength} characters long is the maximum allowed.`;
  }

  return result;
};

const resetData = () => {
  lastName.value = props.default;
};

const { error } = useValidation(
  lastName,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "lastName:valid",
    invalid: "lastName:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const lastNameStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
