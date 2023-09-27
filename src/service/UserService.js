import api from "../utils/api";

export const GET_ALL_USERS = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const GET_USER_BY_ID = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};


export const CREATE_USER = async (user) => {
  const response = await api.post("/users", user);
  return response.data;
}

export const UPDATE_USER = async (id, user) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
}