<template>
  <CustomInput
    :modelValue="description"
    @update:modelValue="
      (newValue) => {
        description = newValue.trim();
      }
    "
    label="Description:"
    class="w-full"
    placeholder="Things about you"
    :status="descriptionStatus"
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

const emit = defineEmits([
  "description:valid",
  "description:invalid",
  "resettled",
]);

const description = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  if (newValue.length > userConfig.MAX_DESCRIPTION_LENGTH) {
    result = `Description is too long. ${userConfig.MAX_DESCRIPTION_LENGTH} characters is the maximum allowed.`;
  }

  return result;
};

const resetData = () => {
  description.value = props.default;
};

const { error } = useValidation(
  description,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "description:valid",
    invalid: "description:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const descriptionStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
