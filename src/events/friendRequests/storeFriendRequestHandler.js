import {
  useFriendRequestStore,
  useProfileOpenedStore,
  useUserStore,
} from "../../stores";
import { friendRequestResource } from "../../resources";

const storeFriendRequestHandler = (payload) => {
  const friendRequestStore = useFriendRequestStore();
  const profileOpenedStore = useProfileOpenedStore();
  const userStore = useUserStore();

  const friendRequestData = friendRequestResource(payload.data.friendRequest);

  friendRequestStore.addFriendRequest(friendRequestData);

  // ! the sender can be another user or the authUser itself
  const senderId = friendRequestData.sender.id;

  if (profileOpenedStore.is(senderId) && !userStore.is(senderId)) {
    profileOpenedStore.user.friendRequest = friendRequestData;
  }
};

export { storeFriendRequestHandler };
