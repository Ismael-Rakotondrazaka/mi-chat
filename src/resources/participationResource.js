const participationResource = (resource) => ({
  nickname: resource.nickname ? resource.nickname + "" : null,
  role: resource.role + "",
  createdAt: new Date(resource.createdAt),
});

export { participationResource };
