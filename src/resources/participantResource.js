import { userCoreResource } from "./userCoreResource";
import { participationResource } from "./participationResource";
import { friendshipResource } from "./friendshipResource";

const participantResource = (resource) => ({
  ...userCoreResource(resource),
  participation: participationResource(resource.participation),
  friendship: resource.friendship.isFriend
    ? friendshipResource(resource.friendship)
    : {
        isFriend: false,
      },
});

export { participantResource };
