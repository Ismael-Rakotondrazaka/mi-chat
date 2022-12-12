import {
  useFriendStore,
  useConversationOpenedStore,
  useProfileOpenedStore,
} from "../../stores";

const destroyFriendHandler = (payload) => {
  const friendStore = useFriendStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const profileOpenedStore = useProfileOpenedStore();

  const userId = +payload.data.user.id;

  friendStore.removeFriend({
    userId,
  });

  if (profileOpenedStore.is(userId)) {
    profileOpenedStore.user.friendship = {
      isFriend: false,
    };
  }

  if (conversationOpenedStore.isConverser(userId)) {
    conversationOpenedStore.conversation.converser.friendship = {
      isFriend: false,
    };
  }
};

export { destroyFriendHandler };
