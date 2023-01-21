<template>
  <div>
    <CustomModal @closed="closeModalHandler" class="" :shown="shown">
      <div class="flex flex-col items-center justify-center w-full h-full">
        <figure class="max-h-full m-20">
          <div
            v-if="isBroken"
            @click.stop
            @mouseover="reloadHandler"
            class="p-2 text-sm border rounded-md w-52 h-52"
          >
            <ImageError />
          </div>

          <img
            v-else
            @click.stop
            :src="src"
            alt=""
            class="shrink-0 max-h-screen max-w-[100vw]"
            @error="makeBrokenHandler"
          />
        </figure>
      </div>
    </CustomModal>
  </div>
</template>

<script setup>
import CustomModal from "../commons/CustomModal.vue";
import ImageError from "../errors/ImageError.vue";

import { ref } from "vue";

defineProps({
  shown: {
    type: Boolean,
    required: false,
    default: false,
  },
  src: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const isBroken = ref(false);

const makeBrokenHandler = () => {
  isBroken.value = true;
};

const reloadHandler = () => {
  if (!isBroken.value) {
    isBroken.value = false;
  }
};

const closeModalHandler = () => {
  emit("close");
};
</script>

<style scoped></style>
