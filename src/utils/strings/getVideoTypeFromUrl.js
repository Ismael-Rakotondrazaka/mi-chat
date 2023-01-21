import { getFilenameFromUrl } from "./getFilenameFromUrl";

const getVideoTypeFromUrl = (url = "") => {
  let result = "";

  const filename = getFilenameFromUrl(url);
  const arr = filename.split(".");

  if (filename && arr.length > 0) {
    result = `video/${arr[arr.length - 1].toLowerCase()}`;
  }

  return result;
};

export { getVideoTypeFromUrl };
