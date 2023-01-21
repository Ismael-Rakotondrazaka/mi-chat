import { senderResource } from "./senderResource";

const backendEntryPoint = import.meta.env.VITE_APP_BACKEND_ENTRY_POINT;

const messageResource = (resource) => {
  return {
    id: +resource.id,
    conversationId: +resource.conversationId,
    type: resource.type + "",
    content: ["file", "image", "video"].includes(resource.type)
      ? `${backendEntryPoint}${resource.content}`
      : resource.content + "",
    createdAt: new Date(resource.createdAt),
    sender: senderResource(resource.sender),
  };
};

export { messageResource };
