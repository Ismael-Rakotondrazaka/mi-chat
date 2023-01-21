const getFilenameFromUrl = (url = "") => {
  let result = "";
  const arr = url.split("/");

  if (arr.length > 0) {
    result = arr[arr.length - 1];
  }

  return result;
};

export { getFilenameFromUrl };
