<template>
  <div class="px-3 pt-0 pb-2">
    <div class="w-full overflow-hidden">
      <div class="flex flex-col items-start justify-between">
        <p class="font-bold truncate md:text-sm text-slate-900">
          {{ sender.name.full }}
        </p>

        <p class="truncate md:text-sm">
          <span class="text-xs font-light text-gray-900">
            {{ formattedDate }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDateFormat } from "@vueuse/core";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return ["image", "video", "file"].includes(value);
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

const formattedDate = useDateFormat(props.createdAt, "MMM D, YYYY");
</script>

<style scoped></style>
