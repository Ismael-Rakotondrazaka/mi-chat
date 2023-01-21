<template>
  <CustomFilter
    :shown="showFilter"
    :filters="filters"
    :reset="reset"
    :searchText="searchText"
    @resettled="resettled"
    @filter:open="openFilterHandler"
    @filter:close="closeFilterHandler"
    @filter:reset="resetFilterHandler"
    @searchText:update="updateSearchTextHandler"
  />
</template>

<script setup>
import CustomFilter from "../filters/CustomFilter.vue";
import { useConversationOpenedStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const conversationOpenedStore = useConversationOpenedStore();

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

watch(nameFilter, (newValue) => {
  conversationOpenedStore.participantNameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  conversationOpenedStore.participantTypeFilter = "participant-type-all";
  conversationOpenedStore.participantOrderFilter = "participant-order-asc";
  conversationOpenedStore.participantNameFilter = "";
};

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};

watch(
  () => route.path,
  () => {
    resetFilterHandler();
    reset.value = true;
  },
  {
    immediate: true,
  }
);

const setTypeAllHandler = () =>
  (conversationOpenedStore.participantTypeFilter = "participant-type-all");
const typeAllActive = computed(
  () => conversationOpenedStore.participantTypeFilter === "participant-type-all"
);

const setTypeFriendHandler = () =>
  (conversationOpenedStore.participantTypeFilter = "participant-type-friend");
const typeFriendActive = computed(
  () =>
    conversationOpenedStore.participantTypeFilter === "participant-type-friend"
);

const setTypeNotFriendHandler = () =>
  (conversationOpenedStore.participantTypeFilter =
    "participant-type-not-friend");
const typeNotFriendActive = computed(
  () =>
    conversationOpenedStore.participantTypeFilter ===
    "participant-type-not-friend"
);

const setOrderAscHandler = () =>
  (conversationOpenedStore.participantOrderFilter = "participant-order-asc");
const orderAscActive = computed(
  () =>
    "participant-order-asc" === conversationOpenedStore.participantOrderFilter
);

const setOrderDescHandler = () =>
  (conversationOpenedStore.participantOrderFilter = "participant-order-desc");
const orderDescActive = computed(
  () =>
    "participant-order-desc" === conversationOpenedStore.participantOrderFilter
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
        text: "Friend",
        shown: true,
        active: typeFriendActive.value,
        onClickHandler: setTypeFriendHandler,
        secondaries: [],
      },
      {
        text: "Not friend",
        shown: true,
        active: typeNotFriendActive.value,
        onClickHandler: setTypeNotFriendHandler,
        secondaries: [],
      },
    ],
  },
  {
    filterType: "Order",
    primaries: [
      {
        text: "Ascending",
        shown: true,
        active: orderAscActive.value,
        onClickHandler: setOrderAscHandler,
        secondaries: [],
      },
      {
        text: "Descending",
        shown: true,
        active: orderDescActive.value,
        onClickHandler: setOrderDescHandler,
        secondaries: [],
      },
    ],
  },
]);
</script>

<style scoped></style>
