<template>
  <div>
    <div class="mb-5">
      <SearchBarLoader class="w-full" />
    </div>

    <div class="relative w-full">
      <FilterHeaderLoader />
    </div>
  </div>
</template>

<script setup>
import SearchBarLoader from "./SearchBarLoader.vue";
import FilterHeaderLoader from "./FilterHeaderLoader.vue";
</script>

<style scoped></style>
