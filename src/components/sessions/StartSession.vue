<template>
  <div>
    <FatalErrorPresenter :error="fatalError" class="mb-7" />

    <form @submit.prevent="startSessionHandler" method="POST">
      <EmailInput
        @email:valid="validEmailHandler"
        @email:invalid="invalidEmailHandler"
        @resettled="resettled"
        :reset="reset"
      />

      <PasswordInput
        @password:valid="validPasswordHandler"
        @password:invalid="invalidPasswordHandler"
        @password:visible="visiblePasswordHandler"
        @password:invisible="invisiblePasswordHandler"
        :showPassword="showPassword"
        :reset="reset"
        @resettled="resettled"
        class="!mb-12"
      />

      <ButtonUI
        :isProcessing="startSessionProcessing"
        :hasError="hasError"
        type="submit"
        class="inline-block w-full text-center"
      >
        <span> Login </span>
      </ButtonUI>
    </form>
  </div>
</template>

<script setup>
import EmailInput from "../sessions/EmailInput.vue";
import PasswordInput from "../sessions/PasswordInput.vue";
import ButtonUI from "../ui/ButtonUI.vue";
import FatalErrorPresenter from "../errors/FatalErrorPresenter.vue";
import { useSessionStore } from "../../stores";

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

defineProps({
  reset: {
    type: Boolean,
    required: false,
  },
});

const sessionStore = useSessionStore();
const router = useRouter();

const reset = ref(false);
const resettled = () => {
  reset.value = false;
};

const email = ref("");
const validEmailHandler = (newValue) => {
  errors.value.email = null;
  email.value = newValue;
};
const invalidEmailHandler = (errorMessage) => {
  errors.value.email = errorMessage;
};

const password = ref("");
const validPasswordHandler = (newValue) => {
  errors.value.password = null;
  password.value = newValue;
};
const invalidPasswordHandler = (errorMessage) => {
  errors.value.password = errorMessage;
};
const showPassword = ref(false);
const visiblePasswordHandler = () => {
  showPassword.value = true;
};
const invisiblePasswordHandler = () => {
  showPassword.value = false;
};

const startSessionProcessing = ref(false);

const errors = ref({
  email: null,
  password: null,
});

const resetData = () => {
  email.value = "";
  password.value = "";
  reset.value = true;
};

const hasError = computed(() =>
  Object.values(errors.value).some((errorName) => !!errorName)
);

const fatalError = ref(null);

const startSessionHandler = async () => {
  if (!startSessionProcessing.value && !hasError.value) {
    try {
      fatalError.value = null;
      startSessionProcessing.value = true;

      const data = {
        email: email.value,
        password: password.value,
      };

      await sessionStore.startSession({
        data: data,
      });

      resetData();

      startSessionProcessing.value = false;

      router.push({
        name: "conversation-list",
      });
    } catch (error) {
      fatalError.value = error;
      startSessionProcessing.value = false;
    }
  }
};

watch([email, password], () => {
  fatalError.value = null;
});
</script>

<style scoped></style>
