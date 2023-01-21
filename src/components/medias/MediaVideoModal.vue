<template>
  <div class="flex flex-col items-center justify-center swiper-zoom-container">
    <MediaLoader v-if="isLoading" class="" />

    <button v-if="isBroken" @click="reloadHandler" class="w-52 h-52">
      <VideoError />
    </button>

    <video
      v-else
      @loadedmetadata="loadedHandler"
      preload="metadata"
      controls
      class="shrink-0 max-h-screen max-w-[100vw]"
      ref="videoRef"
    >
      <source
        :src="formattedSrc"
        :type="videoType"
        @error="makeBrokenHandler"
      />

      Your browser does not support the video.
    </video>
  </div>
</template>

<script setup>
import MediaLoader from "./MediaLoader.vue";
import VideoError from "../errors/VideoError.vue";
import { getVideoTypeFromUrl } from "../../utils/strings";
import { useConversationOpenedStore, useTokenStore } from "../../stores";

import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

const conversationOpenedStore = useConversationOpenedStore();
const tokenStore = useTokenStore();

const videoRef = ref(null);

onMounted(() => {
  watch(
    [
      () => conversationOpenedStore.showMediaModal,
      () => conversationOpenedStore.messageOpenedId,
    ],
    ([newShowMediaModalValue, newMessageOpenedIdValue]) => {
      if (!newShowMediaModalValue || newMessageOpenedIdValue !== props.id) {
        videoRef.value.pause();
      }
    }
  );
});

const formattedSrc = computed(
  () => `${props.src}?t=Bearer ${tokenStore.accessToken}`
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

const loadedHandler = () => {
  isLoading.value = false;
};

const videoType = computed(() => getVideoTypeFromUrl(props.src));
</script>

<style scoped></style>
