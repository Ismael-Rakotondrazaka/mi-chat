import { participantResource } from "./participantResource";

const participantCollection = (collection = []) =>
  collection.map((resource) => participantResource(resource));

export { participantCollection };
