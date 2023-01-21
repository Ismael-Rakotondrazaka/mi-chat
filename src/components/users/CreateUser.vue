<template>
  <div>
    <FatalErrorPresenter :error="fatalError" class="mb-7" />

    <form @submit.prevent="createUserHandler" method="POST">
      <div
        class="flex flex-row flex-wrap md:flex-nowrap items-start justify-between gap-[2px]"
      >
        <FirstNameInput
          @firstName:valid="validFirstNameHandler"
          @firstName:invalid="invalidFirstNameHandler"
          :reset="reset"
          @resettled="resettled"
          class="w-full md:!w-1/2"
        />

        <LastNameInput
          @lastName:valid="validLastNameHandler"
          @lastName:invalid="invalidLastNameHandler"
          :reset="reset"
          @resettled="resettled"
          class="w-full md:!w-1/2"
        />
      </div>

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
      />

      <PasswordValidationInput
        @passwordValidation:valid="validPasswordValidationHandler"
        @passwordValidation:invalid="invalidPasswordValidationHandler"
        @password:visible="visiblePasswordHandler"
        @password:invisible="invisiblePasswordHandler"
        label="Confirm password"
        placeholder="retype the password"
        :reference="rawPassword"
        :showPassword="showPassword"
        :reset="reset"
        @resettled="resettled"
        class="!mb-12"
      />

      <ButtonUI
        :isProcessing="createUserProcessing"
        :hasError="hasError"
        type="submit"
        class="inline-block w-full text-center"
      >
        Register
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
import FirstNameInput from "./FirstNameInput.vue";
import LastNameInput from "./LastNameInput.vue";
import PasswordValidationInput from "./PasswordValidationInput.vue";

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

const errors = ref({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordValidation: null,
});

const hasError = computed(() =>
  Object.values(errors.value).some((errorName) => !!errorName)
);

const firstName = ref("");
const validFirstNameHandler = (newValue) => {
  errors.value.firstName = null;
  firstName.value = newValue;
};
const invalidFirstNameHandler = (errorMessage) => {
  errors.value.firstName = errorMessage;
};

const lastName = ref("");
const validLastNameHandler = (newValue) => {
  errors.value.lastName = null;
  lastName.value = newValue;
};
const invalidLastNameHandler = (errorMessage) => {
  errors.value.lastName = errorMessage;
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
// the password in his valid and invalid state
const rawPassword = ref("");
const validPasswordHandler = (newValue) => {
  errors.value.password = null;
  password.value = newValue;
  rawPassword.value = newValue;
};
const invalidPasswordHandler = (errorMessage, invalidPassword) => {
  errors.value.password = errorMessage;
  rawPassword.value = invalidPassword;
};
const showPassword = ref(false);
const visiblePasswordHandler = () => {
  showPassword.value = true;
};
const invisiblePasswordHandler = () => {
  showPassword.value = false;
};

const passwordValidation = ref("");
const validPasswordValidationHandler = (newValue) => {
  errors.value.passwordValidation = null;
  passwordValidation.value = newValue;
};
const invalidPasswordValidationHandler = (errorMessage) => {
  errors.value.passwordValidation = errorMessage;
};

const createUserProcessing = ref(false);

const resetData = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  passwordValidation.value = "";
  rawPassword.value = "";
  reset.value = true;
};

const fatalError = ref(null);

const createUserHandler = async () => {
  if (!createUserProcessing.value && !hasError.value) {
    try {
      fatalError.value = null;
      createUserProcessing.value = true;

      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        passwordValidation: passwordValidation.value,
      };

      await sessionStore.register({
        data: data,
      });

      resetData();

      createUserProcessing.value = false;

      router.push({
        name: "conversation-list",
      });
    } catch (error) {
      fatalError.value = error;
      createUserProcessing.value = false;
    }
  }
};

watch([email, password], () => {
  fatalError.value = null;
});
</script>

<style scoped></style>
