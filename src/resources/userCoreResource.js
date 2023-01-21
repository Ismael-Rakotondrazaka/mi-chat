const backendEntryPoint = import.meta.env.VITE_APP_BACKEND_ENTRY_POINT;

const userCoreResource = (resource) => {
  return {
    id: +resource.id,
    name: {
      full: resource.name.full + "",
      first: resource.name.first + "",
      last: resource.name.last + "",
    },
    imageUrl: resource.imageUrl
      ? `${backendEntryPoint}${resource.imageUrl}`
      : null,
    description: resource.description ? resource.description + "" : null,
    createdAt: new Date(resource.createdAt),
  };
};

export { userCoreResource };
