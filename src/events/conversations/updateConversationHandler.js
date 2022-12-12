import { conversationCoreResource } from "../../resources";
import { useConversationStore } from "../../stores";

const updateConversationHandler = (payload) => {
  const conversationStore = useConversationStore();

  const conversationData = conversationCoreResource(payload.data.conversation);

  conversationStore.addOrUpdateConversation(conversationData);
};

export { updateConversationHandler };
