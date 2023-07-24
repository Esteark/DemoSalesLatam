import axios from "axios";
import endpoints from "../services/endpoints.js";

export const getUsers = async () => {
  try {
    const { data } = await axios.get(endpoints.vendedores);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (data) => {
  try {
    const { status } = await axios.post(endpoints.vendedores, data);
    return status === 201 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
