const friendshipResource = (resource) => ({
  isFriend: Boolean(resource.isFriend),
  conversationId: +resource.conversationId,
  createdAt: new Date(resource.createdAt),
});

export { friendshipResource };
