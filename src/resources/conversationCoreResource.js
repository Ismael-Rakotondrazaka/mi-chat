const backendEntryPoint = import.meta.env.VITE_APP_BACKEND_ENTRY_POINT;

const conversationCoreResource = (resource) => {
  return {
    id: +resource.id,
    type: resource.type + "",
    name: resource.name ? resource.name + "" : null,
    imageUrl: resource.imageUrl
      ? `${backendEntryPoint}${resource.imageUrl}`
      : null,
    description: resource.description ? resource.description + "" : null,
    createdAt: new Date(resource.createdAt),
    updatedAt: new Date(resource.updatedAt),
  };
};

export { conversationCoreResource };
