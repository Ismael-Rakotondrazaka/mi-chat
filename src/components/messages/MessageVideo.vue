<template>
  <div
    class="relative w-[8rem] h-[8rem] xl:h-40 xl:w-40 rounded-md block border border-border bg-emerald-100 shadow-button hover:shadow-button-primary hover:border-border-primary"
  >
    <MessageLoader v-if="isLoading" class="absolute inset-0" />

    <button v-if="isBroken" @click="reloadHandler" class="h-full">
      <VideoError class="rounded-md" />
    </button>

    <video
      v-else
      @click="onClickHandler"
      @loadedmetadata="loadedHandler"
      @ended="endedHandler"
      preload="metadata"
      ref="videoRef"
      class="object-cover w-full h-full rounded-md"
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
import MessageLoader from "./MessageLoader.vue";
import VideoError from "../errors/VideoError.vue";
import { getVideoTypeFromUrl } from "../../utils/strings";
import { useTokenStore } from "../../stores";

import { ref, computed, watch } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  pause: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const tokenStore = useTokenStore();

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
    isBroken.value = false;
  }
};

const isPlaying = ref(false);

const emit = defineEmits(["video:played", "video:paused"]);

const videoRef = ref(null);

const playVideo = () => {
  if (videoRef.value) {
    videoRef.value.play();
    emit("video:played");
    isPlaying.value = true;
  }
};

const pauseVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause();
    emit("video:paused");
    isPlaying.value = false;
  }
};

const endedHandler = () => {
  pauseVideo();
};

const onClickHandler = () => {
  if (isPlaying.value) {
    pauseVideo();
  } else {
    playVideo();
  }
};

const loadedHandler = () => {
  isLoading.value = false;
};

watch(
  () => props.pause,
  (newValue) => {
    if (newValue) {
      pauseVideo();
    }
  }
);

const videoType = computed(() => getVideoTypeFromUrl(props.src));
</script>

<style scoped></style>
