import { useScreenStore } from "./screen";

import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthNavbarStore = defineStore("authNavbar", () => {
  const screenStore = useScreenStore();

  const isSlide = ref(false);

  const showAuthNavbar = ref(false);

  const resetStore = () => {
    isSlide.value = false;
    showAuthNavbar.value = false;
  };

  watch(
    () => screenStore.width < 768,
    (newValue) => {
      isSlide.value = newValue;
    },
    {
      immediate: true,
    }
  );

  return {
    isSlide,
    showAuthNavbar,
    resetStore,
  };
});
