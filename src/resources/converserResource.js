import { participationResource } from "./participationResource";
import { userCoreResource } from "./userCoreResource";
import { friendshipResource } from "./friendshipResource.js";

const converserResource = (resource) => ({
  ...userCoreResource(resource),
  participation: resource.participation
    ? participationResource(resource.participation)
    : null,
  friendship: resource.friendship.isFriend
    ? friendshipResource(resource.friendship)
    : {
        isFriend: false,
      },
});

export { converserResource };
