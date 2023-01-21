import { useConversationStore, useConversationOpenedStore } from "../../stores";

// destroy a conversation means destroy messages, not the conversation itself
const destroyConversationHandler = (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();

  const conversationId = +payload.data.conversation.id;

  const found = conversationStore.conversations.find(
    (conversation) => conversation.id === conversationId
  );

  if (found) {
    found.latestMessage = null;
  }

  if (conversationOpenedStore.is(conversationId)) {
    conversationOpenedStore.messages = [];
  }
};

export { destroyConversationHandler };
