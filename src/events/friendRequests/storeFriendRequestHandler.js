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

  // ! the sender can be another user or the authUser itself
  const receiverId = friendRequestData.receiverId;

  if (userStore.is(receiverId)) {
    friendRequestStore.addFriendRequest(friendRequestData);
  }

  if (profileOpenedStore.is(receiverId) && !userStore.is(receiverId)) {
    profileOpenedStore.user.friendRequest = friendRequestData;
  }
};

export { storeFriendRequestHandler };
