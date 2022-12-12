import { conversationResource } from "./conversationResource";

const conversationCollection = (collection = []) =>
  collection.map((conversation) => conversationResource(conversation));

export { conversationCollection };
