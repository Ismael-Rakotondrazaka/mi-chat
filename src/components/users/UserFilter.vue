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
import { useUserStore } from "../../stores";

import { ref, computed, watch } from "vue";
import CustomFilter from "../filters/CustomFilter.vue";

const userStore = useUserStore();

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());
const filterUsers = (arrs) => {
  const arr = [];

  for (const singleArr of arrs) {
    arr.push(...singleArr);
  }

  let ids = new Set();

  let result = [];

  arr.forEach((user) => {
    if (!ids.has(user.id)) {
      result.push(user);
      ids.add(user.id);
    }
  });

  return result;
};
watch(nameFilter, async (newValue) => {
  userStore.users =
    newValue.length > 0
      ? filterUsers(
          await Promise.all(
            newValue.split(" ").map(async (word) => {
              return (
                await userStore.indexUser({
                  params: {
                    like: word,
                  },
                })
              ).users;
            })
          )
        )
      : [];

  userStore.nameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  userStore.typeFilter = "type-all";
  userStore.orderFilter = "order-asc";
  userStore.nameFilter = "";
};

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};

const setTypeAllHandler = () => (userStore.typeFilter = "type-all");
const typeAllActive = computed(() => userStore.typeFilter === "type-all");

const setTypeFriendHandler = () => (userStore.typeFilter = "type-friend");
const typeFriendActive = computed(() => userStore.typeFilter === "type-friend");

const setTypeNotFriendHandler = () =>
  (userStore.typeFilter = "type-not-friend");
const typeNotFriendActive = computed(
  () => userStore.typeFilter === "type-not-friend"
);

const setOrderAscHandler = () => (userStore.orderFilter = "order-asc");
const orderAscActive = computed(() => "order-asc" === userStore.orderFilter);

const setOrderDescHandler = () => (userStore.orderFilter = "order-desc");
const orderDescActive = computed(() => "order-desc" === userStore.orderFilter);

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
