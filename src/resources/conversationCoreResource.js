const conversationCoreResource = (resource) => ({
  id: +resource.id,
  type: resource.type + "",
  name: resource.name ? resource.name + "" : null,
  imageUrl: resource.imageUrl ? resource.imageUrl + "" : null,
  description: resource.description ? resource.description + "" : null,
  createdAt: new Date(resource.createdAt),
  updatedAt: new Date(resource.updatedAt),
});

export { conversationCoreResource };
