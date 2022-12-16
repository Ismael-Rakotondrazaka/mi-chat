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

  const is = computed(
    () => (userId) => !!user.value && user.value.id === userId
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
  };

  return {
    user,
    is,
    registerUser,
    setAuthUser,
    showUser,
    indexUser,
    updateUser,
    resetStore,
  };
});
