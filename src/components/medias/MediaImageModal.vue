<template>
  <figure
    class="flex flex-col items-center justify-center swiper-zoom-container"
  >
    <MediaLoader v-if="isLoading" class="w-52 h-52" />

    <div v-if="isBroken" @click="reloadHandler">
      <ImageError />
    </div>

    <img
      v-else
      :src="formattedSrc"
      @error="makeBrokenHandler"
      @load="loadedHandler"
      alt=""
      class="shrink-0 max-h-screen max-w-[100vw]"
    />
  </figure>
</template>

<script setup>
import MediaLoader from "./MediaLoader.vue";
import ImageError from "../errors/ImageError.vue";
import { useTokenStore } from "../../stores";

import { ref, computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
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
    isLoading.value = true;
    isBroken.value = false;
  }
};
const loadedHandler = () => {
  isLoading.value = false;
};
</script>

<style scoped></style>
