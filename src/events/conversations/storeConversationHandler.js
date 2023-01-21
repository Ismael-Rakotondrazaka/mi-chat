import {
  useConversationStore,
  useConversationOpenedStore,
  useSocketStore,
} from "../../stores";

const storeConversationHandler = async (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const socketStore = useSocketStore();

  // we get only the id, so need to fetch it
  const targetConversationId = +payload.data.conversation.id;

  socketStore.socketIO?.emit("conversations:join", {
    conversationId: targetConversationId,
  });

  // the response is already unwrapped and in a resource format
  const targetConversation = (
    await conversationStore.showConversation({
      conversationId: targetConversationId,
    })
  ).conversation;

  conversationStore.addOrUpdateConversation(targetConversation);

  if (conversationOpenedStore.is(targetConversationId)) {
    conversationOpenedStore.setConversation({
      conversationId: targetConversationId,
    });
  }
};

export { storeConversationHandler };
