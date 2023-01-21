<template>
  <CustomInput
    :modelValue="email"
    @update:modelValue="
      (newValue) => {
        email = newValue.trim();
      }
    "
    type="email"
    label="Email address:"
    class="w-full"
    placeholder="email@example.com"
    :status="emailStatus"
    :message="error"
    icon="at"
  />
</template>

<script setup>
import CustomInput from "../commons/CustomInput.vue";
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

const emit = defineEmits(["email:valid", "email:invalid", "resettled"]);

const email = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  if (newValue.length === 0) {
    result = "Email is required.";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      newValue
    )
  ) {
    result = "Invalid email address.";
  }

  return result;
};

const resetData = () => {
  email.value = props.default;
};

const { error } = useValidation(
  email,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "email:valid",
    invalid: "email:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const emailStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
