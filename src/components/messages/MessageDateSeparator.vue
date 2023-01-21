<template>
  <div
    v-if="shown"
    class="flex flex-row items-center w-full my-1 text-center gap-x-3"
  >
    <hr class="bg-slate-400 inline-block h-[1px] w-full" />

    <div class="whitespace-nowrap">
      {{ formattedDate }}
    </div>

    <hr class="bg-slate-400 inline-block h-[1px] w-full" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useConversationOpenedStore, useDateStore } from "../../stores";

import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  date: {
    type: [Date, null],
    required: false,
    default: null,
  },
});

const conversationOpenedStore = useConversationOpenedStore();
const dateStore = useDateStore();

const shown = computed(() =>
  conversationOpenedStore.firstMessageOfDays.includes(props.id)
);

const dateFormat = computed(() =>
  props.date.getFullYear() === dateStore.now.getFullYear()
    ? "ddd, MMM D"
    : "MMM D, YYYY"
);

const formattedDate = useDateFormat(props.date, dateFormat);
</script>

<style scoped></style>
