import api from "../utils/api";
// get all categories for creating the product 
export const GET_ALL_CATEGORIES = async () => {
  const response = await api.get("/categories");
  return response.data;
};
