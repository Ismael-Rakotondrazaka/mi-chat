<template>
  <div class="bg-white border-2 rounded-md border-border shadow-button">
    <div
      class="flex flex-col items-center justify-between h-full p-3 border-b gap-y-3 border-border"
    >
      <puSkeleton :loading="true" class="block h-6 place-self-end w-7" />

      <puSkeleton
        :loading="true"
        :circle="true"
        class="block w-36 h-36 max-w-[9rem] max-h-[9rem]"
      />

      <div class="flex flex-col items-center justify-center gap-2 text-center">
        <puSkeleton :loading="true" class="block h-5 w-44" />

        <puSkeleton :loading="true" class="block w-56 h-3" />
      </div>
    </div>

    <div>
      <div
        v-for="(n, i) in 4"
        :key="i"
        class="flex flex-row items-center w-full gap-3 px-3 py-4 border-b border-border last:border-b-0"
      >
        <puSkeleton
          :loading="true"
          :count="1"
          class="block w-8 h-8 profile-item-action-button"
        />

        <puSkeleton
          :loading="true"
          :count="1"
          class="block w-56 h-5 profile-item-action-button"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
