<template>
  <div class="flex flex-col items-center w-full p-3">
    <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
      <HeaderTextLoader />
    </div>

    <StartSessionLoader class="w-full max-w-md" />
  </div>
</template>

<script setup>
import HeaderTextLoader from "./HeaderTextLoader.vue";
import StartSessionLoader from "./StartSessionLoader.vue";
</script>

<style scoped></style>
