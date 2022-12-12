import { friendshipResource } from "./friendshipResource";
import { userCoreResource } from "./userCoreResource";

// ! there is no friend request for userCollection
const userCollection = (collection = []) =>
  collection.map((resource) => ({
    ...userCoreResource(resource),

    friendship: resource.friendship.isFriend
      ? friendshipResource(resource.friendship)
      : {
          isFriend: false,
        },
  }));

export { userCollection };
