import { watch } from "vue";

const useDefaultReset = (defaultValue, cbs = []) => {
  const resetDefaultHandler = (newValue) => cbs.forEach((cb) => cb(newValue));

  watch(defaultValue, resetDefaultHandler, {
    immediate: true,
  });
};

export { useDefaultReset };
