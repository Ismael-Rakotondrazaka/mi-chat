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
import { useConversationStore } from "../../stores";

import { ref, computed, watch } from "vue";

const conversationStore = useConversationStore();

const searchText = ref("");
const updateSearchTextHandler = (newValue) => {
  searchText.value = newValue;
};

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

watch(nameFilter, (newValue) => {
  conversationStore.nameFilter = newValue;
});

const showFilter = ref(false);
const closeFilterHandler = () => {
  showFilter.value = false;
};
const openFilterHandler = () => {
  showFilter.value = true;
};
const resetFilterHandler = () => {
  conversationStore.typeFilter = "type-all";
  conversationStore.orderFilter = "order-update-desc";
};

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};

const setTypeAllHandler = () => (conversationStore.typeFilter = "type-all");
const typeAllActive = computed(
  () => conversationStore.typeFilter === "type-all"
);

const isTypePersonal = computed(() =>
  [
    "type-personal-all",
    "type-personal-friend",
    "type-personal-not-friend",
  ].includes(conversationStore.typeFilter)
);

const setTypePersonalAllHandler = () =>
  (conversationStore.typeFilter = "type-personal-all");
const typePersonalActive = computed(() =>
  [
    "type-personal-all",
    "type-personal-friend",
    "type-personal-not-friend",
  ].includes(conversationStore.typeFilter)
);
const typePersonalAllActive = computed(
  () => "type-personal-all" === conversationStore.typeFilter
);

const setTypePersonalFriendHandler = () =>
  (conversationStore.typeFilter = "type-personal-friend");
const typePersonalFriendActive = computed(
  () => conversationStore.typeFilter === "type-personal-friend"
);

const setTypePersonalNotFriendHandler = () =>
  (conversationStore.typeFilter = "type-personal-not-friend");
const typePersonalNotFriendActive = computed(
  () => conversationStore.typeFilter === "type-personal-not-friend"
);

const isTypeGroup = computed(() =>
  ["type-group-all", "type-group-member", "type-group-not-member"].includes(
    conversationStore.typeFilter
  )
);

const setTypeGroupAllHandler = () =>
  (conversationStore.typeFilter = "type-group-all");
const typeGroupActive = computed(() =>
  ["type-group-all", "type-group-member", "type-group-not-member"].includes(
    conversationStore.typeFilter
  )
);
const typeGroupAllActive = computed(
  () => "type-group-all" === conversationStore.typeFilter
);

const setTypeGroupMemberHandler = () =>
  (conversationStore.typeFilter = "type-group-member");
const typeGroupMemberActive = computed(
  () => "type-group-member" === conversationStore.typeFilter
);

const setTypeGroupNotMemberHandler = () =>
  (conversationStore.typeFilter = "type-group-not-member");
const typeGroupNotMemberActive = computed(
  () => "type-group-not-member" === conversationStore.typeFilter
);

const isOrderUpdate = computed(() =>
  ["order-update-asc", "order-update-desc"].includes(
    conversationStore.orderFilter
  )
);
const orderUpdateActive = computed(() =>
  ["order-update-asc", "order-update-desc"].includes(
    conversationStore.orderFilter
  )
);

const setOrderUpdateAscHandler = () =>
  (conversationStore.orderFilter = "order-update-asc");
const orderUpdateAscActive = computed(
  () => "order-update-asc" === conversationStore.orderFilter
);

const setOrderUpdateDescHandler = () =>
  (conversationStore.orderFilter = "order-update-desc");
const orderUpdateDescActive = computed(
  () => "order-update-desc" === conversationStore.orderFilter
);

const isOrderName = computed(() =>
  ["order-name-asc", "order-name-desc"].includes(conversationStore.orderFilter)
);
const orderNameActive = computed(() =>
  ["order-name-asc", "order-name-desc"].includes(conversationStore.orderFilter)
);

const setOrderNameAscHandler = () =>
  (conversationStore.orderFilter = "order-name-asc");
const orderNameAscActive = computed(
  () => "order-name-asc" === conversationStore.orderFilter
);

const setOrderNameDescHandler = () =>
  (conversationStore.orderFilter = "order-name-desc");
const orderNameDescActive = computed(
  () => "order-name-desc" === conversationStore.orderFilter
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
        text: "Personal",
        shown: true,
        active: typePersonalActive.value,
        onClickHandler: setTypePersonalAllHandler,
        secondaries: [
          {
            text: "All",
            shown: isTypePersonal.value,
            active: typePersonalAllActive.value,
            onClickHandler: setTypePersonalAllHandler,
          },
          {
            text: "Friend",
            shown: isTypePersonal.value,
            active: typePersonalFriendActive.value,
            onClickHandler: setTypePersonalFriendHandler,
          },
          {
            text: "Not friend",
            shown: isTypePersonal.value,
            active: typePersonalNotFriendActive.value,
            onClickHandler: setTypePersonalNotFriendHandler,
          },
        ],
      },
      {
        text: "Group",
        shown: true,
        active: typeGroupActive.value,
        onClickHandler: setTypeGroupAllHandler,
        secondaries: [
          {
            text: "All",
            shown: isTypeGroup.value,
            active: typeGroupAllActive.value,
            onClickHandler: setTypeGroupAllHandler,
          },
          {
            text: "Member",
            shown: isTypeGroup.value,
            active: typeGroupMemberActive.value,
            onClickHandler: setTypeGroupMemberHandler,
          },
          {
            text: "Not member",
            shown: isTypeGroup.value,
            active: typeGroupNotMemberActive.value,
            onClickHandler: setTypeGroupNotMemberHandler,
          },
        ],
      },
    ],
  },
  {
    filterType: "Order",
    primaries: [
      {
        text: "Update",
        shown: true,
        active: orderUpdateActive.value,
        onClickHandler: setOrderUpdateDescHandler,
        secondaries: [
          {
            text: "Ascending",
            shown: isOrderUpdate.value,
            active: orderUpdateAscActive.value,
            onClickHandler: setOrderUpdateAscHandler,
          },
          {
            text: "Descending",
            shown: isOrderUpdate.value,
            active: orderUpdateDescActive.value,
            onClickHandler: setOrderUpdateDescHandler,
          },
        ],
      },
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
    ],
  },
]);
</script>

<style scoped></style>
