import { userCoreResource } from "./userCoreResource";

const friendRequestResource = (resource) => ({
  id: +resource.id,
  createdAt: new Date(resource.createdAt),
  receiverId: +resource.receiverId,
  sender: userCoreResource(resource.sender),
});

export { friendRequestResource };
