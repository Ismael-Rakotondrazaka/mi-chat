import { participationResource } from "./participationResource";
import { userCoreResource } from "./userCoreResource";

const senderResource = (resource) => ({
  ...userCoreResource(resource),
  participation: resource.participation
    ? participationResource(resource.participation)
    : null,
});

export { senderResource };
