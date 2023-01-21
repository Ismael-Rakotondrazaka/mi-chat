<template>
  <button class="w-full" @click="openProfileHandler">
    <div
      class="flex flex-row items-start justify-between p-2 duration-200 bg-white border-2 rounded-md md:p-3 flex-nowrap gap-x-3 border-border hover:border-border-primary shadow-button hover:shadow-border-primary hover:bg-primary"
    >
      <AvatarUI :src="imageUrl" size="sm" type="personal" :userId="id" />

      <div class="w-full overflow-hidden">
        <div class="flex flex-col items-start justify-between">
          <p
            v-if="participation?.nickname"
            class="text-xs font-bold truncate md:text-sm text-slate-900"
          >
            {{ participation.nickname }}
            <span class="font-light"> ({{ name.full }})</span>
          </p>
          <p
            v-else
            class="text-xs font-bold truncate md:text-sm text-slate-900"
          >
            {{ name.full }}
          </p>

          <p v-if="participation" class="mr-1 text-xs truncate md:text-sm">
            <span
              v-if="participation.role === 'admin'"
              class="font-bold capitalize text-danger"
            >
              {{ participation.role }}
            </span>
            <span v-if="participation.role === 'admin'"> • </span>
            <span class="font-light text-gray-900">Member since </span>

            <span class="font-bold">
              {{ participationFormattedDate }}
            </span>
          </p>
        </div>
      </div>

      <div
        class="flex flex-row items-center justify-between gap-x-3 md:gap-x-1"
      >
        <ItemButtonUI
          v-if="canEditParticipant"
          @click.stop="editParticipantHandler"
          status="info"
        >
          <fa-icon icon="fa-user-pen" class="text-lg" />

          <span class="hidden ml-3 md:inline">Edit</span>
        </ItemButtonUI>

        <ItemButtonUI
          v-if="canDeleteParticipant"
          @click.stop="openDeleteParticipant"
          status="danger"
        >
          <fa-icon icon="fa-users-slash" class="text-lg" />

          <span class="hidden ml-3 md:inline">Remove</span>
        </ItemButtonUI>

        <ItemButtonUI
          v-if="canDeleteParticipation"
          @click.stop="openDeleteParticipationHandler"
          status="danger"
        >
          <fa-icon icon="fa-arrow-right-from-bracket" class="text-lg" />

          <span class="hidden ml-3 md:inline">Leave</span>
        </ItemButtonUI>
      </div>
    </div>

    <DeleteParticipant
      v-if="canDeleteParticipant"
      :shown="showDeleteParticipant"
      :id="id"
      :name="name"
      :imageUrl="imageUrl"
      :description="description"
      :createdAt="createdAt"
      :participation="participation"
      :conversationId="conversationId"
      :conversationName="conversationName"
      @close="closeDeleteParticipant"
    />

    <DeleteParticipation
      v-if="canDeleteParticipation"
      :shown="showDeleteParticipation"
      :id="conversationId"
      :type="conversationType"
      :name="conversationName"
      :imageUrl="conversationImageUrl"
      :description="conversationDescription"
      :createdAt="conversationCreatedAt"
      :updatedAt="conversationUpdatedAt"
      :converser="conversationConverser || null"
      :participation="conversationParticipation"
      :participantId="userStore.user.id"
      @close="closeDeleteParticipationHandler"
    />
  </button>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import ItemButtonUI from "../ui/ItemButtonUI.vue";
import DeleteParticipant from "./DeleteParticipant.vue";
import DeleteParticipation from "./DeleteParticipation.vue";
import { useUserStore } from "../../stores";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDateFormat } from "@vueuse/core";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  conversationId: {
    type: Number,
    required: true,
  },
  conversationName: {
    type: [String, null],
    required: false,
    default: null,
  },
  conversationType: {
    type: String,
    required: true,
    validator: (value) => {
      return ["personal", "group"].includes(value);
    },
  },
  conversationDescription: {
    type: [String, null],
    required: false,
    default: null,
  },
  conversationImageUrl: {
    type: [String, null],
    required: false,
    default: null,
  },
  conversationConverser: {
    type: [Object, null],
    required: false,
    default: null,
  },
  conversationParticipation: {
    type: [Object, null],
    required: false,
    default: null,
  },
  conversationCreatedAt: {
    type: Date,
    required: true,
  },
  conversationUpdatedAt: {
    type: Date,
    required: true,
  },
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
    type: [Object, null],
    required: false,
    default: null,
  },
  participation: {
    type: [Object, null],
    required: true,
    default: null,
  },
});

const canEditParticipant = computed(
  () => !!props.conversationParticipation && !!props.participation
);

const canDeleteParticipant = computed(
  () =>
    props.conversationType === "group" &&
    props.conversationParticipation?.role === "admin" &&
    props.participation?.role === "participant"
);

const participationFormattedDate = computed(() => {
  let result = "";

  if (props.participation) {
    result = useDateFormat(props.participation.createdAt, "MMM D, YYYY").value;
  }

  return result;
});

const openProfileHandler = () => {
  router.push({
    name: "profile-item",
    params: {
      userId: props.id,
    },
  });
};

const editParticipantHandler = () => {
  router.push({
    name: "participant-edit",
    params: {
      conversationId: props.conversationId,
      participantId: props.id,
    },
  });
};

const showDeleteParticipant = ref(false);
const openDeleteParticipant = () => {
  showDeleteParticipant.value = true;
};

const closeDeleteParticipant = () => {
  showDeleteParticipant.value = false;
};

const canDeleteParticipation = computed(
  () => props.conversationParticipation && userStore.user.id === props.id
);
const showDeleteParticipation = ref(false);
const openDeleteParticipationHandler = () => {
  showDeleteParticipation.value = true;
};

const closeDeleteParticipationHandler = () => {
  showDeleteParticipation.value = false;
};
</script>

<style scoped></style>
