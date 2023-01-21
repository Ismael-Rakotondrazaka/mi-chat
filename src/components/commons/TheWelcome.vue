<template>
  <div
    class="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden text-6xl text-center text-slate-400 md:text-8xl font-medium"
  >
    <h1>
      Welcome to <br />
      <span class="text-7xl md:text-9xl text-emerald-400"> mi-chat </span>
    </h1>

    <div
      class="absolute w-20 h-20 rounded-full -z-10 top-10 -left-10 xs:-left-20 xl:h-56 xl:w-56 bg-gradient-to-r from-emerald-300 to-emerald-400"
    ></div>
    <div
      class="absolute w-56 h-32 rounded-md rounded-tr-none xl:w-96 xl:h-64 top-52 -z-10 -right-20 -rotate-12 bg-gradient-to-r from-emerald-300 to-emerald-400"
    ></div>
    <div
      class="absolute bottom-20 -z-10 left-[10%] rotate-3 flex flex-col gap-y-3"
    >
      <div
        class="h-8 rounded-md rounded-tr-none bg-gradient-to-r from-emerald-300 to-emerald-400 w-52 xl:w-96 xl:h-12"
      ></div>
      <div
        class="h-8 rounded-md rounded-tr-none bg-gradient-to-r from-emerald-300 to-emerald-400 w-52 xl:w-96 xl:h-12"
      ></div>
      <div
        class="h-8 rounded-md rounded-tr-none bg-gradient-to-r from-emerald-300 to-emerald-400 w-52 xl:w-96 xl:h-12"
      ></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
