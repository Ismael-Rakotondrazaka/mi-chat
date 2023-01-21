<template>
  <header class="md:sticky top-0 z-[3]">
    <div class="">
      <button
        @click="openNavbarHandler"
        class="block mx-3 mt-3 text-2xl border-2 border-transparent rounded-full md:hidden"
      >
        <fa-icon icon="bars" />

        <span class="inline-block ml-3 text-lg font-bold md:hidden">
          Menu
        </span>
      </button>
    </div>

    <nav
      class="fixed md:static top-0 left-0 right-0 md:right-[unset] bottom-0 w-full bg-primary shadow-sm z-[3] duration-200"
      :class="[navClass]"
    >
      <div class="flex flex-row justify-end w-full md:hidden">
        <button
          @click="closeNavbarHandler"
          class="mt-3 mr-5 text-2xl text-white"
        >
          <fa-icon icon="xmark" />

          <span class="sr-only">Close</span>
        </button>
      </div>

      <ul
        class="flex flex-row flex-wrap items-center justify-center w-full px-3 py-5 md:flex-nowrap gap-x-3 gap-y-5"
      >
        <li
          v-for="(link, index) in links"
          :key="index"
          class="w-full text-center md:w-fit"
        >
          <router-link
            :to="link.to"
            class="block px-5 py-3 text-xl text-white border-2 border-transparent rounded-full md:py-2 md:inline hover:border-white"
            :class="{
              '!border-border-primary !bg-white !text-border-primary shadow-button-primary':
                link.isActive,
            }"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useScreenStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const screenStore = useScreenStore();

const links = computed(() => [
  {
    text: "Home",
    to: {
      name: "home",
    },
    isActive: route.name === "home",
  },
  {
    text: "Login",
    to: {
      name: "login",
    },
    isActive: route.name === "login",
  },
  {
    text: "Register",
    to: {
      name: "register",
    },
    isActive: route.name === "register",
  },
  {
    text: "About",
    to: {
      name: "about",
    },
    isActive: route.name === "about",
  },
]);

const isSlide = ref(false);

watch(
  () => screenStore.width < 768,
  (newValue) => {
    isSlide.value = newValue;
  },
  {
    immediate: true,
  }
);

const showNavbar = ref(false);
const openNavbarHandler = () => {
  showNavbar.value = true;
};
const closeNavbarHandler = () => {
  showNavbar.value = false;
};

const navClass = computed(() => {
  let result = "";

  if (isSlide.value) {
    if (showNavbar.value) {
      result = "translate-x-0";
    } else {
      result = "translate-x-[-100%]";
    }
  }

  return result;
});

watch(
  () => route.name,
  () => {
    if (isSlide.value) {
      showNavbar.value = false;
    }
  }
);
</script>

<style scoped></style>
