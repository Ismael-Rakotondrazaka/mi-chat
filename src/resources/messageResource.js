import { senderResource } from "./senderResource";

const messageResource = (resource) => ({
  id: +resource.id,
  conversationId: +resource.conversationId,
  type: resource.type + "",
  content: resource.content + "",
  createdAt: new Date(resource.createdAt),
  sender: senderResource(resource.sender),
});

export { messageResource };
