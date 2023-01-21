<template>
  <vDropdown
    :triggers="[]"
    :shown="shown"
    :autoHide="false"
    :positioning-disabled="true"
  >
    <template #popper>
      <Teleport to="body" :disabled="!shown">
        <div class="fixed inset-0 bg-slate-700/95 z-[4]">
          <div class="h-full w-full flex flex-col items-center justify-center">
            <button v-if="isBroken" @click="reloadHandler" class="w-52 h-52">
              <VideoError
                class="w-full h-full flex flex-col items-center justify-center rounded-md"
              />
            </button>

            <video
              v-else
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

          <CloseModalButton
            @click="closeModalHandler"
            class="fixed top-0 right-0"
          />
        </div>
      </Teleport>
    </template>
  </vDropdown>
</template>

<script setup>
import CloseModalButton from "./CloseModalButton.vue";
import VideoError from "../errors/VideoError.vue";
import { getVideoTypeFromUrl } from "../../utils/strings";
import { useTokenStore } from "../../stores";

import { ref, computed, watch } from "vue";

const props = defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
  src: {
    type: String,
    required: true,
  },
  pause: {
    type: Boolean,
    required: true,
    default: false,
  },
  needAuth: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const tokenStore = useTokenStore();

const formattedSrc = computed(() => {
  let result = props.src;

  if (props.needAuth) {
    result += `?t=Bearer ${tokenStore.accessToken}`;
  }

  return result;
});

const videoType = computed(() => getVideoTypeFromUrl(props.src));

const emit = defineEmits(["close", "video:paused"]);

const closeModalHandler = () => {
  emit("close");
};

const isBroken = ref(false);
const makeBrokenHandler = () => {
  isBroken.value = true;
};
const reloadHandler = () => {
  isBroken.value = false;
};

const videoRef = ref(null);

watch(
  () => props.pause,
  (newValue) => {
    if (newValue && videoRef.value) {
      videoRef.value.pause();
      emit("video:paused");
    }
  }
);
</script>

<style scoped></style>
