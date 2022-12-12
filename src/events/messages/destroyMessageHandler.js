import { useConversationStore, useConversationOpenedStore } from "../../stores";

import { isProxy, toRaw } from "vue";

const destroyMessageHandler = async (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();

  const targetConversationId = +payload.data.conversation.id;

  const targetMessageIds = +payload.data.conversation.messages.map(
    (val) => +val
  );

  let latestMessage = null;

  if (conversationOpenedStore.is(targetConversationId)) {
    targetMessageIds.forEach((targetMessageId) => {
      conversationOpenedStore.removeMessage({
        messageId: targetMessageId,
      });
    });

    latestMessage = isProxy(conversationOpenedStore.latestMessage)
      ? toRaw(conversationOpenedStore.latestMessage)
      : conversationOpenedStore.latestMessage;

    if (latestMessage) {
      if (latestMessage.id !== conversationOpenedStore.conversation.id) {
        conversationOpenedStore.updateConversation({
          latestMessage: latestMessage,
        });
      }
    }
  }

  // if the latestMessage is not in the conversationOpened, fetch the conversation with its latestMessage
  if (!latestMessage) {
    const targetConversation = (
      await conversationStore.showConversation({
        conversationId: targetConversationId,
      })
    ).conversation;

    conversationStore.addOrUpdateConversation(targetConversation);
  } else {
    // otherwise, just update the conversation
    conversationStore.addOrUpdateConversation({
      id: targetConversationId,
      latestMessage: latestMessage,
    });
  }
};

export { destroyMessageHandler };
