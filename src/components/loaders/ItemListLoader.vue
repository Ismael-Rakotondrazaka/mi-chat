<template>
  <div class="w-full">
    <div
      v-for="(n, i) in 10"
      :key="i"
      class="flex flex-row items-center justify-center w-full p-2 mb-3 bg-white border-2 rounded-md md:p-3 flex-nowrap gap-x-3 border-border shadow-button"
    >
      <puSkeleton
        :circle="true"
        class="block w-10 h-10 max-w-[2.5rem] max-h-[2.5rem] shrink-0"
      />

      <div class="w-full h-full overflow-hidden">
        <div
          class="flex flex-col items-start content-between justify-between h-full gap-3"
        >
          <puSkeleton class="block w-4/5 h-3" />

          <puSkeleton class="block w-2/5 h-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
