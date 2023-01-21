import { axios } from "@/services/axios";
import { useTokenStore } from "./token";
import { userCoreResource, userResource, userCollection } from "@/resources";

import { updateUserHandler } from "../events";

import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const tokenStore = useTokenStore();
  const router = useRouter();

  const user = ref(null);

  const is = computed(() => (userId) => user.value?.id === userId);

  const users = ref([]);

  const typeAllFilter = () => users.value.filter(() => true);

  const typeFriendFilter = () =>
    users.value.filter((user) => user.friendship.isFriend);

  const typeNotFriendFilter = () =>
    users.value.filter((user) => !user.friendship.isFriend);

  const typeFilter = ref("type-all");

  const typeFilters = {
    "type-all": typeAllFilter,
    "type-friend": typeFriendFilter,
    "type-not-friend": typeNotFriendFilter,
  };

  const usersTypeFiltered = computed(
    () => typeFilters[typeFilter.value]?.() || []
  );

  const orderAscFilter = () =>
    [...usersTypeFiltered.value].sort((a, b) =>
      a.name.full.localeCompare(b.name.full)
    );

  const orderDescFilter = () =>
    [...usersTypeFiltered.value].sort((a, b) =>
      b.name.full.localeCompare(a.name.full)
    );

  const orderFilters = {
    "order-asc": orderAscFilter,
    "order-desc": orderDescFilter,
  };

  const orderFilter = ref("order-asc");

  const usersOrderFiltered = computed(
    () => orderFilters[orderFilter.value]?.() || []
  );

  const nameFilter = ref("");

  const usersFiltered = computed(() =>
    nameFilter.value.length === 0
      ? usersOrderFiltered.value
      : usersOrderFiltered.value.filter((user) => {
          const toCompare = user.name.full.toLowerCase();

          return new RegExp(nameFilter.value).test(toCompare);
        })
  );

  const registerUser = async (data) => {
    const axiosResponseData = (
      await axios({
        method: "POST",
        url: "/auth/register",
        data: data,
      })
    ).data;

    tokenStore.accessToken = axiosResponseData.data.tokens.accessToken;
    tokenStore.refreshToken = axiosResponseData.data.tokens.refreshToken;

    router.push({
      name: "conversations-list",
    });
  };

  const setAuthUser = async () => {
    const axiosResponseData = (
      await axios({
        method: "GET",
        url: "/auth/whoami",
      })
    ).data;

    const userData = userCoreResource(axiosResponseData.data.user);

    // ! email and updatedAt are extra properties from whoami
    userData.email = axiosResponseData.data.user.email;
    userData.updatedAt = new Date(axiosResponseData.data.user.updatedAt);

    user.value = userData;
  };

  const showUser = async ({ userId, params }) => {
    const axiosResponseData = (
      await axios({
        url: `/users/${userId}`,
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      user: userResource(axiosResponseData.data.user),
    };
  };

  const indexUser = async ({ params }) => {
    const axiosResponseData = (
      await axios({
        url: `/users`,
        method: "GET",
        params: params,
      })
    ).data;

    return {
      ...axiosResponseData.data,
      users: userCollection(axiosResponseData.data.users),
    };
  };

  const updateUser = async ({ userId, data, params, headers }) => {
    const axiosResponseData = (
      await axios({
        url: `/users/${userId}`,
        method: "PUT",
        data: data,
        params: params,
        headers: headers,
      })
    ).data;

    updateUserHandler(axiosResponseData);
  };

  const resetStore = () => {
    user.value = null;
    users.value = [];
    typeFilter.value = "type-all";
    orderFilter.value = "order-asc";
    nameFilter.value = "";
  };

  return {
    user,
    is,
    users,
    typeFilter,
    orderFilter,
    nameFilter,
    usersFiltered,
    registerUser,
    setAuthUser,
    showUser,
    indexUser,
    updateUser,
    resetStore,
  };
});
