import { messageResource } from "../../resources";
import { useConversationStore, useConversationOpenedStore } from "../../stores";

import { isProxy, toRaw } from "vue";

const storeMessageHandler = async (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();

  const targetConversationId = +payload.data.conversation.id;
  const conversationUpdatedAt = new Date(payload.data.conversation.updatedAt);

  const targetMessage = messageResource(payload.data.conversation.message);

  let latestMessage = null;

  if (conversationOpenedStore.is(targetConversationId)) {
    conversationOpenedStore.addMessage(targetMessage);

    if (
      conversationOpenedStore.conversation.updatedAt.getTime() <
      conversationUpdatedAt.getTime()
    ) {
      conversationOpenedStore.conversation.updatedAt = conversationUpdatedAt;
    }

    // ! because the latestMessage can be a proxy, we need to raw it
    latestMessage = isProxy(conversationOpenedStore.latestMessage)
      ? toRaw(conversationOpenedStore.latestMessage)
      : conversationOpenedStore.latestMessage;

    // we try to modify the conversationCore
    if (latestMessage.id !== conversationOpenedStore.conversation.id) {
      conversationOpenedStore.updateConversation({
        latestMessage: latestMessage,
      });
    }
  }

  const conversationParams = {
    id: targetConversationId,
  };

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

      if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
        conversationParams.updatedAt = conversationUpdatedAt;
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

      if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
        conversationParams.updatedAt = conversationUpdatedAt;
      }
    }
  }

  if (found) {
    if (found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
      conversationParams.updatedAt = conversationUpdatedAt;
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
