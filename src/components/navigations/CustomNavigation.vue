<template>
  <div class="flex flex-row items-center justify-between py-3 min-h-[3.5rem]">
    <div class="flex flex-row items-center justify-start gap-10 flex-nowrap">
      <button @click="openAuthNavbarHandler" class="block md:hidden">
        <span class="sr-only">Menu</span>

        <fa-icon icon="bars" class="text-2xl" />
      </button>

      <button
        @click="previousHandler"
        class="flex flex-row items-center text-slate-500"
      >
        <fa-icon
          icon="circle-chevron-left"
          class="inline-block mr-3 text-2xl"
        />

        <span class="sr-only">Previous</span>
      </button>
    </div>

    <button
      @click="nextHandler"
      class="flex flex-row items-center text-slate-500"
    >
      <span class="sr-only">Next</span>

      <fa-icon icon="circle-chevron-right" class="inline-block ml-3 text-2xl" />
    </button>
  </div>
</template>

<script setup>
import { useAuthNavbarStore } from "../../stores";

import { useRouter } from "vue-router";

const authNavbarStore = useAuthNavbarStore();
const router = useRouter();

const previousHandler = () => {
  router.back();
};

const nextHandler = () => {
  router.forward();
};

const openAuthNavbarHandler = () => {
  authNavbarStore.showAuthNavbar = true;
};
</script>

<style scoped></style>
