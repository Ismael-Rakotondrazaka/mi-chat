<template>
  <div class="flex flex-row items-center justify-between p-3 bg-emerald-400">
    <div class="w-[80%] flex flex-row items-center gap-x-2">
      <div
        class="block px-1 text-2xl text-white hover:cursor-pointer md:hidden"
      >
        <fa-icon icon="chevron-left" />
      </div>

      <puSkeleton
        :loading="true"
        :circle="true"
        class="block w-10 h-10 max-w-[2.5rem] max-h-[2.5rem]"
      />

      <puSkeleton :loading="true" class="block w-20 h-5" />
    </div>

    <div class="block px-2 text-2xl text-white hover:cursor-pointer">
      <fa-icon icon="bars" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
