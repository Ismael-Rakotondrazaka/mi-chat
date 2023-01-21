<template>
  <CustomInput
    :modelValue="passwordValidation"
    @update:modelValue="(newValue) => (passwordValidation = newValue)"
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
import { useReset, useDefaultReset } from "../../composables";

import { ref, computed, watch } from "vue";

const props = defineProps({
  reference: {
    type: String,
    required: true,
  },
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
    default: "retype the password",
  },
  label: {
    type: String,
    required: false,
    default: "Confirm password:",
  },
  showPassword: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits([
  "passwordValidation:valid",
  "passwordValidation:invalid",
  "resettled",
]);

const passwordValidation = ref(props.default);

const error = ref(null);
const resetData = () => {
  passwordValidation.value = props.default;
};

watch(
  [() => props.reference, passwordValidation],
  ([referenceNewValue, passwordNewValue]) => {
    let result = null;

    let customResult = null;
    for (const customValidator of props.customValidators) {
      const temp = customValidator(passwordNewValue);
      if (temp !== true) {
        customResult = temp;
        break;
      }
    }

    if (customResult !== null) {
      result = customResult;
    } else {
      if (passwordNewValue.length === 0) {
        result = "Password confirmation is required.";
      } else if (referenceNewValue !== passwordNewValue) {
        result =
          "Password confirmation must be the same as the password provided.";
      }
    }

    error.value = result;
  }
);

watch(error, (newValue) => {
  if (newValue) {
    emit("passwordValidation:invalid", newValue, passwordValidation.value);
  } else {
    emit("passwordValidation:valid", passwordValidation.value);
  }
});

useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const passwordStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
