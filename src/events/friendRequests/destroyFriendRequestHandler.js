import { useFriendRequestStore, useProfileOpenedStore } from "../../stores";

const destroyFriendRequestHandler = (payload) => {
  const friendRequestStore = useFriendRequestStore();
  const profileOpenedStore = useProfileOpenedStore();

  const friendRequestId = +payload.data.friendRequest.id;

  if (
    profileOpenedStore.hasProfileOpened &&
    profileOpenedStore.user?.friendRequest?.id === friendRequestId
  ) {
    profileOpenedStore.user.friendRequest = null;
  }

  friendRequestStore.removeFriendRequest({
    friendRequestId,
  });
};

export { destroyFriendRequestHandler };
