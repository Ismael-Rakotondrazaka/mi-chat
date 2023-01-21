import { messageResource } from "../../resources";
import {
  useConversationStore,
  useConversationOpenedStore,
  useUnreadMessageStore,
} from "../../stores";

import { isProxy, toRaw } from "vue";

const storeMessageHandler = async (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const unreadMessageStore = useUnreadMessageStore();

  const targetConversationId = +payload.data.conversation.id;
  const conversationUpdatedAt = new Date(payload.data.conversation.updatedAt);

  const targetMessage = messageResource(payload.data.conversation.message);

  let latestMessage = null;

  if (conversationOpenedStore.is(targetConversationId)) {
    // we add the new message
    conversationOpenedStore.addMessage(targetMessage);

    // ! because the latestMessage can be a proxy, we need to raw it
    latestMessage = isProxy(conversationOpenedStore.latestMessage)
      ? toRaw(conversationOpenedStore.latestMessage)
      : conversationOpenedStore.latestMessage;

    // we update the conversationCore
    conversationOpenedStore.conversation.latestMessage = latestMessage;
    if (
      conversationOpenedStore.conversation.updatedAt.getTime() <
      conversationUpdatedAt.getTime()
    ) {
      conversationOpenedStore.conversation.updatedAt = conversationUpdatedAt;
      // conversationOpenedStore.conversation.unreadMessagesCount++;
    }

    // if the conversation is opened AND messages list is opened
    // ! because composables from router-vue cannot be accessed here, we use regexp
    if (/\/conversations\/(\d+)\/messages/.test(document.URL)) {
      // immediately, we mark as read
      unreadMessageStore.destroyUnreadMessage({
        conversationId: targetConversationId,
      });
    }
  }

  const conversationParams = {
    id: targetConversationId,
  };

  // ! it's a proxy
  const found = conversationStore.conversations.find(
    (conversation) => conversation.id === targetConversationId
  );

  // we get a temp latestMessage, it may be the targetMessage or not
  if (latestMessage) {
    if (found) {
      // if it has a latestMessage then compare them
      if (found.latestMessage) {
        if (
          found.latestMessage.createdAt.getTime() <
          latestMessage.createdAt.getTime()
        ) {
          conversationParams.latestMessage = latestMessage;
        }
      }
      // otherwise, compare by updatedAt of the conversation
      else if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
        conversationParams.latestMessage = latestMessage;
      }
    }
  }
  // we don't get a latestMessage from the conversationOpened, maybe it is not opened
  else {
    if (found) {
      // compare with the targetMessage
      if (found.latestMessage) {
        if (
          found.latestMessage.createdAt.getTime() <
          targetMessage.createdAt.getTime()
        ) {
          conversationParams.latestMessage = targetMessage;
        }
      } else if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
        conversationParams.latestMessage = targetMessage;
      }
    }
  }

  if (found) {
    if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
      conversationParams.updatedAt = conversationUpdatedAt;
    }

    // increment only when the conversation is NOT opened
    if (!conversationOpenedStore.is(targetConversationId)) {
      conversationParams.unreadMessagesCount = found.unreadMessagesCount + 1;
    }

    conversationStore.addOrUpdateConversation(conversationParams);
  }
  // here, the conversation does not exist on conversationStore, but we receive a message, so we fetch the conversation with its latestMessage
  else {
    const conversationData = (
      await conversationStore.showConversation({
        targetConversationId,
      })
    ).conversation;

    conversationStore.addOrUpdateConversation(conversationData);
  }
};

export { storeMessageHandler };
