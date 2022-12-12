import { useUserConnectedStore } from "../../stores";

const updateUserConnectedHandler = (payload) => {
  const userConnectedStore = useUserConnectedStore();

  userConnectedStore.users = payload.data.users;
};

export { updateUserConnectedHandler };
