<template>
  <Transition name="bounce">
    <p
      v-if="error"
      class="px-3 py-1 text-xs bg-red-100 border-2 border-red-300 rounded-md text-border-danger"
    >
      <fa-icon icon="triangle-exclamation" class="mr-3" />

      <span>
        {{ error }}
      </span>
    </p>
  </Transition>
</template>

<script setup>
defineProps({
  error: {
    type: [String, null],
    required: false,
    default: null,
  },
});
</script>

<style scoped></style>
