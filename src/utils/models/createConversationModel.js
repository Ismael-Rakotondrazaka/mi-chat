const createConversationModel = ({
  id,
  type,
  name,
  imageUrl,
  description,
  createdAt,
  updatedAt,
}) => {
  const result = {
    id: +id,
    type: type + "",
    name: name + "",
    imageUrl: imageUrl + "",
    description: description + "",
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };

  return result;
};

export { createConversationModel };
