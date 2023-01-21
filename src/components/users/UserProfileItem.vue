<template>
  <div class="bg-white border-2 rounded-md border-border shadow-button">
    <div class="flex flex-col items-center justify-between h-full p-3 gap-y-3">
      <VDropdown :distance="5" class="place-self-end">
        <button class="px-3">
          <fa-icon icon="bars" class="inline-block text-xl" />

          <span class="sr-only">Options</span>
        </button>

        <template #popper>
          <div class="p-1">
            <button
              @click="copyProfileLinkHandler"
              class="p-2 border-2 border-transparent rounded-md hover:border-border-info active:bg-info"
            >
              <fa-icon icon="copy" class="inline-block mr-3" />
              <span>Copy profile link</span>
            </button>
          </div>
        </template>
      </VDropdown>

      <button @click="openProfileImageHandler">
        <AvatarUI :src="imageUrl" size="md" :userId="id" />
      </button>

      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="text-3xl font-bold">{{ name.full }}</h1>

        <p
          v-if="description"
          class="overflow-x-auto text-sm whitespace-normal font-light px-7"
        >
          {{ description }}
        </p>
      </div>
    </div>

    <div>
      <div
        v-if="friendship.isFriend"
        class="w-full flex flex-col items-start justify-center px-3 py-1 text-left text-black border-t border-border min-h-[3.5rem]"
      >
        <div>
          Friend since
          <span class="font-bold">
            {{ formattedFriendShipDate }}
          </span>
        </div>
      </div>

      <div>
        <button
          @click="openFriendListHandler"
          class="w-full px-3 py-4 text-left border-y border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="user-group" class="mr-3 text-xl" />

          <span v-if="friends.length === 0">No friends</span>

          <span v-else-if="friends.length === 1">
            <span class="font-bold">
              {{ friends.length }}
            </span>
            friend
          </span>

          <span v-else>
            <span class="font-bold">
              {{ friends.length }}
            </span>
            friends
          </span>

          <span
            v-if="
              friends.length > 0 &&
              mutualFriendsCount === 1 &&
              !userStore.is(id)
            "
          >
            (<span class="font-bold">
              {{ mutualFriendsCount }}
            </span>
            mutual)
          </span>

          <span
            v-if="
              friends.length > 0 && mutualFriendsCount > 1 && !userStore.is(id)
            "
          >
            (<span class="font-bold">
              {{ mutualFriendsCount }}
            </span>
            mutuals)
          </span>
        </button>
      </div>

      <div v-if="friendship.isFriend">
        <button
          @click="openConversationHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-primary hover:text-white text-primary"
        >
          <fa-icon icon="message" class="mr-3 text-xl" />

          <span>Open chat</span>
        </button>
      </div>

      <div v-if="friendship.isFriend">
        <button
          @click="openDeleteFriendHandler"
          class="w-full px-3 py-4 text-left hover:bg-danger hover:text-white text-danger rounded-b-md"
        >
          <fa-icon icon="user-minus" class="mr-3 text-xl" />

          <span>Unfriend</span>
        </button>
      </div>

      <div v-if="friendRequest && userStore.is(friendRequest.receiverId)">
        <button
          @click="openUpdateFriendRequestHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="user-plus" class="mr-3 text-xl" />

          <span>Accept friend request</span>
        </button>
      </div>

      <div v-if="friendRequest">
        <button
          @click="openCancelFriendRequestHandler"
          class="w-full px-3 py-4 text-left hover:bg-danger hover:text-white text-danger rounded-b-md"
        >
          <fa-icon icon="user-xmark" class="mr-3 text-xl" />

          <span>Cancel friend request</span>
        </button>
      </div>

      <div v-if="canSendFriendRequest">
        <button
          @click="openCreateFriendRequestHandler"
          class="w-full px-3 py-4 text-left hover:bg-info hover:text-white text-info rounded-b-md"
        >
          <fa-icon icon="user-plus" class="mr-3 text-xl" />

          <span>Send friend request</span>
        </button>
      </div>

      <div v-if="canEditUser">
        <button
          @click="openEditProfileHandler"
          class="w-full px-3 py-4 text-left hover:bg-info hover:text-white text-info rounded-b-md"
        >
          <fa-icon icon="user-pen" class="mr-3 text-xl" />

          <span>Edit</span>
        </button>
      </div>
    </div>

    <ImageModal
      v-if="imageUrl"
      :src="imageUrl"
      :shown="showProfileImage"
      @close="closeProfileImageHandler"
    />

    <CreateFriendRequest
      v-if="canSendFriendRequest"
      :shown="showCreateFriendRequest"
      :id="id"
      :name="name"
      :imageUrl="imageUrl"
      :description="description"
      :createdAt="createdAt"
      @close="closeCreateFriendRequestHandler"
    />

    <UpdateFriendRequest
      v-if="friendRequest && userStore.is(friendRequest.receiverId)"
      :shown="showUpdateFriendRequest"
      :id="friendRequest.id"
      :receiverId="friendRequest.receiverId"
      :createdAt="friendRequest.createdAt"
      :sender="friendRequest.sender"
      @close="closeUpdateFriendRequestHandler"
    />

    <CancelFriendRequest
      v-if="friendRequest"
      :shown="showCancelFriendRequest"
      :id="friendRequest.id"
      :receiverId="friendRequest.receiverId"
      :createdAt="friendRequest.createdAt"
      :sender="friendRequest.sender"
      :receiver="friendRequestReceiver"
      @close="closeCancelFriendRequestHandler"
    />

    <DeleteFriend
      v-if="friendship.isFriend"
      :shown="showDeleteFriend"
      :id="id"
      :name="name"
      :imageUrl="imageUrl"
      :description="description"
      :createdAt="createdAt"
      :friendship="friendship"
      @close="closeDeleteFriendHandler"
    />
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import CreateFriendRequest from "../friendRequests/CreateFriendRequest.vue";
import CancelFriendRequest from "../friendRequests/CancelFriendRequest.vue";
import DeleteFriend from "../friends/DeleteFriend.vue";
import UpdateFriendRequest from "../friendRequests/UpdateFriendRequest.vue";
import ImageModal from "../commons/ImageModal.vue";
import { useUserStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useDateFormat } from "@vueuse/core";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: Object,
    required: true,
  },
  imageUrl: {
    type: [String, null],
    required: false,
    default: null,
  },
  description: {
    type: [String, null],
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  friendship: {
    type: Object,
    required: false,
    default: () => ({
      isFriend: false,
    }),
  },
  friendRequest: {
    type: [Object, null],
    required: false,
    default: null,
  },
  friends: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const appUrl = import.meta.env.VITE_APP_URL;

const copyProfileLinkHandler = () => {
  navigator.clipboard.writeText(`${appUrl}/profiles/${props.id}`);
};

const canSendFriendRequest = computed(() => {
  return (
    !props.friendship.isFriend &&
    !props.friendRequest &&
    userStore.user &&
    !userStore.is(props.id)
  );
});

const canEditUser = computed(() => {
  return userStore.is(props.id);
});

const mutualFriendsCount = computed(() => {
  return props.friends.reduce((prev, curr) => {
    return curr.friendship.isFriend ? prev + 1 : prev;
  }, 0);
});

const openFriendListHandler = () => {
  router.push({
    name: "friend-list",
    params: {
      userId: props.id,
    },
  });
};

const openConversationHandler = () => {
  if (props.friendship.isFriend) {
    router.push({
      name: "message-list",
      params: {
        conversationId: props.friendship.conversationId,
      },
    });
  }
};

const openEditProfileHandler = () => {
  if (userStore.is(props.id)) {
    router.push({
      name: "profile-edit",
    });
  }
};

const showProfileImage = ref(false);
const openProfileImageHandler = () => {
  if (props.imageUrl) {
    showProfileImage.value = true;
  }
};
const closeProfileImageHandler = () => {
  showProfileImage.value = false;
};

const showUpdateFriendRequest = ref(false);
const openUpdateFriendRequestHandler = () => {
  showUpdateFriendRequest.value = true;
};
const closeUpdateFriendRequestHandler = () => {
  showUpdateFriendRequest.value = false;
};
watch(
  () => props.friendRequest && userStore.is(props.friendRequest.receiverId),
  (newValue) => {
    if (!newValue) {
      closeUpdateFriendRequestHandler();
    }
  }
);

const showCreateFriendRequest = ref(false);
const openCreateFriendRequestHandler = () => {
  showCreateFriendRequest.value = true;
};
const closeCreateFriendRequestHandler = () => {
  showCreateFriendRequest.value = false;
};
const friendRequestReceiver = computed(() => ({
  id: props.id,
  name: props.name,
  imageUrl: props.imageUrl,
  description: props.description,
  createdAt: props.createdAt,
  friendship: props.friendship,
}));
watch(canSendFriendRequest, (newValue) => {
  if (!newValue) {
    closeCreateFriendRequestHandler();
  }
});

const showCancelFriendRequest = ref(false);
const openCancelFriendRequestHandler = () => {
  showCancelFriendRequest.value = true;
};
const closeCancelFriendRequestHandler = () => {
  showCancelFriendRequest.value = false;
};
watch(
  () => props.friendRequest,
  (newValue) => {
    if (!newValue) {
      closeCancelFriendRequestHandler();
    }
  }
);

const showDeleteFriend = ref(false);
const openDeleteFriendHandler = () => {
  showDeleteFriend.value = true;
};
const closeDeleteFriendHandler = () => {
  showDeleteFriend.value = false;
};
watch(
  () => props.friendship.isFriend,
  (newValue) => {
    if (!newValue) {
      closeDeleteFriendHandler();
    }
  }
);

const formattedFriendShipDate = computed(() => {
  let result = "";

  if (props.friendship.isFriend) {
    result = useDateFormat(props.friendship.createdAt, "MMM D, YYYY").value;
  }

  return result;
});
</script>

<style scoped></style>
