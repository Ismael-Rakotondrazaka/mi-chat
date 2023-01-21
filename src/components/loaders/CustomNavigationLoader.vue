<template>
  <div class="flex flex-row items-center justify-between py-3">
    <div class="flex flex-row items-center justify-start gap-10 flex-nowrap">
      <puSkeleton :loading="true" :circle="true" class="h-7 w-7" />
    </div>

    <puSkeleton :loading="true" :circle="true" class="h-7 w-7" />
  </div>
</template>

<script setup></script>

<style scoped></style>
