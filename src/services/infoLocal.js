export const setSesionUser = (data) => {
  localStorage.setItem("userSesion", JSON.stringify(data));
};
export const getSesionUser = () => {
  return JSON.parse(localStorage.getItem("userSesion")) || {};
};

export const logOutUser = () => {
  localStorage.clear("userSesion");
};
