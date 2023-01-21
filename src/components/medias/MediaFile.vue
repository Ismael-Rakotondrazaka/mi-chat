<template>
  <div
    class="w-full border-2 border-border rounded-md bg-white pt-[0.35rem] md:pt-5 shadow-button hover:shadow-button-primary hover:border-border-primary group hover:bg-primary"
  >
    <a
      :href="formattedSrc"
      target="_blank"
      class="flex flex-col items-center justify-center w-full border-y-2 border-border group-hover:border-border-primary bg-emerald-100"
      :class="[fileClass]"
    >
      <div class="object-cover max-h-96 p-2 h-[8rem] xl:h-40 xl:w-40">
        <div class="w-full h-full">
          <fa-icon
            icon="file"
            class="block w-full h-full text-3xl text-sky-400"
          />

          <span class="sr-only">File</span>
        </div>
      </div>
      <p class="text-xs truncate">{{ filename }}</p>
    </a>

    <MediaInfoPresenter
      :id="id"
      :conversationId="conversationId"
      :type="type"
      :content="content"
      :createdAt="createdAt"
      :sender="sender"
      class="invisible md:visible h-[0.35rem] md:h-auto"
    />
  </div>
</template>

<script setup>
import MediaInfoPresenter from "./MediaInfoPresenter.vue";
import { getFilenameFromUrl } from "../../utils/strings";
import { useConversationOpenedStore, useTokenStore } from "../../stores";

import { computed } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return value === "file";
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

const fileClass = computed(() =>
  conversationOpenedStore.isMasonryLayout
    ? ""
    : "h-[150px] lg:h-[200px] xl:h-[250px]"
);

const filename = computed(() => getFilenameFromUrl(props.content));
</script>

<style scoped></style>
