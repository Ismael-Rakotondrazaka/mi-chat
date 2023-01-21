<template>
  <ul class="ml-5 list-disc">
    <li v-for="(info, index) in infos" :key="index" :class="[liClass]">
      <p class="inline text-black hover:underline" :class="[pClass]">
        {{ info }}
      </p>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  infos: {
    type: Array,
    required: false,
    default: () => [],
  },
  status: {
    type: String,
    required: false,
    default: "primary",
    validator: (value) => {
      return [
        "primary",
        "info",
        "danger",
        "success",
        "warning",
        "disabled",
      ].includes(value);
    },
  },
});

const statusLiClass = {
  primary: "text-primary",
  info: "text-info",
  danger: "text-danger",
  success: "text-success",
  warning: "text-warning",
  disabled: "text-disabled",
};

const liClass = computed(() => statusLiClass[props.status]);

const statusPClass = {
  primary: "hover:text-primary",
  info: "hover:text-info",
  danger: "hover:text-danger",
  success: "hover:text-success",
  warning: "hover:text-warning",
  disabled: "hover:text-disabled",
};

const pClass = computed(() => statusPClass[props.status]);
</script>

<style scoped></style>
