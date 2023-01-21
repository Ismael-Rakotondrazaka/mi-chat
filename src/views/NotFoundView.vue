<template>
  <div
    class="bg-bottom bg-repeat-x min-h-screen p-3 flex flex-col items-center"
    :style="{
      'background-image':
        'url(\'/src/assets/images/illustrations/waves-2-primary.svg\')',
    }"
  >
    <div class="min-h-screen w-full flex flex-col items-center justify-center">
      <Transition name="bounce">
        <img
          v-tooltip="{
            content: '404 Not Found 😿.',
            distance: 10,
            position: 'top',
          }"
          src="../assets/images/logos/boo-sad-danger.png"
          alt=""
          class="w-full max-w-[15rem] mx-auto mb-5"
        />
      </Transition>
      <p class="text-border-danger font-bold text-3xl">
        The page is not found.
      </p>
      <p class="text-border-danger font-bold">
        Maybe the page doesn't exist or you don't have the right permission to
        access it.
      </p>

      <ButtonUI @click="goBackHandler" status="primary" class="mt-10">
        Go back
      </ButtonUI>
    </div>

    <TheFooter class="w-full max-w-md mt-24" />
  </div>
</template>

<script setup>
import TheFooter from "../components/footers/TheFooter.vue";
import ButtonUI from "@/components/ui/ButtonUI.vue";
import { useRouteStore, useMetaStore } from "../stores";

import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routeStore = useRouteStore();
const metaStore = useMetaStore();

const goBackHandler = () => {
  router.back();
};

watch(
  () => routeStore.isNotFound,
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Not found";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
