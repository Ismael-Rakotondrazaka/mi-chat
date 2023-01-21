<template>
  <div>
    <div class="mb-5">
      <SearchBar
        placeholder="Search by sender"
        :modelValue="searchText"
        @update:modelValue="updateSearchTextHandler"
        class="w-full"
      />
    </div>

    <div class="pb-3 mb-2 border-b border-border">
      <ul>
        <li
          v-for="sender in conversationOpenedStore.mediaSenderFiltered"
          :key="sender.id"
        >
          <button @click="() => selectSenderHandler(sender.id)" class="w-full">
            <div
              class="flex flex-row items-start justify-between p-2 duration-200 bg-white flex-nowrap gap-x-3 hover:border-border-primary hover:bg-primary"
              :class="{
                'bg-primary':
                  sender.id === conversationOpenedStore.mediaSenderId,
              }"
            >
              <AvatarUI
                :src="sender.imageUrl"
                size="sm"
                type="personal"
                :userId="sender.id"
              />

              <div class="w-full overflow-hidden">
                <div class="flex flex-col items-start justify-between">
                  <p
                    class="text-xs font-bold truncate md:text-sm text-slate-900"
                  >
                    {{ sender.name.full }}
                  </p>
                </div>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <div class="relative w-full">
      <FilterHeader
        :shown="showFilter"
        @filter:close="closeFilterHandler"
        @filter:open="openFilterHandler"
        @reset="resetFilterHandler"
      />

      <FilterList :shown="showFilter" :filters="filters" />
    </div>
  </div>
</template>

<script setup>
import SearchBar from "../commons/SearchBar.vue";
import FilterList from "../filters/FilterList.vue";
import FilterHeader from "../filters/FilterHeader.vue";
import AvatarUI from "../ui/AvatarUI.vue";

import { useConversationOpenedStore } from "../../stores";

import { ref, computed, watch } from "vue";

const conversationOpenedStore = useConversationOpenedStore();

const props = defineProps({
  reset: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

watch(nameFilter, (newValue) => {
  conversationOpenedStore.mediaSenderNameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  conversationOpenedStore.mediaTypeFilter = "media-type-all";
  conversationOpenedStore.mediaOrderFilter = "media-order-desc";
  conversationOpenedStore.mediaSenderId = 0;
  conversationOpenedStore.isMasonryLayout = true;
};

const emit = defineEmits(["resettled"]);

watch(
  () => props.reset,
  (newValue) => {
    if (newValue) {
      resetFilterHandler();
      emit("resettled");
    }
  }
);

const selectSenderHandler = (senderId) => {
  conversationOpenedStore.mediaSenderId = senderId;
};

const setTypeAllHandler = () =>
  (conversationOpenedStore.mediaTypeFilter = "media-type-all");
const typeAllActive = computed(
  () => conversationOpenedStore.mediaTypeFilter === "media-type-all"
);

const setTypeImageHandler = () =>
  (conversationOpenedStore.mediaTypeFilter = "media-type-image");
const typeImageActive = computed(
  () => "media-type-image" === conversationOpenedStore.mediaTypeFilter
);

const setTypeVideoHandler = () =>
  (conversationOpenedStore.mediaTypeFilter = "media-type-video");
const typeVideoActive = computed(
  () => conversationOpenedStore.mediaTypeFilter === "media-type-video"
);

const setTypeFileHandler = () =>
  (conversationOpenedStore.mediaTypeFilter = "media-type-file");
const typeFileActive = computed(
  () => conversationOpenedStore.mediaTypeFilter === "media-type-file"
);

const setOrderDescHandler = () =>
  (conversationOpenedStore.mediaOrderFilter = "media-order-desc");
const orderDescActive = computed(
  () => "media-order-desc" === conversationOpenedStore.mediaOrderFilter
);

const setOrderAscHandler = () =>
  (conversationOpenedStore.mediaOrderFilter = "media-order-asc");
const orderAscActive = computed(
  () => "media-order-asc" === conversationOpenedStore.mediaOrderFilter
);

const setViewAdaptiveHandler = () => {
  conversationOpenedStore.isMasonryLayout = true;
};
const viewAdaptiveActive = computed(
  () => conversationOpenedStore.isMasonryLayout
);

const setViewAlignedHandler = () => {
  conversationOpenedStore.isMasonryLayout = false;
};
const viewAlignedActive = computed(
  () => !conversationOpenedStore.isMasonryLayout
);

const filters = computed(() => [
  {
    filterType: "Type",
    primaries: [
      {
        text: "All",
        shown: true,
        active: typeAllActive.value,
        onClickHandler: setTypeAllHandler,
        secondaries: [],
      },
      {
        text: "Image",
        shown: true,
        active: typeImageActive.value,
        onClickHandler: setTypeImageHandler,
        secondaries: [],
      },
      {
        text: "Video",
        shown: true,
        active: typeVideoActive.value,
        onClickHandler: setTypeVideoHandler,
        secondaries: [],
      },
      {
        text: "File",
        shown: true,
        active: typeFileActive.value,
        onClickHandler: setTypeFileHandler,
        secondaries: [],
      },
    ],
  },
  {
    filterType: "Order",
    primaries: [
      {
        text: "Asc",
        shown: true,
        active: orderAscActive.value,
        onClickHandler: setOrderAscHandler,
        secondaries: [],
      },
      {
        text: "Desc",
        shown: true,
        active: orderDescActive.value,
        onClickHandler: setOrderDescHandler,
        secondaries: [],
      },
    ],
  },

  {
    filterType: "View",
    primaries: [
      {
        text: "Adaptive",
        shown: true,
        active: viewAdaptiveActive.value,
        onClickHandler: setViewAdaptiveHandler,
        secondaries: [],
      },
      {
        text: "Aligned",
        shown: true,
        active: viewAlignedActive.value,
        onClickHandler: setViewAlignedHandler,
        secondaries: [],
      },
    ],
  },
]);
</script>

<style scoped></style>
