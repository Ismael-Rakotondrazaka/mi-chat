<template>
  <button
    class="border-2 rounded-full border-border"
    :class="[statusClass, shownClass, typeClass, activeClass]"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    required: false,
    default: "primary",
    validator(value) {
      return [
        "primary",
        "info",
        "warning",
        "danger",
        "success",
        "disabled",
      ].includes(value);
    },
  },
  type: {
    type: String,
    required: false,
    default: "primary",
    validator: (value) => {
      return ["primary", "secondary"].includes(value);
    },
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const mainClass = {
  primary: "hover:border-border-primary",
  danger: "hover:border-border-danger",
  warning: "hover:border-border-warning",
  info: "hover:border-border-info",
  success: "hover:border-border-success",
  disabled: "hover:border-border-disabled",
};

const statusClass = computed(() => mainClass[props.status]);

const classType = {
  primary: "px-3 py-1 md:px-5 md:py-2 text-sm md:text-base",
  secondary: "px-3 py-1 md:px-4 md:py-1 text-xs md:text-sm",
};

const typeClass = computed(() => classType[props.type]);

const shownClass = computed(() => (props.shown ? "visible" : "invisible"));

const classStatus = {
  primary: "bg-primary border-border-primary",
  danger: "bg-danger border-border-danger",
  warning: "bg-warning border-border-warning",
  info: "bg-info border-border-info",
  success: "bg-success border-border-success",
  disabled: "bg-disabled border-border-disabled",
};

const activeClass = computed(() => ({
  [classStatus[props.status]]: props.active,
}));
</script>

<style scoped></style>
