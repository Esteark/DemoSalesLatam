import axios from "axios";
import endpoints from "../services/endpoints.js";
export const getProducts = async () => {
  try {
    const { data } = await axios.get(endpoints.productos);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductsFiltered = async (idBranch) => {
  try {
    const { data } = await axios.get(
      endpoints.productos + `?branch=${idBranch}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
