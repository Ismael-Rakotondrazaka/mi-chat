<template>
  <div>
    <ul class="flex flex-row flex-wrap gap-3 p-3">
      <li v-for="selectedUser in selectedUsers" :key="selectedUser.id" class="">
        <div class="flex flex-row items-start">
          <div class="flex flex-col items-center">
            <AvatarUI
              :src="selectedUser.imageUrl"
              size="sm"
              type="personal"
              :userId="selectedUser.id"
              class="mb-2"
            />
            <p class="text-xs truncate max-w-[50px]">
              {{ selectedUser.name.full }}
            </p>
          </div>

          <button
            @click="() => removeUserHandler(selectedUser.id)"
            class="-translate-y-3 text-danger"
          >
            <fa-icon icon="xmark" class="inline-block mr-3 text-2xl" />

            <span class="sr-only">Remove</span>
          </button>
        </div>
      </li>
    </ul>

    <SearchBar
      placeholder="Search"
      :modelValue="searchText"
      @update:modelValue="(newValue) => (searchText = newValue)"
      class="w-full mb-3"
    />

    <ul
      :class="{
        'border border-border': usersFiltered.length > 0,
      }"
    >
      <li
        v-for="user in usersFiltered"
        :key="user.id"
        class="w-full border-b last:border-none border-border first:rounded-t-md last:rounded-b-md"
      >
        <div
          class="flex flex-row items-start justify-between p-2 duration-200 bg-white flex-nowrap gap-x-3 hover:border-border-primary hover:bg-primary"
        >
          <AvatarUI
            :src="user.imageUrl"
            size="sm"
            type="personal"
            :userId="user.id"
          />

          <div class="w-full overflow-hidden">
            <div class="flex flex-col items-start justify-between">
              <p class="text-xs font-bold truncate md:text-sm text-slate-900">
                {{ user.name.full }}
              </p>
            </div>
          </div>

          <div class="flex flex-row items-center justify-between gap-x-1">
            <button
              @click.stop="() => addUserHandler(user.id)"
              class="px-2 py-1 border-2 rounded-md whitespace-nowrap border-border-info bg-info hover:bg-white"
              variant="outlined"
            >
              <fa-icon icon="fa-user-plus" class="inline-block mr-3 text-lg" />

              <span>Add</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import SearchBar from "../commons/SearchBar.vue";
import { useReset } from "../../composables";

import { ref, computed, watch } from "vue";

const props = defineProps({
  reset: {
    type: Boolean,
    required: false,
    default: false,
  },
  users: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const emit = defineEmits([
  "update:users",
  "update:usersIds",
  "update:searchText",
  "resettled",
]);

const searchText = ref("");

watch(searchText, (newValue) => {
  emit("update:searchText", newValue);
});

const nameFilter = computed(() => searchText.value.trim().toLowerCase());

const selectedUsersIds = ref([]);
watch(
  selectedUsersIds,
  (newValue) => {
    emit("update:usersIds", newValue);
  },
  {
    immediate: true,
  }
);

const selectedUsers = computed(() =>
  props.users.filter((user) => selectedUsersIds.value.includes(user.id))
);
watch(selectedUsers, (newValue) => {
  emit("update:users", newValue);
});

const removeUserHandler = (userId) => {
  selectedUsersIds.value = selectedUsersIds.value.filter((id) => id !== userId);
};

const addUserHandler = (userId) => {
  selectedUsersIds.value.push(userId);
};

const usersSearch = computed(() =>
  props.users.filter((user) => !selectedUsersIds.value.includes(user.id))
);

const usersFiltered = computed(() =>
  nameFilter.value.length === 0
    ? []
    : usersSearch.value.filter((user) => {
        const toCompare = user.name.full.toLowerCase();

        return new RegExp(nameFilter.value).test(toCompare);
      })
);

const resetData = () => {
  searchText.value = "";
  selectedUsersIds.value = [];
};

useReset(() => props.reset, [resetData], emit);
</script>

<style scoped></style>
