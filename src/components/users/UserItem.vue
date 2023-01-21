<template>
  <button class="w-full" @click="openProfileHandler">
    <div
      class="flex flex-row items-start justify-between p-2 duration-200 bg-white border-2 rounded-md md:p-3 flex-nowrap gap-x-3 border-border hover:border-border-primary shadow-button hover:shadow-border-primary hover:bg-primary"
    >
      <AvatarUI :src="imageUrl" size="sm" type="personal" :userId="id" />

      <div class="w-full overflow-hidden">
        <div class="flex flex-col items-start justify-between">
          <p class="text-xs font-bold truncate md:text-sm text-slate-900">
            {{ name.full }}
          </p>

          <p
            v-if="friendship.isFriend"
            class="mr-1 text-xs truncate md:text-sm"
          >
            <span class="font-light text-gray-900">Friend since </span>

            <span class="font-bold">
              {{ formattedFriendship }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useDateFormat } from "@vueuse/shared";

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
    type: [Object, null],
    required: false,
    default: null,
  },
});

const openProfileHandler = () => {
  router.push({
    name: "profile-item",
    params: {
      userId: props.id,
    },
  });
};

const formattedFriendship = computed(() => {
  let result = "";

  if (props.friendship.isFriend) {
    result = useDateFormat(props.friendship.createdAt, "MMM D, YYYY").value;
  }

  return result;
});
</script>

<style scoped></style>
