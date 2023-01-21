<template>
  <div
    class="flex flex-row flex-wrap-reverse items-center min-h-screen px-3 py-10 md:px-28 justify-evenly gap-x-36 gap-y-10"
  >
    <MessageListIllustration class="w-full max-w-md" />

    <div class="w-full lg:w-1/3">
      <h3 class="mb-5 text-4xl font-bold text-border-primary">
        What is mi-chat?
      </h3>

      <p class="text-lg">
        <strong class="font-bold text-primary"> mi-chat </strong>
        is a free instant messaging web application.
        <br />
        You can have friends and chat with them.
      </p>
    </div>
  </div>

  <div
    class="flex flex-row flex-wrap items-center min-h-screen px-3 py-10 md:px-28 justify-evenly gap-x-36 gap-y-10"
  >
    <div class="w-full lg:w-1/3">
      <h3 class="mb-5 text-4xl font-bold text-border-primary">
        Why should I use <span class="whitespace-nowrap">mi-chat</span>?
      </h3>

      <p class="text-lg">
        It has many features that offer you a better experience.
        <br />
        Like sending photos, videos or files.
        <br />
        You can create group chat and add your friends. So, you can all discuss
        together.
        <br />
        And there are many others!
      </p>
    </div>

    <GroupIllustration class="w-full max-w-md" />
  </div>

  <div
    class="flex flex-col items-center justify-center min-h-screen px-3 py-10 md:px-28"
  >
    <div class="">
      <h3 class="mb-5 text-4xl font-bold text-border-primary">How it works?</h3>

      <p class="mb-5 text-lg">
        It's pretty simple.
        <br />
        Just create an account. Or you can log in if you already have one.
      </p>

      <RouterLink
        :to="{
          name: 'register',
        }"
        class="px-5 py-3 text-black transition-all duration-200 border-2 rounded-md shadow-button bg-primary border-border-primary hover:shadow-button-primary"
      >
        Let's get started
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import GroupIllustration from "./GroupIllustration.vue";
import MessageListIllustration from "./MessageListIllustration.vue";
</script>

<style scoped></style>
