<template>
  <div class="bg-white border-2 rounded-md border-border shadow-button">
    <div class="flex flex-col items-center justify-between h-full p-3 gap-y-3">
      <div class="px-3 place-self-end">
        <fa-icon icon="bars" class="inline-block text-xl" />
      </div>

      <div>
        <AvatarUI :src="avatarSrc" type="group" size="md" :userId="0" />
      </div>

      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="text-3xl font-bold">Artify</h1>

        <p class="overflow-x-auto text-sm whitespace-normal px-7">
          Make sm'art choice in your life
        </p>
      </div>
    </div>

    <div>
      <ul class="list-disc list-inside">
        <li
          class="w-full py-1 pl-3 pr-3 text-left text-black border-t border-border"
        >
          Member since
          <span class="font-bold"> Dec 9, 2022 </span>
        </li>

        <li class="w-full px-3 py-1 text-left text-black">
          Nickname:
          <span class="font-bold"> Heavenly </span>

          <div class="ml-5 text-info hover:underline underline-offset-4">
            <fa-icon icon="pen-to-square" class="inline-block mr-1 text-xl" />

            Edit nickname
          </div>
        </li>

        <li
          class="w-full px-3 py-1 text-left text-black border-b border-border"
        >
          Role:
          <span class="font-bold capitalize"> Admin </span>
        </li>
      </ul>

      <div>
        <div
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-primary hover:text-white text-primary"
        >
          <fa-icon icon="message" class="mr-3 text-xl" />

          <span>Open chat</span>
        </div>
      </div>

      <div>
        <div
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="users" class="mr-3 text-xl" />

          <span>
            <span class="font-bold">33</span>
            participants
          </span>
        </div>
      </div>

      <div>
        <div
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="images" class="mr-3 text-xl" />

          <span>1032 shared medias</span>
        </div>
      </div>

      <div>
        <div
          class="w-full px-3 py-4 text-left border-b border-border hover:bg-info hover:text-white text-info"
        >
          <fa-icon icon="user-pen" class="mr-3 text-xl" />

          <span>Edit</span>
        </div>
      </div>

      <div>
        <div
          class="w-full px-3 py-4 text-left border-b hover:bg-danger hover:text-white text-danger border-border"
        >
          <fa-icon icon="trash" class="mr-3 text-xl" />

          <span>Delete</span>
        </div>
      </div>

      <div>
        <div
          class="w-full px-3 py-4 text-left hover:bg-danger hover:text-white text-danger rounded-b-md"
        >
          <fa-icon icon="arrow-right-from-bracket" class="mr-3 text-xl" />

          <span>Leave</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AvatarUI from "../ui/AvatarUI.vue";
import avatarSrc from "../../assets/images/illustrations/art.jpg";
</script>

<style scoped></style>
