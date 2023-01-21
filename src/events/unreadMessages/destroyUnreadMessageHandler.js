import { useConversationStore } from "../../stores";

const destroyUnreadMessageHandler = (payload) => {
  const conversationStore = useConversationStore();

  const targetConversationId = +payload.data.conversation.id;
  const unreadMessagesCount = +payload.data.conversation.unreadMessagesCount;

  conversationStore.addOrUpdateConversation({
    id: targetConversationId,
    unreadMessagesCount: unreadMessagesCount,
  });
};

export { destroyUnreadMessageHandler };
