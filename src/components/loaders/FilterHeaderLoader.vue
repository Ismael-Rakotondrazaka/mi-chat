<template>
  <div
    class="flex flex-row items-center justify-between pb-1 mb-3 border-b border-border"
  >
    <puSkeleton class="w-24 h-11 open-filter-button-loader" />

    <puSkeleton class="w-20 h-9 reset-filter-button-loader" />
  </div>
</template>

<script setup></script>

<style>
.open-filter-button-loader > .pu-skeleton {
  border-radius: 9999px;
}

.reset-filter-button-loader > .pu-skeleton {
  border-radius: 9999px;
}
</style>
