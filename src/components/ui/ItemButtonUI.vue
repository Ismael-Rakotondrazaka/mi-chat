<template>
  <button
    class="relative px-2 py-1 text-black transition-all duration-200 border-2 rounded-md whitespace-nowrap"
    :class="[mainClass]"
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
});

const classStatus = {
  primary: "bg-primary border-border-primary hover:bg-white",
  danger: "bg-danger border-border-danger hover:bg-white",
  warning: "bg-warning border-border-warning hover:bg-white",
  info: "bg-info border-border-info hover:bg-white",
  success: "bg-success border-border-success hover:bg-white",
  disabled: "bg-disabled border-border-disabled hover:bg-white",
};

const mainClass = computed(() => {
  return classStatus[props.status];
});
</script>

<style scoped></style>
