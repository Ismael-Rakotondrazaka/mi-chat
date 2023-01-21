import {
  useConversationStore,
  useConversationOpenedStore,
  useUserStore,
  useSocketStore,
} from "../../stores";

const destroyParticipantHandler = (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const userStore = useUserStore();
  const socketStore = useSocketStore();

  const targetConversationId = +payload.data.conversation.id;
  const conversationUpdatedAt = new Date(payload.data.conversation.updatedAt);

  const targetParticipantIds = payload.data.conversation.participants.map(
    (val) => +val
  );

  if (conversationOpenedStore.is(targetConversationId)) {
    targetParticipantIds.forEach((targetParticipantId) => {
      conversationOpenedStore.removeParticipant({
        userId: targetParticipantId,
      });

      if (userStore.is(targetParticipantId)) {
        socketStore.socketIO?.emit("conversations:leave", {
          conversationId: conversationOpenedStore.conversation.id,
        });
      }
    });

    if (
      conversationOpenedStore.conversation.updatedAt.getTime() <
      conversationUpdatedAt.getTime()
    ) {
      conversationOpenedStore.updateConversation({
        updatedAt: conversationUpdatedAt,
      });
    }
  }

  const found = conversationStore.conversations.find(
    (conversation) => conversation.id === targetConversationId
  );

  if (found && found.updatedAt.getTime() < conversationUpdatedAt.getTime()) {
    conversationStore.addOrUpdateConversation({
      id: targetConversationId,
      updatedAt: conversationUpdatedAt,
    });
  }

  // if we don't find the conversation we do anything
};

export { destroyParticipantHandler };
