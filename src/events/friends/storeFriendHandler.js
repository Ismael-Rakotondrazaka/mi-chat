import {
  useFriendStore,
  useConversationOpenedStore,
  useProfileOpenedStore,
} from "../../stores";
import { userResource } from "../../resources";

const storeFriendHandler = (payload) => {
  const friendStore = useFriendStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const profileOpenedStore = useProfileOpenedStore();

  const targetUser = userResource(payload.data.user);

  friendStore.addOrUpdateFriend(targetUser);

  const targetUserId = targetUser.id;

  if (profileOpenedStore.is(targetUserId)) {
    profileOpenedStore.user.friendship = targetUser.friendship;
  }

  if (conversationOpenedStore.isConverser(targetUserId)) {
    conversationOpenedStore.conversation.converser.friendship =
      targetUser.friendship;
  }
};

export { storeFriendHandler };
