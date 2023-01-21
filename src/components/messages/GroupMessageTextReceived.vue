<template>
  <div class="flex flex-col">
    <MessageDateSeparator :id="id" :date="createdAt" />

    <div class="flex flex-row items-start self-start max-w-xl gap-2 mr-7">
      <AvatarUI :src="sender.imageUrl" :size="'xs'" class="mt-[2px]" />

      <div>
        <h2
          class="text-xs md:text-base font-semibold"
          :class="sender.participation ? 'text-emerald-700' : 'text-slate-500'"
        >
          {{ sender.participation?.nickname || sender.name.first }}
        </h2>

        <div class="flex flex-row items-start w-fit gap-x-1">
          <button @click="openMessageHandler" class="text-left">
            <MessageReceivedUI>
              {{ content }}
            </MessageReceivedUI>
          </button>

          <div
            v-if="conversationOpenedStore.messageOpenedId === id"
            class="shrink-0"
          >
            <vMenu
              :distance="10"
              :triggers="['focus', 'hover']"
              placement="right"
            >
              <template #default>
                <MessageOptionButton />
              </template>

              <template #popper>
                <div class="p-1">
                  <ul class="flex flex-row items-center justify-center">
                    <li>
                      <DeleteMessageButton @click="openDeleteMessageHandler" />
                    </li>
                  </ul>
                </div>
              </template>
            </vMenu>
          </div>
        </div>

        <MessageDatePresenter :id="id" :date="createdAt" />
      </div>
    </div>

    <DeleteMessage
      @close="closeDeleteMessage"
      :id="id"
      :conversationId="conversationId"
      :shown="showDeleteMessage"
    />
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import MessageReceivedUI from "../ui/MessageReceivedUI.vue";
import DeleteMessage from "./DeleteMessage.vue";
import DeleteMessageButton from "./DeleteMessageButton.vue";
import MessageDateSeparator from "./MessageDateSeparator.vue";
import MessageOptionButton from "./MessageOptionButton.vue";
import { useConversationOpenedStore } from "../../stores";

import { ref } from "vue";
import MessageDatePresenter from "./MessageDatePresenter.vue";

const conversationOpenedStore = useConversationOpenedStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => {
      return value === "text";
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

const openMessageHandler = () => {
  conversationOpenedStore.toggleMessage(props.id);
};

const showDeleteMessage = ref(false);
const openDeleteMessageHandler = () => {
  showDeleteMessage.value = true;
};
const closeDeleteMessage = () => {
  showDeleteMessage.value = false;
};
</script>

<style scoped></style>
