import { useState } from "react";

const useValidate = (campoValidate = "") => {
  const [regEmail, setRegEmail] = useState(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const [validacion, setValidacion] = useState({
    nomUser: /^[^\s]+$/,
    email: regEmail,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]{6,}$/,
    rut: /^[0-9]{8}$/,
    date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    idCli: /^\d{10}$/,
  });

  return validacion;
};

export default useValidate;
