<template>
  <div
    class="w-full border-2 border-border rounded-md bg-white pt-[0.35rem] md:pt-5 shadow-button hover:shadow-button-primary hover:border-border-primary group hover:bg-primary"
  >
    <div class="relative w-full" :class="[mediaContainerClass]">
      <MediaLoader v-if="isLoading" class="absolute inset-0" />

      <button
        v-if="isBroken"
        @click="reloadHandler"
        class="w-full h-[150px] lg:h-[200px] xl:h-[250px]"
        :class="[imageClass]"
      >
        <VideoError
          class="flex flex-col items-center justify-center w-full h-full border-y-2 border-border group-hover:border-border-primary"
        />
      </button>

      <button v-else class="w-full" @click="openMediaHandler">
        <video class="w-full" @loadedmetadata="loadedHandler">
          <source
            :src="formattedSrc"
            :type="videoType"
            @error="makeBrokenHandler"
            preload="metadata"
            class="object-cover w-full border-y-2 border-border group-hover:border-border-primary max-h-48 md:max-h-72 lg:max-h-96"
            :class="[imageClass]"
          />
          Your browser does not support the video.
        </video>
      </button>
    </div>

    <MediaInfoPresenter
      :id="id"
      :conversationId="conversationId"
      :type="type"
      :content="content"
      :createdAt="createdAt"
      :sender="sender"
      class="hidden md:block"
    />
  </div>
</template>

<script setup>
import VideoError from "../errors/VideoError.vue";
import MediaLoader from "./MediaLoader.vue";
import MediaInfoPresenter from "./MediaInfoPresenter.vue";
import { getVideoTypeFromUrl } from "../../utils/strings";
import { useConversationOpenedStore, useTokenStore } from "../../stores";

import { ref, computed } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return value === "video";
    },
  },
  conversationId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
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

const conversationOpenedStore = useConversationOpenedStore();
const tokenStore = useTokenStore();

const formattedSrc = computed(
  () => `${props.content}?t=Bearer ${tokenStore.accessToken}`
);

const isBroken = ref(false);
const isLoading = ref(true);

const makeBrokenHandler = () => {
  isBroken.value = true;
  isLoading.value = false;
};

const reloadHandler = () => {
  if (isBroken.value) {
    isLoading.value = true;
    isBroken.value = false;
  }
};

const imageClass = computed(() =>
  conversationOpenedStore.isMasonryLayout
    ? ""
    : "h-[150px] lg:h-[200px] xl:h-[250px]"
);

const mediaContainerClass = computed(() =>
  isLoading.value ? "min-h-[150px] lg:min-h-[200px] xl:min-h-[250px]" : ""
);

const loadedHandler = () => {
  isLoading.value = false;
};

const videoType = computed(() => getVideoTypeFromUrl(props.content));

const openMediaHandler = () => {
  conversationOpenedStore.openMedia(props.id);
};
</script>

<style scoped></style>
