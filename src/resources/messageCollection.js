import { messageResource } from "./messageResource";

const messageCollection = (collection = []) =>
  collection.map((message) => messageResource(message));

export { messageCollection };
