<template>
  <div class="flex flex-col items-center w-full p-3 relative,">
    <CustomNavigationLoader
      class="sticky top-0 w-full max-w-md bg-sky-50 z-[1]"
    />

    <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
      <HeaderTextLoader />
    </div>

    <FilterLoader class="sticky w-full max-w-md bg-sky-50 top-12 z-[1]" />

    <div class="w-full max-w-md relative z-[0]">
      <ItemListLoader class="w-full" />
    </div>
  </div>
</template>

<script setup>
import CustomNavigationLoader from "./CustomNavigationLoader.vue";
import FilterLoader from "./FilterLoader.vue";
import HeaderTextLoader from "./HeaderTextLoader.vue";
import ItemListLoader from "./ItemListLoader.vue";
</script>

<style></style>
