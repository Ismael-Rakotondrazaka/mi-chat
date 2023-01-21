import { axios } from "@/services/axios";
import { useTokenStore } from "./token";
import { useResetStore } from "./reset";

import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", () => {
  const tokenStore = useTokenStore();
  const resetStore = useResetStore();

  const startSession = async ({ data }) => {
    const axiosResponseData = (
      await axios({
        method: "POST",
        url: "/auth/login",
        data: data,
      })
    ).data;

    tokenStore.accessToken = axiosResponseData.data.tokens.accessToken;
    tokenStore.refreshToken = axiosResponseData.data.tokens.refreshToken;
  };

  const register = async ({ data }) => {
    const axiosResponseData = (
      await axios({
        method: "POST",
        url: "/auth/register",
        data: data,
      })
    ).data;

    tokenStore.accessToken = axiosResponseData.data.tokens.accessToken;
    tokenStore.refreshToken = axiosResponseData.data.tokens.refreshToken;
  };

  const endSession = async () => {
    await axios({
      method: "POST",
      url: "/auth/logout",
      data: {
        refreshToken: tokenStore.refreshToken,
      },
    });

    resetStore.reset();
  };

  const _resetStore = () => {};

  return {
    startSession,
    endSession,
    register,
    resetStore: _resetStore,
  };
});
