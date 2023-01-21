<template>
  <CustomInput
    :modelValue="groupName"
    @update:modelValue="
      (newValue) => {
        groupName = newValue.trim();
      }
    "
    label="Group name:"
    class="w-full"
    placeholder="Group name"
    :status="groupNameStatus"
    :message="error"
    icon="a"
  />
</template>

<script setup>
import CustomInput from "../commons/CustomInput.vue";
import { conversationConfig } from "../../configs";
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

const emit = defineEmits(["groupName:valid", "groupName:invalid", "resettled"]);

const groupName = ref(props.default);

const defaultValidator = (newValue) => {
  let result = true;

  if (newValue?.length === 0) {
    result = "The group name is required.";
  } else if (newValue?.length > conversationConfig.MAX_GROUP_NAME_LENGTH) {
    result = `The group name is too long. ${conversationConfig.MAX_GROUP_NAME_LENGTH} characters is the maximum allowed.`;
  }

  return result;
};

const resetData = () => {
  groupName.value = props.default;
};

const { error } = useValidation(
  groupName,
  [...props.customValidators, defaultValidator],
  emit,
  {
    valid: "groupName:valid",
    invalid: "groupName:invalid",
  }
);
useDefaultReset(() => props.default, [resetData]);
useReset(() => props.reset, [resetData], emit);

const groupNameStatus = computed(() => (error.value ? "danger" : "success"));
</script>

<style scoped></style>
