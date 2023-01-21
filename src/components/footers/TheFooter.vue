<template>
  <footer
    class="p-3 bg-white border-2 rounded-md border-border shadow-button hover:border-border-primary hover:shadow-border-primary"
  >
    <div class="flex flex-row flex-wrap items-center justify-between mb-3">
      <ul>
        <li>
          <RouterLink
            :to="{
              name: 'privacy-policy',
            }"
            class="text-black hover:underline hover:text-border-primary"
          >
            Privacy Policy
          </RouterLink>
        </li>
      </ul>
    </div>

    <p class="text-center">
      &copy; copyright {{ year }}
      <a
        target="_blank"
        href="https://github.com/Ismael-Rakotondrazaka"
        class="text-lg font-bold hover:underline text-border-primary"
      >
        Ismael
      </a>
    </p>
  </footer>
</template>

<script setup>
import { useDateStore } from "../../stores";

import { useDateFormat } from "@vueuse/core";

const dateStore = useDateStore();

const year = useDateFormat(dateStore.now, "YYYY");
</script>

<style scoped></style>
