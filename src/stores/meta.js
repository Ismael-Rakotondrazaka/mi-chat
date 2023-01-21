import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useMetaStore = defineStore("meta", () => {
  const defaultTitle = "mi-chat";

  const title = ref(defaultTitle);

  const resetStore = () => {
    title.value = defaultTitle;
  };

  watch(
    title,
    (newValue) => {
      document.title = newValue;
    },
    {
      immediate: true,
    }
  );

  return {
    title,
    resetStore,
  };
});
