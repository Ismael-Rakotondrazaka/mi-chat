<template>
  <a
    :href="src"
    target="_blank"
    class="block px-5 py-1 border-2 border-transparent rounded-md hover:border-border-info active:bg-info text-info active:text-black"
  >
    <fa-icon icon="file-download" class="text-2xl" />

    <span class="sr-only">Download</span>
  </a>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
