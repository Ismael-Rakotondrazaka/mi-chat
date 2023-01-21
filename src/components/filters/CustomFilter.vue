<template>
  <div>
    <div class="mb-5">
      <SearchBar
        :placeholder="placeholder"
        :modelValue="searchText"
        @update:modelValue="updateSearchTextHandler"
        class="w-full"
      />
    </div>

    <div class="relative w-full">
      <FilterHeader
        :shown="shown"
        @filter:close="closeFilterHandler"
        @filter:open="openFilterHandler"
        @reset="resetFilterHandler"
      />

      <FilterList :shown="shown" :filters="filters" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from "../commons/SearchBar.vue";
import FilterList from "../filters/FilterList.vue";
import FilterHeader from "../filters/FilterHeader.vue";
import { useReset } from "../../composables";

const props = defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
  filters: {
    type: Array,
    require: false,
    default: () => [],
  },
  searchText: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "Search",
  },
  reset: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits([
  "filter:open",
  "filter:close",
  "filter:reset",
  "searchText:update",
  "resettled",
]);

const closeFilterHandler = () => {
  emit("filter:close");
};
const openFilterHandler = () => {
  emit("filter:open");
};
const resetFilterHandler = () => {
  emit("filter:reset");
};

const updateSearchTextHandler = (newValue) => {
  emit("searchText:update", newValue);
};

const resetData = () => {
  emit("searchText:update", "");
};

useReset(() => props.reset, [resetData], emit);
</script>

<style scoped></style>
