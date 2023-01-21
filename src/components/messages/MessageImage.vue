<template>
  <div
    class="relative w-[8rem] h-[8rem] xl:h-40 xl:w-40 rounded-md block border border-border bg-emerald-100 shadow-button hover:shadow-button-primary hover:border-border-primary"
  >
    <MessageLoader v-if="isLoading" class="absolute inset-0 message-image" />

    <button v-if="isBroken" @click="reloadHandler" class="h-full">
      <ImageError class="rounded-md" />
    </button>

    <img
      v-else
      :src="formattedSrc"
      alt=""
      @error="makeBrokenHandler"
      @load="loadedHandler"
      class="object-cover w-full h-full rounded-md"
    />
  </div>
</template>

<script setup>
import MessageLoader from "./MessageLoader.vue";
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

const loadedHandler = () => {
  isLoading.value = false;
};

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
</script>

<style scoped></style>
