<template>
  <button
    class="relative px-5 py-3 text-black transition-all duration-200 border-2 rounded-md shadow-button"
    :class="[mainClass, cursorClass]"
  >
    <span :class="[slotClass]">
      <slot />
    </span>

    <fa-icon
      icon="spinner"
      class="absolute animate-spin left-1/2 top-4"
      :class="[iconClass]"
    />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "solid",
    validator(value) {
      return ["solid", "outlined"].includes(value);
    },
  },
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
  isProcessing: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasError: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const mainClass = computed(() => {
  const classVariant = {
    solid: {
      primary: "bg-primary border-emerald-600 hover:shadow-button-primary",
      danger: "bg-danger border-red-600 hover:shadow-button-danger",
      warning: "bg-warning border-yellow-500 hover:shadow-button-warning",
      info: "bg-info border-blue-500 hover:shadow-button-info",
      success: "bg-success border-green-500 hover:shadow-button-success",
      disabled: "bg-disabled border-slate-500 hover:shadow-button-disabled",
    },
    outlined: {
      primary: "bg-white border-emerald-600 hover:shadow-button-primary",
      danger: "bg-white border-red-600 hover:shadow-button-danger",
      warning: "bg-white border-yellow-500 hover:shadow-button-warning",
      info: "bg-white border-blue-500 hover:shadow-button-info",
      success: "bg-white border-green-500 hover:shadow-button-success",
      disabled: "bg-white border-slate-500 hover:shadow-button-disabled",
    },
  };

  return classVariant[props.variant][props.status];
});

const cursorClass = computed(() =>
  props.hasError || props.isProcessing
    ? "hover:cursor-not-allowed"
    : "hover:cursor-pointer"
);

const slotClass = computed(() =>
  props.isProcessing ? "invisible" : "visible"
);

const iconClass = computed(() =>
  props.isProcessing ? "visible" : "invisible"
);
</script>

<style scoped></style>
