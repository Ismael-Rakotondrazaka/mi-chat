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
import { useFriendRequestStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const friendRequestStore = useFriendRequestStore();
const route = useRoute();

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

watch(nameFilter, (newValue) => {
  friendRequestStore.nameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  friendRequestStore.orderFilter = "order-sent-desc";
  friendRequestStore.nameFilter = "";
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
  ["order-name-asc", "order-name-desc"].includes(friendRequestStore.orderFilter)
);

const setOrderSentAscHandler = () =>
  (friendRequestStore.orderFilter = "order-sent-asc");
const orderSentActive = computed(() =>
  ["order-sent-asc", "order-sent-desc"].includes(friendRequestStore.orderFilter)
);
const orderSentAscActive = computed(
  () => "order-sent-asc" === friendRequestStore.orderFilter
);

const setOrderSentDescHandler = () =>
  (friendRequestStore.orderFilter = "order-sent-desc");
const orderSentDescActive = computed(
  () => friendRequestStore.orderFilter === "order-sent-desc"
);

const isOrderSent = computed(() =>
  ["order-sent-asc", "order-sent-desc"].includes(friendRequestStore.orderFilter)
);

const orderNameActive = computed(() =>
  ["order-name-asc", "order-name-desc"].includes(friendRequestStore.orderFilter)
);

const setOrderNameAscHandler = () =>
  (friendRequestStore.orderFilter = "order-name-asc");
const orderNameAscActive = computed(
  () => "order-name-asc" === friendRequestStore.orderFilter
);

const setOrderNameDescHandler = () =>
  (friendRequestStore.orderFilter = "order-name-desc");
const orderNameDescActive = computed(
  () => "order-name-desc" === friendRequestStore.orderFilter
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
        text: "Sent",
        shown: true,
        active: orderSentActive.value,
        onClickHandler: setOrderSentAscHandler,
        secondaries: [
          {
            text: "Ascending",
            shown: isOrderSent.value,
            active: orderSentAscActive.value,
            onClickHandler: setOrderSentAscHandler,
          },
          {
            text: "Descending",
            shown: isOrderSent.value,
            active: orderSentDescActive.value,
            onClickHandler: setOrderSentDescHandler,
          },
        ],
      },
    ],
  },
]);
</script>

<style scoped></style>
