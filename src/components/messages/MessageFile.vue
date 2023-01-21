<template>
  <div
    class="relative w-[8rem] p-2 h-[8rem] xl:h-40 xl:w-40 rounded-md block border border-border bg-emerald-100 shadow-button hover:shadow-button-primary hover:border-border-primary"
  >
    <div class="w-full h-full">
      <fa-icon
        icon="file"
        class="inline-block w-full h-full text-3xl text-sky-400"
      />

      <span class="sr-only">File</span>
    </div>

    <p class="absolute left-0 right-0 text-xs truncate bottom-3">
      {{ filename }}
    </p>
  </div>
</template>

<script setup>
import { getFilenameFromUrl } from "../../utils/strings";
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const filename = computed(() => getFilenameFromUrl(props.src));
</script>

<style scoped></style>
