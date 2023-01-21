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
              @click="copyConversationLinkHandler"
              class="p-2 border-2 border-transparent rounded-md hover:border-border-info active:bg-info"
            >
              <fa-icon icon="copy" class="inline-block mr-3" />
              <span>Copy chat link</span>
            </button>
          </div>
        </template>
      </VDropdown>

      <button @click="openProfileImageHandler">
        <AvatarUI :src="avatarSrc" :type="type" size="md" :userId="id" />
      </button>

      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="text-3xl font-bold">{{ conversationName }}</h1>

        <p
          v-if="description"
          class="overflow-x-auto text-sm whitespace-normal font-light px-7"
        >
          {{ description }}
        </p>
      </div>
    </div>

    <div>
      <ul class="list-disc list-inside">
        <li
          v-if="type === 'group' && participation"
          class="w-full py-1 pl-3 pr-3 text-left text-black border-t border-border"
        >
          Member since
          <span class="font-bold">
            {{ participationFormattedDate }}
          </span>
        </li>

        <li
          v-if="type === 'group' && participation?.nickname"
          class="w-full px-3 py-1 text-left text-black"
        >
          Nickname:
          <span class="font-bold">
            {{ participation.nickname }}
          </span>

          <button
            @click="editParticipationHandler"
            class="ml-5 text-info hover:underline underline-offset-4"
          >
            <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

            Edit nickname
          </button>
        </li>

        <li
          v-if="type === 'group' && participation?.nickname === null"
          class="w-full px-3 py-1 text-left"
        >
          <button
            @click="editParticipationHandler"
            class="text-info hover:underline underline-offset-4"
          >
            <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

            Add nickname
          </button>
        </li>

        <li
          v-if="type === 'group' && participation"
          class="w-full px-3 py-1 text-left text-black border-b border-border"
        >
          Role:
          <span class="font-bold capitalize">
            {{ participation.role }}
          </span>
        </li>
      </ul>

      <div
        v-if="type === 'personal' && converser.friendship.isFriend"
        class="w-full py-1 pl-3 pr-3 text-left text-black border-y border-border"
      >
        <p>Nicknames:</p>
        <ul class="list-disc list-inside">
          <li
            v-if="converser.participation.nickname"
            class="w-full px-3 py-1 text-left"
          >
            <span class="font-bold">
              {{ converser.participation.nickname }}
            </span>

            <span class="font-light">{{ converser.name.first }}</span>

            <button
              @click="editConverserHandler"
              class="ml-5 text-info hover:underline underline-offset-4"
            >
              <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

              Edit nickname
            </button>
          </li>
          <li v-else class="w-full px-3 py-1 text-left">
            <span class="font-light">({{ converser.name.first }})</span>

            <button
              @click="editConverserHandler"
              class="ml-5 text-info hover:underline underline-offset-4"
            >
              <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

              Add nickname
            </button>
          </li>

          <li v-if="participation.nickname" class="w-full px-3 py-1 text-left">
            <span class="font-bold">
              {{ participation.nickname }}
            </span>

            <span class="font-light"> (You)</span>

            <button
              @click="editParticipationHandler"
              class="ml-5 text-info hover:underline underline-offset-4"
            >
              <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

              Edit nickname
            </button>
          </li>
          <li v-else class="w-full px-3 py-1 text-left">
            <span class="font-light"> (You)</span>

            <button
              @click="editParticipationHandler"
              class="ml-5 text-info hover:underline underline-offset-4"
            >
              <fa-icon icon="pen-to-square" class="mr-1 text-xl" />

              Add nickname
            </button>
          </li>
        </ul>
      </div>

      <div v-if="type === 'personal'">
        <button
          @click="openProfileHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
          :class="{
            'border-t': !converser.friendship.isFriend,
          }"
        >
          <fa-icon icon="user" class="mr-3 text-xl" />

          <span>Open profile</span>
        </button>
      </div>

      <div>
        <button
          @click="openConversationHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-primary hover:text-white text-primary"
          :class="{
            'border-t': type === 'group' && !participation,
          }"
        >
          <fa-icon icon="message" class="mr-3 text-xl" />

          <span>Open chat</span>
        </button>
      </div>

      <div v-if="participation && type === 'group'">
        <button
          @click="openParticipantsHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="users" class="mr-3 text-xl" />

          <span v-if="participants.length === 0">No participant</span>
          <span v-else-if="participants.length === 1">
            <span class="font-bold">1</span> participant
          </span>
          <span v-else>
            <span class="font-bold">
              {{ participants.length }}
            </span>
            participants
          </span>
        </button>
      </div>

      <div>
        <button
          @click="openSharedMediasHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="images" class="mr-3 text-xl" />

          <span v-if="sharedMediasCount === 0">No shared media</span>
          <span v-else-if="sharedMediasCount === 1">1 shared media</span>
          <span v-else>{{ sharedMediasCount }} shared medias</span>
        </button>
      </div>

      <div v-if="participation?.role === 'admin'">
        <button
          @click="editConversationHandler"
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="user-pen" class="mr-3 text-xl" />

          <span>Edit</span>
        </button>
      </div>

      <div>
        <button
          @click="openDeleteConversationHandler"
          class="w-full px-3 py-4 text-left hover:bg-danger hover:text-white text-danger border-border"
          :class="{
            'border-b': type === 'group' && participation,
          }"
        >
          <fa-icon icon="trash" class="mr-3 text-xl" />

          <span>Delete</span>
        </button>
      </div>

      <div v-if="type === 'group' && participation">
        <button
          @click="openDeleteParticipationHandler"
          class="w-full px-3 py-4 text-left hover:bg-danger hover:text-white text-danger rounded-b-md"
        >
          <fa-icon icon="arrow-right-from-bracket" class="mr-3 text-xl" />

          <span>Leave</span>
        </button>
      </div>
    </div>

    <ImageModal
      v-if="avatarSrc"
      :src="avatarSrc"
      :shown="showProfileImage"
      :needAuth="isImageModalNeedAuth"
      @close="closeProfileImageHandler"
    />

    <DeleteConversation
      :shown="showDeleteConversation"
      :id="id"
      :type="type"
      :name="name"
      :imageUrl="imageUrl"
      :description="description"
      :createdAt="createdAt"
      :updatedAt="updatedAt"
      :converser="converser || null"
      :participation="participation"
      @close="closeDeleteConversationHandler"
    />

    <DeleteParticipation
      v-if="participation"
      :shown="showDeleteParticipation"
      :id="id"
      :type="type"
      :name="name"
      :imageUrl="imageUrl"
      :description="description"
      :createdAt="createdAt"
      :updatedAt="updatedAt"
      :converser="converser || null"
      :participation="participation"
      :participantId="userStore.user.id"
      @close="closeDeleteParticipationHandler"
    />
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import ImageModal from "../commons/ImageModal.vue";
import DeleteConversation from "../conversations/DeleteConversation.vue";
import DeleteParticipation from "../participants/DeleteParticipation.vue";
import { useUserStore } from "../../stores";

import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useDateFormat } from "@vueuse/core";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return ["personal", "group"].includes(value);
    },
  },
  name: {
    type: [String, null],
    required: false,
    default: null,
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
  updatedAt: {
    type: Date,
    required: true,
  },
  converser: {
    type: [Object, null],
    required: false,
    default: null,
  },
  participation: {
    type: [Object, null],
    required: false,
    default: null,
  },
  participants: {
    type: Array,
    required: false,
    default: () => [],
  },
  sharedMediasCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const conversationName = computed(() => {
  return props.type === "group" ? props.name : props.converser.name.full;
});

const avatarSrc = computed(() => {
  return props.type === "personal" ? props.converser.imageUrl : props.imageUrl;
});

const appUrl = import.meta.env.VITE_APP_URL;

const copyConversationLinkHandler = () => {
  navigator.clipboard.writeText(`${appUrl}/conversations/${props.id}`);
};

const participationFormattedDate = computed(() => {
  let result = "";

  if (props.type === "group" && props.participation) {
    result = useDateFormat(props.participation.createdAt, "MMM D, YYYY").value;
  }

  return result;
});

const isImageModalNeedAuth = computed(() => {
  let result = false;

  if (avatarSrc.value && props.type === "group") {
    result = true;
  }

  return result;
});
const showProfileImage = ref(false);
const openProfileImageHandler = () => {
  if (avatarSrc.value) {
    showProfileImage.value = true;
  }
};
const closeProfileImageHandler = () => {
  showProfileImage.value = false;
};

const openProfileHandler = () => {
  router.push({
    name: "profile-item",
    params: {
      userId: props.converser.id,
    },
  });
};

const openConversationHandler = () => {
  router.push({
    name: "message-list",
    params: {
      conversationId: props.id,
    },
  });
};

const openParticipantsHandler = () => {
  router.push({
    name: "participant-list",
    params: {
      conversationId: props.id,
    },
  });
};

const openSharedMediasHandler = () => {
  router.push({
    name: "conversation-media",
    params: {
      conversationId: props.id,
    },
  });
};

const editParticipationHandler = () => {
  router.push({
    name: "participant-edit",
    params: {
      conversationId: props.id,
      participantId: userStore.user.id,
    },
  });
};

const editConverserHandler = () => {
  router.push({
    name: "participant-edit",
    params: {
      conversationId: props.id,
      participantId: props.converser.id,
    },
  });
};

const editConversationHandler = () => {
  router.push({
    name: "conversation-edit",
    params: {
      conversationId: props.id,
    },
  });
};

const showDeleteConversation = ref(false);
const openDeleteConversationHandler = () => {
  showDeleteConversation.value = true;
};
const closeDeleteConversationHandler = () => {
  showDeleteConversation.value = false;
};

const showDeleteParticipation = ref(false);
const openDeleteParticipationHandler = () => {
  showDeleteParticipation.value = true;
};
const closeDeleteParticipationHandler = () => {
  showDeleteParticipation.value = false;
};
</script>

<style scoped></style>
