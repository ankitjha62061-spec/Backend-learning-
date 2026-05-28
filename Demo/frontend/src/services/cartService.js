import API from "../api/axios";

export const addToCart = (productId) => {
  return API.post("/cart/add", {
    productId,
  });
};

export const getCart = () => {
  return API.get("/cart");
};