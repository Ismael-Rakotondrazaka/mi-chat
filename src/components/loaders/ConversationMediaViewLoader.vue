<template>
  <div class="w-full p-3">
    <div class="flex flex-col items-center w-full">
      <CustomNavigationLoader class="w-full max-w-md bg-sky-50" />

      <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
        <HeaderTextLoader />
      </div>

      <FilterLoader class="w-full max-w-md bg-sky-50" />
    </div>

    <MediaListLoader />
  </div>
</template>

<script setup>
import CustomNavigationLoader from "./CustomNavigationLoader.vue";
import FilterLoader from "./FilterLoader.vue";
import HeaderTextLoader from "./HeaderTextLoader.vue";
import MediaListLoader from "./MediaListLoader.vue";
</script>

<style>
.create-chat-button-loader > .pu-skeleton {
  border-radius: 9999px;
  border: 2px solid #fff;
}
</style>
