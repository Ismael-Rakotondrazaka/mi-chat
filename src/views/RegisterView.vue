<template>
  <CustomLayout :isLoading="false">
    <template #loading>
      <RegisterViewLoader />
    </template>

    <template #default>
      <div
        class="flex flex-col items-center w-full p-3 bg-bottom bg-repeat-x min-h-screen"
        :style="{
          'background-image':
            'url(\'/images/illustrations/waves-2-primary.svg\')',
        }"
      >
        <div class="mt-3 mb-3 md:mb-5 lg:mb-10">
          <HeaderText>Register</HeaderText>
        </div>

        <CreateUser class="w-full max-w-xl" />

        <TheFooter class="w-full max-w-xl mt-24" />
      </div>
    </template>
  </CustomLayout>
</template>

<script setup>
import CustomLayout from "../components/commons/CustomLayout.vue";
import HeaderText from "../components/commons/HeaderText.vue";
import TheFooter from "../components/footers/TheFooter.vue";
import RegisterViewLoader from "../components/loaders/RegisterViewLoader.vue";
import CreateUser from "../components/users/CreateUser.vue";
import { useMetaStore } from "../stores";

import { watch } from "vue";
import { useRoute } from "vue-router";

const metaStore = useMetaStore();
const route = useRoute();

watch(
  () => route.name === "register",
  (newValue) => {
    if (newValue) {
      metaStore.title = "mi-chat | Register";
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped></style>
