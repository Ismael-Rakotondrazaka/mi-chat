import { friendRequestResource } from "./friendRequestResource";

const friendRequestCollection = (collection = []) =>
  collection.map((resource) => friendRequestResource(resource));

export { friendRequestCollection };
