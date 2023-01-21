<template>
  <div>
    <NotFoundView v-if="routeStore.isNotFound" />

    <slot v-else-if="props.isLoading" name="loading" />

    <slot v-else />
  </div>
</template>

<script setup>
import { useRouteStore } from "../../stores";
import NotFoundView from "../../views/NotFoundView.vue";

const routeStore = useRouteStore();

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style scoped></style>
