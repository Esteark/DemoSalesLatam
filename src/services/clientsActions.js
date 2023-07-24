import axios from "axios";
import endpoints from "../services/endpoints.js";

export const getClients = async () => {
  try {
    const { data } = await axios.get(endpoints.clientes);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addClient = async (data) => {
  try {
    const { status } = await axios.post(endpoints.clientes, data);
    return status === 201 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
