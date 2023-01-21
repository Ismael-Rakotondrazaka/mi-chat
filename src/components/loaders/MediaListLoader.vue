<template>
  <masonry-wall :items="medias" :column-width="columnWidth" :gap="gap">
    <template #default="{ index }">
      <div
        :key="index"
        class="w-full border-2 border-border rounded-md bg-white pt-[0.35rem] md:pt-5 shadow-button"
      >
        <div class="border-y-2 border-border media-item">
          <puSkeleton
            :loading="true"
            class="block w-full h-[150px] lg:h-[200px] xl:h-[250px]"
          />
        </div>

        <div class="md:py-2 md:px-3 h-[0.35rem] md:h-auto">
          <puSkeleton :loading="true" class="hidden w-24 h-3 mb-2 md:block" />

          <puSkeleton :loading="true" class="hidden h-2 md:block w-28" />
        </div>
      </div>
    </template>
  </masonry-wall>
</template>

<script setup>
import { useScreenStore } from "../../stores";

import { ref, computed } from "vue";

const screenStore = useScreenStore();

const medias = ref(new Array(10).fill(null));

let screenOptions = ref([
  {
    min: 0,
    max: 767,
    width: 100,
    gap: 7,
  },
  {
    min: 768,
    max: 1023,
    width: 150,
    gap: 10,
  },
  {
    min: 1024,
    max: Infinity,
    width: 250,
    gap: 15,
  },
]);

const options = computed(() => {
  let result = {
    columnWidth: 200,
    gap: 10,
  };

  for (const item of screenOptions.value) {
    if (screenStore.width >= item.min && screenStore.width <= item.max) {
      result = {
        columnWidth: item.width,
        gap: item.gap,
      };
      break;
    }
  }

  return result;
});

const columnWidth = computed(() => options.value.columnWidth);

const gap = computed(() => options.value.gap);
</script>

<style scoped></style>
