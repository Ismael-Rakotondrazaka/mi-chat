<template>
  <Teleport to="body">
    <div v-show="shown" class="fixed inset-0 bg-slate-700/95 z-[4]">
      <Swiper :modules="modules" :zoom="true" :centered-slides="true">
        <SwiperSlide class="h-[100vh]">
          <figure
            class="flex flex-col items-center justify-center swiper-zoom-container"
          >
            <button v-if="isBroken" @click="reloadHandler" class="w-52 h-52">
              <ImageError
                class="flex flex-col items-center justify-center w-full h-full rounded-md"
              />
            </button>

            <img
              v-else
              :src="formattedSrc"
              @error="makeBrokenHandler"
              alt=""
              class="shrink-0 max-h-screen max-w-[100vw]"
            />
          </figure>
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
import ImageError from "../errors/ImageError.vue";
import { useTokenStore } from "../../stores";

import { ref, computed } from "vue";
import { Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/zoom";

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

const modules = [Zoom];

const emit = defineEmits(["close"]);

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
</script>

<style scoped></style>
