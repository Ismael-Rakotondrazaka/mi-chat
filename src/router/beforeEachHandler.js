import { useTokenStore } from "../stores";
import { authRoutes, unauthRoutes } from "./routes";
import { setStoreByRoute } from "./setStoreByRoute";

const beforeEachHandler = (to, from, next) => {
  const tokenStore = useTokenStore();

  const unauthRedirectTo = {
    name: "login",
  };
  const authRedirectTo = {
    name: "conversation-list",
  };

  let nextLocation = {
    ...to,
  };

  if (authRoutes.includes(to.name)) {
    if (!tokenStore.hasRefreshToken) {
      nextLocation = unauthRedirectTo;
    }
  } else if (unauthRoutes.includes(to.name)) {
    if (tokenStore.hasRefreshToken) {
      nextLocation = authRedirectTo;
    }
  }

  setStoreByRoute(nextLocation);

  if (nextLocation.name !== to.name) {
    next(nextLocation);
  } else {
    next();
  }
};

export { beforeEachHandler };
