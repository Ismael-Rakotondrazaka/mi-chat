<template>
  <div class="py-3">
    <div v-for="(message, index) in messages" :key="index" class="mb-3">
      <div
        v-if="message.type === 'sent'"
        class="flex flex-row justify-end w-full"
      >
        <div :class="[message.class]">
          <puSkeleton
            :loading="true"
            class="block w-full h-full border rounded-md border-border shadow-button message-sent-loader"
          />
        </div>
      </div>
      <div
        v-else-if="message.type === 'received'"
        class="flex flex-row justify-start w-full"
      >
        <div :class="[message.class]">
          <puSkeleton
            :loading="true"
            class="block w-full h-full border rounded-md border-border shadow-button message-sent-loader"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  {
    type: "received",
    class: "w-20 h-10",
  },
  {
    type: "sent",
    class: "w-32 h-10",
  },
  {
    type: "received",
    class: "w-40 h-10",
  },
  {
    type: "received",
    class: "w-36 h-10",
  },
  {
    type: "sent",
    class: "w-16 h-10",
  },
  {
    type: "sent",
    class: "w-20 h-20",
  },
  {
    type: "received",
    class: "w-24 h-10",
  },
];
</script>

<style>
.message-sent-loader > .pu-skeleton {
  border-radius: 0.375rem 0 0.375rem 0.375rem;
}
</style>
