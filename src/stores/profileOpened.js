import { axios } from "../services/axios";

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { userResource } from "../resources";

export const useProfileOpenedStore = defineStore("profileOpened", () => {
  const user = ref(null);

  const hasProfileOpened = computed(() => !!user.value);

  const friendRequest = computed(() =>
    hasProfileOpened.value ? user.value.friendRequest : null
  );

  const friends = computed(() =>
    hasProfileOpened.value ? user.value.friends : null
  );

  const is = computed(
    () => (userId) => hasProfileOpened.value && user.value.id === userId
  );

  const setProfileOpened = async ({ userId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/users/${userId}`,
        method: "GET",
        params: params,
      })
    ).data;

    user.value = userResource(axiosResponseData.data.user);
  };

  const resetStore = () => {
    user.value = null;
  };

  return {
    user,
    hasProfileOpened,
    friendRequest,
    friends,
    is,
    setProfileOpened,
    resetStore,
  };
});
