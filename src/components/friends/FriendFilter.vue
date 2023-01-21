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
import { useProfileOpenedStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const profileOpenedStore = useProfileOpenedStore();
const route = useRoute();

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

watch(nameFilter, (newValue) => {
  profileOpenedStore.nameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  profileOpenedStore.orderFilter = "order-name-asc";
  profileOpenedStore.nameFilter = "";
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

const isOrderName = computed(() =>
  ["order-name-asc", "order-name-desc"].includes(profileOpenedStore.orderFilter)
);

const setOrderFriendshipAscHandler = () =>
  (profileOpenedStore.orderFilter = "order-friendship-asc");
const orderFriendshipActive = computed(() =>
  ["order-friendship-asc", "order-friendship-desc"].includes(
    profileOpenedStore.orderFilter
  )
);
const orderFriendshipAscActive = computed(
  () => "order-friendship-asc" === profileOpenedStore.orderFilter
);

const setOrderFriendshipDescHandler = () =>
  (profileOpenedStore.orderFilter = "order-friendship-desc");
const orderFriendshipDescActive = computed(
  () => profileOpenedStore.orderFilter === "order-friendship-desc"
);

const isOrderFriendship = computed(() =>
  ["order-friendship-asc", "order-friendship-desc"].includes(
    profileOpenedStore.orderFilter
  )
);

const orderNameActive = computed(() =>
  ["order-name-asc", "order-name-desc"].includes(profileOpenedStore.orderFilter)
);

const setOrderNameAscHandler = () =>
  (profileOpenedStore.orderFilter = "order-name-asc");
const orderNameAscActive = computed(
  () => "order-name-asc" === profileOpenedStore.orderFilter
);

const setOrderNameDescHandler = () =>
  (profileOpenedStore.orderFilter = "order-name-desc");
const orderNameDescActive = computed(
  () => "order-name-desc" === profileOpenedStore.orderFilter
);

const filters = computed(() => [
  {
    filterType: "Order By",
    primaries: [
      {
        text: "Name",
        shown: true,
        active: orderNameActive.value,
        onClickHandler: setOrderNameAscHandler,
        secondaries: [
          {
            text: "Ascending",
            shown: isOrderName.value,
            active: orderNameAscActive.value,
            onClickHandler: setOrderNameAscHandler,
          },
          {
            text: "Descending",
            shown: isOrderName.value,
            active: orderNameDescActive.value,
            onClickHandler: setOrderNameDescHandler,
          },
        ],
      },
      {
        text: "Friendship",
        shown: true,
        active: orderFriendshipActive.value,
        onClickHandler: setOrderFriendshipAscHandler,
        secondaries: [
          {
            text: "Ascending",
            shown: isOrderFriendship.value,
            active: orderFriendshipAscActive.value,
            onClickHandler: setOrderFriendshipAscHandler,
          },
          {
            text: "Descending",
            shown: isOrderFriendship.value,
            active: orderFriendshipDescActive.value,
            onClickHandler: setOrderFriendshipDescHandler,
          },
        ],
      },
    ],
  },
]);
</script>

<style scoped></style>
