import { conversationCoreResource } from "./conversationCoreResource";
import { converserResource } from "./converserResource";
import { participationResource } from "./participationResource";
import { messageResource } from "./messageResource";

const conversationResource = (resource) => {
  if (resource.type === "personal") {
    return {
      ...conversationCoreResource(resource),
      converser: converserResource(resource.converser),
      participation: resource.participation
        ? participationResource(resource.participation)
        : null,
      latestMessage: resource.latestMessage
        ? messageResource(resource.latestMessage)
        : null,
      unreadMessagesCount: +resource.unreadMessagesCount,
    };
  } else {
    return {
      ...conversationCoreResource(resource),
      participation: resource.participation
        ? participationResource(resource.participation)
        : null,
      latestMessage: resource.latestMessage
        ? messageResource(resource.latestMessage)
        : null,
      unreadMessagesCount: +resource.unreadMessagesCount,
    };
  }
};

export { conversationResource };
