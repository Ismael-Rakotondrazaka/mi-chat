import { useUserStore, useProfileOpenedStore } from "../../stores";
import { userCoreResource } from "../../resources";

const updateUserHandler = (payload) => {
  const userStore = useUserStore();
  const profileOpenedStore = useProfileOpenedStore();

  const userData = userCoreResource(payload.data.user);

  // ! extra properties
  userData.email = payload.data.user.email;
  userData.updatedAt = new Date(payload.data.user.updatedAt);

  userStore.user = userData;

  if (profileOpenedStore.is(userData.id)) {
    for (const key in userStore.user) {
      if (Object.hasOwnProperty.call(userStore.user, key)) {
        profileOpenedStore.user[key] = userStore.user[key];
      }
    }
  }
};

export { updateUserHandler };
