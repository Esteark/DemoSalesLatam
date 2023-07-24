import axios from "axios";
import endpoints from "../services/endpoints.js";
export const getBranches = async () => {
  try {
    const { data } = await axios.get(endpoints.branches);
    return data;
  } catch (error) {
    console.log(error);
  }
};
