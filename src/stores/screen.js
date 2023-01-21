import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useScreenStore = defineStore("screen", () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  onMounted(() => {
    window.addEventListener("resize", () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    });
  });

  const resetStore = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  return {
    width,
    height,
    resetStore,
  };
});
