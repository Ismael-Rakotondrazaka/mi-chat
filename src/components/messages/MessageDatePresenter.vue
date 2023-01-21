<template>
  <p
    v-if="shown"
    class="md:text-xs text-[0.6rem] text-gray-500 whitespace-pre-wrap mt-1"
  >
    {{ formatted }}
  </p>
</template>

<script setup>
import { useConversationOpenedStore } from "../../stores";
import { computed } from "vue";
import { useDateFormat, useTimeAgo } from "@vueuse/core";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const conversationOpenedStore = useConversationOpenedStore();

const shown = computed(
  () =>
    conversationOpenedStore.messageOpenedId === props.id ||
    conversationOpenedStore.conversation?.latestMessage?.id === props.id
);

const formatted = computed(() => {
  let result = useDateFormat(props.date, "HH:mm").value;

  if (conversationOpenedStore.conversation?.latestMessage?.id === props.id) {
    result = `${result} • ${useTimeAgo(props.date).value}`;
  }

  return result;
});
</script>

<style scoped></style>
