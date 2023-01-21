<template>
  <div class="mb-5">
    <label for="" class="inline-block mb-1">{{ props.label }}</label>

    <ErrorPresenter :error="error" />

    <div class="flex flex-row items-baseline gap-3">
      <div v-for="(value, index) in values" :key="index" class="">
        <input
          type="radio"
          :id="`${prefix}-radio-input-value-${value}`"
          :value="value"
          v-model="valueModel"
          class="sr-only peer"
        />

        <label
          :for="`${prefix}-radio-input-value-${value}`"
          class="inline-block px-3 py-2 text-black border-2 border-white rounded-md hover:cursor-pointer bg-primary/20 ring ring-primary/20 peer-checked:bg-primary peer-checked:ring-primary peer-checked:text-white"
        >
          {{ props.labels[index] }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorPresenter from "../errors/ErrorPresenter.vue";

import { ref, watch } from "vue";

const valueModel = ref(props.default ?? null);

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  values: {
    type: Array,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
  },
  prefix: {
    type: String,
    required: true,
  },
  error: {
    type: [String, null],
    required: false,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

watch(valueModel, (newValue) => emit("update:modelValue", newValue));
</script>

<style scoped></style>
