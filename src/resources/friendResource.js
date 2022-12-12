import { userCoreResource } from "./userCoreResource";

const friendResource = (resource) => ({
  ...userCoreResource(resource),
  friendship: {
    isFriend: true,
    conversationId: +resource.friendship.conversationId,
    createdAt: new Date(resource.friendship.createdAt),
  },
});

export { friendResource };
