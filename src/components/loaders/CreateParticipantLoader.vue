<template>
  <div>
    <SelectUserLoader class="w-full" />

    <div class="flex flex-row items-center justify-end w-full gap-x-3">
      <ButtonUILoader class="w-28" />

      <ButtonUILoader class="w-44" />
    </div>
  </div>
</template>

<script setup>
import ButtonUILoader from "./ButtonUILoader.vue";
import SelectUserLoader from "./SelectUserLoader.vue";
</script>

<style scoped></style>
