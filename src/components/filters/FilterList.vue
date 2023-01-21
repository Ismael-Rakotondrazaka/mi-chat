<template>
  <div
    v-show="shown"
    class="flex flex-row flex-wrap gap-3 pb-3 mb-3 border-b border-border"
  >
    <div v-for="(filter, i) in filters" :key="i" class="w-full">
      <h3 class="mb-1 text-sm uppercase md:mb-3">{{ filter.filterType }}</h3>

      <ul
        class="ml-3"
        :class="{
          'flex flex-row gap-3': !hasSecondaries(filter.primaries),
        }"
      >
        <li
          v-for="(primary, j) in filter.primaries"
          :key="j"
          class="mb-1 md:mb-3"
        >
          <div class="flex flex-row items-center gap-x-3">
            <FilterButtonUI
              @click="primary.onClickHandler"
              status="info"
              type="primary"
              :shown="primary.shown"
              :active="primary.active"
            >
              {{ primary.text }}
            </FilterButtonUI>

            <ul
              v-if="primary.secondaries.length > 0"
              class="flex flex-row items-end gap-x-2"
            >
              <li v-for="(secondary, k) in primary.secondaries" :key="k">
                <FilterButtonUI
                  @click="secondary.onClickHandler"
                  status="warning"
                  type="secondary"
                  :shown="secondary.shown"
                  :active="secondary.active"
                >
                  {{ secondary.text }}
                </FilterButtonUI>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import FilterButtonUI from "../ui/FilterButtonUI.vue";

defineProps({
  filters: {
    type: Array,
    required: false,
    default: () => [],
  },
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const hasSecondaries = (primaries) =>
  primaries.some((primary) => primary.secondaries.length > 0);
</script>

<style scoped></style>
