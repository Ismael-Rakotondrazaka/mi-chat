<template>
  <div class="relative, shrink-0 flex flex-row items-end">
    <img
      v-if="!isBroken && formattedSrc"
      :src="formattedSrc"
      alt=""
      class="object-cover rounded-full bg-emerald-50 ring-border-primary after:bg-white"
      :class="[mainClass, ringClass]"
      @error="errorHandler"
    />

    <div
      v-else-if="type === 'personal'"
      class="rounded-full"
      :class="mainClass"
    >
      <fa-icon
        icon="user-circle"
        class="object-cover text-white rounded-full bg-slate-300 ring-border-primary"
        :class="[mainClass, ringClass]"
      />
    </div>

    <div v-else-if="type === 'group'" class="rounded-full" :class="mainClass">
      <fa-icon
        icon="users"
        class="object-cover overflow-hidden text-gray-300 bg-white rounded-full ring-border-primary"
        :class="[mainClass, ringClass]"
      />
    </div>

    <div
      v-if="type === 'personal' && size !== 'xs'"
      class="absolute, bottom-0 rounded-full -right-0 ring-2 ring-white"
      :class="[activeSizeClass, activeBgClass]"
    ></div>
  </div>
</template>

<script setup>
import { useUserConnectedStore, useTokenStore } from "../../stores";

import { ref, computed, onMounted, watch } from "vue";

const userConnectedStore = useUserConnectedStore();
const tokenStore = useTokenStore();

const isBroken = ref(false);

const imageSizes = {
  md: "w-36 h-36 max-w-[9rem] max-h-[9rem]",
  sm: "w-10 h-10 max-w-[2.5rem] max-h-[2.5rem]",
  xs: "w-5 h-5 max-w-[1.25rem] max-h-[1.25rem]",
};
const activeSizes = {
  md: "w-6 h-6 -ml-9",
  sm: "w-3 h-3 -ml-3",
  xs: "w-2 h-2 -ml-3",
};
const rings = {
  md: "ring-2",
  sm: "ring-2",
  xs: "ring-1",
};

const props = defineProps({
  src: {
    type: [String, null],
    required: false,
    default: null,
  },
  size: {
    type: String,
    required: true,
    validator: (value) => {
      return ["md", "sm", "xs"].includes(value);
    },
  },
  type: {
    type: String,
    default: "personal",
    required: false,
    validator: (value) => {
      return ["personal", "group"].includes(value);
    },
  },
  userId: {
    type: Number,
    required: false,
    default: 0,
  },
});

watch(
  () => props.src,
  () => {
    isBroken.value = false;
  }
);

const mainClass = computed(() => {
  return imageSizes[props.size];
});

const activeSizeClass = computed(() => {
  return activeSizes[props.size];
});

const ringClass = computed(() => {
  return rings[props.size];
});

const activeBgClass = computed(() => {
  return userConnectedStore.isConnected(props.userId)
    ? "bg-green-400"
    : "bg-slate-400";
});

const errorHandler = () => {
  isBroken.value = true;
};

const formattedSrc = computed(() => {
  let result = props.src;

  if (props.src && props.type === "group") {
    result = `${props.src}?t=Bearer ${tokenStore.accessToken}`;
  }

  return result;
});

onMounted(() => {
  if (!props.src) {
    isBroken.value = true;
  }
});
</script>

<style scoped></style>
