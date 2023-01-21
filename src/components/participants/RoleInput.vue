<template>
  <CustomRadioInput
    :values="['participant', 'admin']"
    :labels="['Participant', 'Admin']"
    prefix="participant-edit"
    @update:modelValue="(newValue) => (level = newValue)"
    label="Select role:"
    :default="props.default"
    :error="error || null"
  />
</template>

<script setup>
import CustomRadioInput from "../commons/CustomRadioInput.vue";
import { useReset, useDefaultReset, useValidation } from "../../composables";

import { ref } from "vue";

const props = defineProps({
  default: {
    type: String,
    required: false,
    default: "normal",
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

const emit = defineEmits(["role:valid", "role:invalid", "resettled"]);

const level = ref(props.default);

const defaultValidator = () => {
  return true;
};

const resetData = () => (level.value = props.default);

const { error } = useValidation(
  level,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "role:valid",
    invalid: "role:invalid",
  }
);

useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);
</script>

<style scoped></style>
