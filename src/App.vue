<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink
        :to="{
          name: 'profile-item',
          params: {
            userId: 2,
          },
        }"
      >
        profile-item
      </RouterLink>
      <RouterLink
        :to="{
          name: 'friend-list',
          params: {
            userId: 3,
          },
        }"
      >
        friend-list
      </RouterLink>
      <RouterLink
        :to="{
          name: 'friendrequest-list',
        }"
      >
        friendrequest-list
      </RouterLink>
      <RouterLink
        :to="{
          name: 'conversation-list',
        }"
      >
        conversation-list
      </RouterLink>
      <RouterLink
        :to="{
          name: 'conversation-create',
        }"
      >
        conversation-create
      </RouterLink>
    </nav>
  </header>

  <RouterView v-slot="{ Component, route }">
    <Transition name="slide">
      <KeepAlive>
        <component :is="Component" :key="route.name" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

import { useSocketStore } from "@/stores";

const socketStore = useSocketStore();
socketStore.connect();
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
