import { ref, watch } from "vue";

const useValidation = (
  source,
  cbs = [],
  emit,
  events = {
    valid: "valid",
    invalid: "invalid",
  }
) => {
  const error = ref(null);

  const validationHandler = (newValue) => {
    let result = true;

    for (let i = 0; i < cbs.length; i++) {
      const validOrErrorMessage = cbs[i](newValue);

      // get an error message
      if (validOrErrorMessage !== true) {
        result = validOrErrorMessage;
        break;
      }
    }

    if (result === true) {
      emit(events.valid, newValue);
      error.value = null;
    } else {
      emit(events.invalid, result, newValue); // we also pass the invalid as an argument after the errorMessage
      error.value = result;
    }
  };

  watch(source, validationHandler, {
    immediate: true,
  });

  return {
    error,
  };
};

export { useValidation };
