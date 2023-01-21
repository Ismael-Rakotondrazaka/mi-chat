<template>
  <vDropdown
    :triggers="[]"
    :shown="shown"
    :autoHide="false"
    :positioning-disabled="true"
  >
    <template #popper>
      <div class="fixed inset-0 bg-slate-700/95">
        <CloseModalButton @click="closeHandler" class="fixed top-0 right-0" />

        <slot />
      </div>
    </template>
  </vDropdown>
</template>

<script setup>
import CloseModalButton from "./CloseModalButton.vue";

defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["closed"]);

const closeHandler = () => {
  emit("closed");
};
</script>

<style scoped></style>
