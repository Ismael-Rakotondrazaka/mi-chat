import { watch } from "vue";

const useReset = (source, cbs = [], emit) => {
  const resetHandler = (newValue) => {
    if (newValue) {
      cbs.forEach((cb) => cb());
      emit("resettled");
    }
  };

  watch(source, resetHandler);
};

export { useReset };
