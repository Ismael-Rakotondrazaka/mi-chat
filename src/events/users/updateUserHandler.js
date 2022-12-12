import { useUserStore } from "../../stores";
import { userCoreResource } from "../../resources";

const updateUserHandler = (payload) => {
  const userStore = useUserStore();

  const userData = userCoreResource(payload.data.user);

  // ! extra properties
  userData.email = payload.data.user.email;
  userData.updatedAt = new Date(payload.data.user.updatedAt);

  userStore.user = userData;
};

export { updateUserHandler };
