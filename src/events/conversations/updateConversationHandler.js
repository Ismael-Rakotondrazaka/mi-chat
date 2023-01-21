import { conversationCoreResource } from "../../resources";
import { useConversationStore, useConversationOpenedStore } from "../../stores";

const updateConversationHandler = (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();

  const conversationData = conversationCoreResource(payload.data.conversation);

  conversationStore.addOrUpdateConversation(conversationData);

  if (conversationOpenedStore.is(conversationData.id)) {
    conversationOpenedStore.updateConversation(conversationData);
  }
};

export { updateConversationHandler };
