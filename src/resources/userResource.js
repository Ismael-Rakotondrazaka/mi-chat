import { userCollection } from "./userCollection";
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
    friends: userCollection(resource.friends), // use userCollection because the resource can be other than authUser
  };
};

export { userResource };
