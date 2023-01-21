<template>
  <vDropdown
    :triggers="[]"
    :shown="shown"
    :autoHide="false"
    :positioning-disabled="true"
  >
    <template #popper>
      <Teleport to="body" :disabled="!shown">
        <div class="fixed inset-0 overflow-y-auto bg-slate-700/95 z-[4]">
          <div
            class="flex flex-col items-center justify-end w-full h-full sm:justify-center"
          >
            <div
              class="w-full max-w-md bg-white border-2 rounded-md border-border shadow-button"
              :class="[borderClass]"
            >
              <div
                class="flex flex-row items-center justify-between px-3 py-2 text-lg font-bold text-white border-b-2 rounded-t-md"
                :class="[bg, borderClass]"
              >
                <p class="font-bold">{{ title }}</p>

                <button
                  @click.stop="close"
                  class="text-2xl text-white hover:cursor-pointer"
                >
                  <fa-icon icon="xmark" />
                </button>
              </div>

              <div class="w-full">
                <slot />

                <div
                  class="flex flex-row items-center justify-end w-full p-3 mt-2 sm: gap-x-5"
                >
                  <ButtonUI
                    v-if="rejectButtonValue"
                    @click="reject"
                    status="disabled"
                    class="w-1/3, capitalize sm:w-fit"
                    variant="outlined"
                  >
                    {{ rejectButtonValue }}
                  </ButtonUI>

                  <ButtonUI
                    v-if="resolveButtonValue"
                    @click="resolve"
                    :status="status"
                    :isProcessing="isProcessing"
                    :hasError="hasError"
                    class="w-1/3, capitalize sm:w-fit"
                  >
                    {{ resolveButtonValue }}
                  </ButtonUI>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </template>
  </vDropdown>
</template>

<script setup>
import ButtonUI from "@/components/ui/ButtonUI.vue";

import { computed } from "vue";

const statusColors = {
  danger: {
    bg: "bg-danger",
    border: "border-border-danger shadow-border-danger",
    bgHover: "hover:bg-red-500",
    ring: "focus:ring-red-200",
  },
  info: {
    bg: "bg-info",
    border: "border-border-info shadow-border-info",
    bgHover: "hover:bg-sky-500",
    ring: "focus:ring-sky-200",
  },
  warning: {
    bg: "bg-yellow-300",
    bgHover: "hover:bg-yellow-400",
    ring: "focus:ring-yellow-100",
  },
  success: {
    bg: "bg-emerald-400",
    bgHover: "hover:bg-emerald-500",
    ring: "focus:ring-emerald-200",
  },
  neutral: {
    bg: "bg-neutral-200",
    bgHover: "hover:bg-neutral-300",
    ring: "focus:ring-neutral-50",
  },
};

const props = defineProps({
  shown: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "info",
  },
  rejectButtonValue: {
    type: String,
    default: null,
  },
  resolveButtonValue: {
    type: String,
    default: null,
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closed", "rejected", "resolved"]);

const bg = computed(() => {
  return statusColors[props.status].bg;
});

const borderClass = computed(() => {
  return statusColors[props.status].border;
});

const close = () => {
  emit("closed");
};

const reject = () => {
  emit("rejected");
};

const resolve = () => {
  if (!props.isProcessing) {
    emit("resolved");
  }
};
</script>

<style></style>
