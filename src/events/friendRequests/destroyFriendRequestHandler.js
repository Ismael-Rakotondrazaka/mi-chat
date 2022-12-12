import { useFriendRequestStore, useProfileOpenedStore } from "../../stores";

const destroyFriendRequestHandler = (payload) => {
  const friendRequestStore = useFriendRequestStore();
  const profileOpenedStore = useProfileOpenedStore();

  const friendRequestId = +payload.data.friendRequest.id;

  const found = friendRequestStore.friendRequests.find(
    (friendRequest) => friendRequest.id === friendRequestId
  );

  if (found) {
    const senderId = found.sender.id;

    if (profileOpenedStore.is(senderId)) {
      profileOpenedStore.user.friendRequest = null;
    }
  }

  friendRequestStore.removeFriendRequest({
    friendRequestId,
  });
};

export { destroyFriendRequestHandler };
