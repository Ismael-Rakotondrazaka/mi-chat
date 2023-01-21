import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserConnectedStore = defineStore("userConnected", () => {
  const users = ref([]);

  const isConnected = computed(() => (userId) => users.value.includes(userId));

  const resetStore = () => {
    users.value = [];
  };

  return {
    users,
    isConnected,
    resetStore,
  };
});
