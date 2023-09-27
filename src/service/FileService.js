import api from "../utils/api";

export const UPLOAD_FILE = async (file) => {
  const response = await api.post("/files/upload", file, {});
  return response.data;
};
