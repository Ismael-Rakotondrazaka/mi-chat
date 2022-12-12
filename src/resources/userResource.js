import { friendCollection } from "./friendCollection";
import { friendRequestResource } from "./friendRequestResource";
import { friendshipResource } from "./friendshipResource";
import { userCoreResource } from "./userCoreResource";

const userResource = (resource) => {
  return {
    ...userCoreResource(resource),
    friendRequest: resource.friendRequest
      ? friendRequestResource(resource.friendRequest)
      : null,
    friendship: resource.friendship.isFriend
      ? friendshipResource(resource.friendship)
      : {
          isFriend: false,
        },
    friends: friendCollection(resource.friends),
  };
};

export { userResource };
