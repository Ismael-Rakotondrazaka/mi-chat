import { axios } from "@/services/axios";
import { useTokenStore } from "./token";
import { useResetStore } from "./reset";

import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useSessionStore = defineStore("session", () => {
  const tokenStore = useTokenStore();
  const resetStore = useResetStore();
  const router = useRouter();

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

    router.push({
      name: "conversation-list",
    });
  };

  const endSession = async () => {
    await axios({
      method: "POST",
      url: "/auth/logout",
      data: {
        refreshToken: tokenStore.refreshToken,
      },
    });

    resetStore.resetStores();

    router.push({
      name: "home",
    });
  };

  const _resetStore = () => {};

  return {
    startSession,
    endSession,
    resetStore: _resetStore,
  };
});
