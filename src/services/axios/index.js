import router from "@/router/index";
import { useTokenStore } from "../../stores/token";
import { useResetStore } from "../../stores/reset";

import axiosModule from "axios";

const axiosInstance = axiosModule.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_ENTRY_POINT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const routesWithoutAuth = ["/auth/login", "/auth/register"];

// TODO need to avoid concurrent request for refreshToken
const axios = async (options) => {
  const tokenStore = useTokenStore();
  const resetStore = useResetStore();

  const axiosOptions = {
    ...options,
  };

  if (axiosOptions.headers) {
    axiosOptions.headers.Authorization = `Bearer ${tokenStore.accessToken}`;
  } else {
    axiosOptions.headers = {
      Authorization: `Bearer ${tokenStore.accessToken}`,
    };
  }

  if (routesWithoutAuth.includes(options.url)) {
    return await axiosInstance(axiosOptions);
  } else {
    return await axiosInstance(axiosOptions)
      // need to use refreshToken
      .catch(async (originalError) => {
        try {
          if (
            originalError.response &&
            (originalError.response.status === 401 ||
              originalError.response.status === 403) // TODO add error code checker
          ) {
            const axiosResponseData = (
              await axiosInstance({
                method: "POST",
                url: "/tokens/refresh",
                data: {
                  refreshToken: tokenStore.refreshToken,
                },
              })
            ).data;

            tokenStore.refreshToken =
              axiosResponseData.data.tokens.refreshToken;
            tokenStore.accessToken = axiosResponseData.data.tokens.accessToken;

            const newAxiosOptions = {
              ...options,
            };
            if (newAxiosOptions.headers) {
              newAxiosOptions.headers.Authorization = `Bearer ${tokenStore.accessToken}`;
            } else {
              newAxiosOptions.headers = {
                Authorization: `Bearer ${tokenStore.accessToken}`,
              };
            }

            return await axiosInstance(newAxiosOptions);
          } else {
            return Promise.reject(originalError);
          }
        } catch (error) {
          /* 
            we don't know if the error is from the refresh token process or the new request
            so we return the new error
          */

          if (error.response && error.response.status === 401) {
            resetStore.resetStores();

            router.push({
              name: "login",
            });
          }

          return Promise.reject(error);
        }
      });
  }
};

export { axios };
