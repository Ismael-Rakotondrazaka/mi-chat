const userCoreResource = (resource) => ({
  id: +resource.id,
  name: {
    full: resource.name.full + "",
    first: resource.name.first + "",
    last: resource.name.last + "",
  },
  imageUrl: resource.imageUrl ? resource.imageUrl + "" : null,
  description: resource.description ? resource.description + "" : null,
  createdAt: new Date(resource.createdAt),
});

export { userCoreResource };
