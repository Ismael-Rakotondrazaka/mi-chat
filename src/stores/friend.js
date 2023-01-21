import { axios } from "@/services/axios";
import { friendCollection } from "../resources";
import { destroyFriendHandler } from "../events";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFriendStore = defineStore("friend", () => {
  const friends = ref([]);

  const hasFriends = computed(() => friends.value.length > 0);

  const setFriends = async () => {
    const axiosResponseData = (
      await axios({
        url: "/friends",
        method: "GET",
      })
    ).data;

    friends.value = friendCollection(axiosResponseData.data.users).sort(
      (a, b) => a.name.full.localeCompare(b.name.full)
    );
  };

  const indexFriend = async ({ params }) => {
    const axiosResponseData = (
      await axios({
        url: "/friends",
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      users: friendCollection(axiosResponseData.data.users),
    };
  };

  const addOrUpdateFriend = (friend) => {
    const found = friends.value.find((value) => value.id === friend.id);

    if (found) {
      for (const key in friend) {
        if (Object.hasOwnProperty.call(friend, key)) {
          found[key] = friend[key];
        }
      }
      // we don't sort if it is an update, because the name is not supposed to be updated
    } else {
      friends.value.push(friend);
      friends.value.sort((a, b) => a.name.full.localeCompare(b.name.full));
    }
  };

  const removeFriend = ({ userId }) => {
    const index = friends.value.findIndex((value) => value.id === userId);

    if (index < 0) {
      friends.value.splice(index, 1);
    }
  };

  const destroyFriend = async ({ userId }) => {
    const axiosResponseData = (
      await axios({
        url: `/friends/${userId}`,
        method: "DELETE",
      })
    ).data;

    destroyFriendHandler(axiosResponseData);
  };

  const resetStore = () => {
    friends.value = [];
  };

  return {
    friends,
    hasFriends,
    addOrUpdateFriend,
    removeFriend,
    indexFriend,
    destroyFriend,
    setFriends,
    resetStore,
  };
});
