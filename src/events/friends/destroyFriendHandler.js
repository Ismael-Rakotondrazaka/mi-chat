import {
  useFriendStore,
  useConversationOpenedStore,
  useProfileOpenedStore,
  useUserStore,
} from "../../stores";

const destroyFriendHandler = (payload) => {
  const friendStore = useFriendStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const profileOpenedStore = useProfileOpenedStore();
  const userStore = useUserStore();

  const userId = +payload.data.user.id;

  friendStore.removeFriend({
    userId,
  });

  if (profileOpenedStore.is(userId)) {
    // update the profile opened
    profileOpenedStore.user.friendship = {
      isFriend: false,
    };

    // remove auth user from the profileOpened friends list
    if (userStore.user) {
      const friendIndex = profileOpenedStore.user.friends.findIndex((friend) =>
        userStore.is(friend.id)
      );

      if (friendIndex >= 0) {
        profileOpenedStore.user.friends.splice(friendIndex, 1);
      }
    }
  }

  if (conversationOpenedStore.isConverser(userId)) {
    conversationOpenedStore.conversation.converser.friendship = {
      isFriend: false,
    };
  }
};

export { destroyFriendHandler };
