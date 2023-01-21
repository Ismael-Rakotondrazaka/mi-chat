<template>
  <masonry-wall :items="medias" :column-width="columnWidth" :gap="gap">
    <template #default="{ item }">
      <component
        :key="item.id"
        :is="checkMediaComponent(item)"
        :id="item.id"
        :conversationId="item.conversationId"
        :type="item.type"
        :content="item.content"
        :createdAt="item.createdAt"
        :sender="item.sender"
      />
    </template>
  </masonry-wall>
</template>

<script setup>
import MediaImage from "./MediaImage.vue";
import MediaVideo from "./MediaVideo.vue";
import MediaFile from "./MediaFile.vue";
import { useScreenStore } from "../../stores";

import { ref, computed } from "vue";

defineProps({
  medias: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const screenStore = useScreenStore();

const checkMediaComponent = (media) => {
  const typeComponent = {
    image: MediaImage,
    video: MediaVideo,
    file: MediaFile,
  };

  return typeComponent[media.type];
};

let screenOptions = ref([
  {
    min: 0,
    max: 767,
    width: 100,
    gap: 7,
  },
  {
    min: 768,
    max: 1023,
    width: 150,
    gap: 10,
  },
  {
    min: 1024,
    max: Infinity,
    width: 250,
    gap: 15,
  },
]);

const options = computed(() => {
  let result = {
    columnWidth: 200,
    gap: 10,
  };

  for (const item of screenOptions.value) {
    if (screenStore.width >= item.min && screenStore.width <= item.max) {
      result = {
        columnWidth: item.width,
        gap: item.gap,
      };
      break;
    }
  }

  return result;
});

const columnWidth = computed(() => options.value.columnWidth);

const gap = computed(() => options.value.gap);
</script>

<style scoped>
.masonry-item {
  width: 200px;
}
</style>
