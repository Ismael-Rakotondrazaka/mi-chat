<template>
  <button class="w-full" @click="openProfileItemHandler">
    <div
      class="flex flex-row items-center justify-between p-2 duration-200 bg-white border-2 rounded-md md:p-3 flex-nowrap gap-x-3 border-border hover:border-border-primary shadow-button hover:shadow-border-primary hover:bg-primary"
    >
      <AvatarUI
        :src="sender.imageUrl"
        size="sm"
        type="personal"
        :userId="sender.id"
      />

      <div class="w-full overflow-hidden">
        <div class="flex flex-col items-start justify-between">
          <p class="text-xs font-bold truncate md:text-sm text-slate-900">
            {{ sender.name.full }}
          </p>

          <p class="mr-1 text-xs truncate md:text-sm">
            <span class="font-light text-gray-900">Sent on </span>

            <span class="font-bold">
              {{ formattedCreatedAtDate }}
            </span>
          </p>
        </div>
      </div>

      <div
        class="flex flex-row items-center justify-between gap-x-3 md:gap-x-1"
      >
        <ItemButtonUI
          @click.stop="openUpdateFriendRequestHandler"
          status="info"
        >
          <fa-icon icon="fa-user-plus" class="text-lg" />

          <span class="hidden ml-3 md:inline">Accept</span>
        </ItemButtonUI>

        <ItemButtonUI
          @click.stop="openDestroyFriendRequestHandler"
          status="danger"
        >
          <fa-icon icon="fa-user-xmark" class="text-lg" />

          <span class="hidden ml-3 md:inline">Delete</span>
        </ItemButtonUI>
      </div>
    </div>

    <UpdateFriendRequest
      :shown="showUpdateFriendRequest"
      :id="id"
      :receiverId="receiverId"
      :createdAt="createdAt"
      :sender="sender"
      @close="closeUpdateFriendRequestHandler"
    />

    <DeleteFriendRequest
      :shown="showDestroyFriendRequest"
      :id="id"
      :receiverId="receiverId"
      :createdAt="createdAt"
      :sender="sender"
      @close="closeDestroyFriendRequestHandler"
    />
  </button>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import ItemButtonUI from "../ui/ItemButtonUI.vue";
import DeleteFriendRequest from "../friendRequests/DeleteFriendRequest.vue";
import UpdateFriendRequest from "../friendRequests/UpdateFriendRequest.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDateFormat } from "@vueuse/core";

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  receiverId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  sender: {
    type: Object,
    required: true,
  },
});

const openProfileItemHandler = () => {
  router.push({
    name: "profile-item",
    params: {
      userId: props.sender.id,
    },
  });
};

const formattedCreatedAtDate = useDateFormat(props.createdAt, "MMM D, YYYY");

const showUpdateFriendRequest = ref(false);
const openUpdateFriendRequestHandler = () => {
  showUpdateFriendRequest.value = true;
};
const closeUpdateFriendRequestHandler = () => {
  showUpdateFriendRequest.value = false;
};

const showDestroyFriendRequest = ref(false);
const openDestroyFriendRequestHandler = () => {
  showDestroyFriendRequest.value = true;
};
const closeDestroyFriendRequestHandler = () => {
  showDestroyFriendRequest.value = false;
};
</script>

<style scoped></style>
