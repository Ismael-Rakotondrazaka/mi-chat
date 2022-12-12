import {
  useConversationStore,
  useConversationOpenedStore,
  useParticipantStore,
} from "../../stores";

// the main logic is the same as in storeParticipantHandler
const updateParticipantHandler = async (payload) => {
  const conversationStore = useConversationStore();
  const conversationOpenedStore = useConversationOpenedStore();
  const participantStore = useParticipantStore();

  const targetConversationId = +payload.data.conversation.id;
  const conversationUpdatedAt = new Date(payload.data.conversation.updatedAt);

  const targetParticipantIds = +payload.data.conversation.participants.map(
    (val) => +val
  );

  if (conversationOpenedStore.is(targetConversationId)) {
    if (
      conversationOpenedStore.conversation.updatedAt.getTime() <
      conversationUpdatedAt.getTime()
    ) {
      conversationOpenedStore.conversation.updatedAt = conversationUpdatedAt;
    }

    await Promise.all(
      targetParticipantIds.map(async (participantId) => {
        const participantFetched = (
          await participantStore.showParticipant({
            conversationId: targetConversationId,
            participantId: participantId,
          })
        ).participant;

        conversationOpenedStore.addOrUpdateParticipant(participantFetched);
      })
    );
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
  // if we don't find the conversation, we don't do anything
};

export { updateParticipantHandler };
