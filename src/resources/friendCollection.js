import { friendResource } from "./friendResource";

const friendCollection = (collection = []) =>
  collection.map((resource) => ({ ...friendResource(resource) }));

export { friendCollection };
