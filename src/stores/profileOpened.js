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
    hasProfileOpened.value ? user.value.friends : []
  );

  const orderNameAscFilter = () =>
    [...friends.value].sort((a, b) => a.name.full.localeCompare(b.name.full));

  const orderNameDescFilter = () =>
    [...friends.value].sort((a, b) => b.name.full.localeCompare(a.name.full));

  const orderFriendshipAscFilter = () =>
    [...friends.value].sort(
      (a, b) =>
        a.friendship.createdAt.getTime() - b.friendship.createdAt.getTime()
    );

  const orderFriendshipDescFilter = () =>
    [...friends.value].sort(
      (a, b) =>
        b.friendship.createdAt.getTime() - a.friendship.createdAt.getTime()
    );

  const orderFilter = ref("order-name-asc");

  const orderFilters = {
    "order-name-asc": orderNameAscFilter,
    "order-name-desc": orderNameDescFilter,
    "order-friendship-asc": orderFriendshipAscFilter,
    "order-friendship-desc": orderFriendshipDescFilter,
  };

  const friendsOrderFiltered = computed(
    () => orderFilters[orderFilter.value]?.() || []
  );

  const nameFilter = ref("");

  const friendsFiltered = computed(() =>
    nameFilter.value.length === 0
      ? friendsOrderFiltered.value
      : friendsOrderFiltered.value.filter((friend) => {
          const toCompare = friend.name.full.toLowerCase();

          return new RegExp(nameFilter.value).test(toCompare);
        })
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
    orderFilter.value = "order-name-asc";
    nameFilter.value = "";
  };

  return {
    user,
    hasProfileOpened,
    friendRequest,
    friends,
    is,
    orderFilter,
    nameFilter,
    friendsFiltered,
    setProfileOpened,
    resetStore,
  };
});
