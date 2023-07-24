import axios from "axios";
import endpoints from "../services/endpoints.js";

export const getSales = async () => {
  try {
    const { data } = await axios.get(endpoints.ventas);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addSale = async (data) => {
  try {
    const { status } = await axios.post(endpoints.ventas, data);
    return status === 201 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
