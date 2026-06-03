import API from "../api/axios";

export const getProfile = () => {
  return API.get("/profile");
};

export const updateProfile = (formData) => {
  return API.put("/profile", formData);
};