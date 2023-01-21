<template>
  <div
    class="flex flex-row items-center justify-between pb-1 mb-3 border-b border-border"
  >
    <h2>
      <button
        @click="toggleFilter"
        class="px-5 py-2 border-2 rounded-full active:bg-disabled"
        :class="[toggleFilterClass]"
      >
        <fa-icon icon="sliders" class="inline-block mr-3" />

        Filters

        <fa-icon icon="xmark" v-if="shown" class="ml-5" />
      </button>
    </h2>

    <button
      @click="resetFilterHandler"
      class="px-4 py-1 border-2 rounded-full border-border-danger active:bg-danger/40"
    >
      Reset
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["filter:open", "filter:close", "reset"]);

const props = defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const toggleFilter = () => {
  if (props.shown) {
    emit("filter:close");
  } else {
    emit("filter:open");
  }
};

const toggleFilterClass = computed(() =>
  props.shown
    ? "border-border bg-disabled/40"
    : "border-transparent hover:border-border"
);

const resetFilterHandler = () => {
  emit("reset");
};
</script>

<style scoped></style>
