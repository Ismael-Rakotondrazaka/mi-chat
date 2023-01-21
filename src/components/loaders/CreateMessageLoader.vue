<template>
  <div class="flex flex-row items-start w-full h-full gap-x-3">
    <div
      class="w-full h-full px-3 text-lg leading-5 rounded-lg resize-none bg-slate-100 focus-visible:outline-none"
    ></div>

    <div class="w-[10%] sm:w-[5%] h-full shrink-0">
      <div class="flex flex-col items-start justify-between h-full">
        <div class="w-full">
          <div class="relative w-full h-0">
            <div
              class="absolute text-center -bottom-[3px] text-xs font-bold whitespace-nowrap w-full text-black"
              style="font-size: 0.5rem"
            >
              0/300
            </div>
          </div>

          <div class="w-full hover:cursor-pointer">
            <fa-icon icon="paper-plane" class="w-full text-2xl" />
          </div>
        </div>

        <div class="w-full">
          <div class="w-full">
            <fa-icon icon="file-upload" class="w-full text-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
