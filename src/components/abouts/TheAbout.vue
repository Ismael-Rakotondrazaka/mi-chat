<template>
  <div class="container pt-4">
    <HeaderText class="text-center !text-4xl">About</HeaderText>

    <h1 class="text-4xl">Why mi-chat has been created?</h1>

    <p>
      We want to create a platform where <strong>security</strong> is the main
      Word.
    </p>
    <p>
      Are you tired of receiving messages with inappropriate content from an
      unknown person? We are.
      <br />
      That's why with mi-chat an user can not send you a message unless you are
      friends.
    </p>

    <h1 class="text-4xl">Fun facts</h1>

    <ul>
      <li>
        <h3 class="text-3xl">The Logo</h3>

        <p class="w-full">
          The cat in the logo is called
          <strong>Boo</strong>, like the childhood nickname of the creator of
          mi-chat.
        </p>

        <figure class="flex flex-col items-center m-auto mb-3">
          <img
            v-tooltip="{
              content: 'Yes, my name is Boo 😸',
              distance: 10,
              position: 'top',
            }"
            src="../../assets/images/logos/logo-smile-solid-primary.svg"
            alt=""
            class="w-full max-w-[10rem]"
          />

          <caption>
            <p class="w-full italic text-center">Logo of mi-chat</p>
          </caption>
        </figure>
      </li>

      <li>
        <h3 class="text-3xl">mi-chat</h3>

        <p>
          mi-chat is composed of two words: <strong>mi</strong> and
          <strong>chat</strong>.
          <br />
          The prefix <strong>mi</strong> is from the malagasy grammar rules. It
          is used when an action is happening, like
          <i><strong>mi</strong>jery</i> (watching), or
          <i><strong>mi</strong>teny</i> (speaking).
          <br />
          So, mi-chat is the same as chatting.
        </p>
      </li>
    </ul>

    <RouterLink
      :to="{
        name: 'home',
      }"
      class="inline-block px-5 py-3 my-5 text-black transition-all duration-200 border-2 rounded-md shadow-button-primary border-border-primary bg-primary"
    >
      More about mi-chat
    </RouterLink>
  </div>
</template>

<script setup>
import HeaderText from "../commons/HeaderText.vue";
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: rgb(var(--color-border-primary));
  font-weight: 700;
}

strong {
  color: rgb(var(--color-border-primary));
}

h1 {
  font-size: 40px;
  line-height: 60px;
}
h2 {
  font-size: 32px;
  line-height: 48px;
}
h3 {
  font-size: 24px;
  line-height: 36px;
}

h1,
h2,
h3,
h4,
h5,
h6,
li,
p {
  margin: 0 0 16px;
}

.container {
  width: 90%;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
