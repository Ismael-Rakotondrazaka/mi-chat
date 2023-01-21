<template>
  <input
    class="h-12 px-3 transition-colors duration-200 border-2 rounded-full focus-visible:outline-none border-border shadow-button focus:shadow-button-primary focus:border-border-primary"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
    :placeholder="placeholder"
    type="search"
  />
</template>

<script setup>
defineProps({
  modelValue: {},
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style></style>
