<template>
  <Teleport to="body">
    <div v-show="shown" class="fixed inset-0 bg-slate-700/95 z-[4]">
      <Swiper
        :modules="modules"
        :pagination="{
          type: 'fraction',
        }"
        :keyboard="{
          enabled: true,
          onlyInViewport: false,
        }"
        :virtual="true"
        :zoom="true"
        navigation
        :mousewheel="true"
        @swiper="onSwiperHandler"
      >
        <SwiperSlide v-for="media in medias" :key="media.id" class="h-[100vh]">
          <component
            :is="getMediaComponent(media)"
            :id="media.id"
            :src="media.content"
            class="max-h-full h-full swiper-zoom-container,"
          />
        </SwiperSlide>
      </Swiper>

      <CloseModalButton
        @click="closeModalHandler"
        class="fixed top-0 right-0"
      />
    </div>
  </Teleport>
</template>

<script setup>
import CloseModalButton from "../commons/CloseModalButton.vue";
import MediaImageModal from "./MediaImageModal.vue";
import MediaVideoModal from "./MediaVideoModal.vue";

import {
  Navigation,
  Pagination,
  Keyboard,
  Mousewheel,
  Virtual,
  Zoom,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/virtual";
import "swiper/css/zoom";

import { useConversationOpenedStore } from "../../stores";

const conversationOpenedStore = useConversationOpenedStore();

defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
  medias: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const modules = [Navigation, Pagination, Keyboard, Mousewheel, Virtual, Zoom];

const emit = defineEmits(["closed"]);

const onSwiperHandler = (swiper) => {
  conversationOpenedStore.mediaSwiper = swiper;
};

const closeModalHandler = () => {
  emit("closed");
};

const getMediaComponent = (media) => {
  const mediaTypeComponent = {
    image: MediaImageModal,
    video: MediaVideoModal,
  };

  return mediaTypeComponent[media.type];
};
</script>

<style scoped></style>
