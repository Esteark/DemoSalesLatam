import React, { useContext, useEffect, useState } from "react";
import "./stylesFormLogin.scss";
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import { TbDoorEnter } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../services/userActions";
import { Toaster, toast } from "react-hot-toast";
import { AppContext } from "../../../router/Routers";
import { setSesionUser } from "../../../services/infoLocal";

const FormLogin = () => {
  const navigate = useNavigate();
  const { sesion, setSesion, sesionValidate } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitForm = (data) => {
    console.log(data);

    getUsers()
      .then((res) => {
        let encontrado = false;
        for (const user of res) {
          if (user.rut === data.rut && user.pass === data.pass) {
            toast.success("Bienvendo: " + user.nom);
            encontrado = true;
            setSesionUser({ user: user.nom, isActive: true });
            setSesion({ user: user.nom, isActive: true });
            break;
          }
        }
        if (encontrado) {
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        } else {
          toast.error(
            "Rut o contraseña incorrecta, ¡verifica esta información o registrate por favor!"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //el Siguiente useEffect me sirve para verificar la sesión del usuario
  useEffect(() => {
    if (sesion.isActive) {
      navigate("/admin");
    }
  }, []);

  return (
    <section className="secLogin">
      <Toaster />
      <header>
        <TbDoorEnter
          className="iconOutForm"
          onClick={() => {
            navigate("/");
          }}
        />
      </header>
      <form onSubmit={handleSubmit(onSubmitForm)} className="formAdmin">
        <label>
          Salesman RUT
          <input
            type="text"
            placeholder="Ingrese el su rut de vendedor"
            {...register("rut", { required: "El rut es requerido" })}
          />
          {errors.rut ? (
            <span className="lblError">{errors.rut.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Password
          <input
            type="text"
            placeholder="Ingrese su Id"
            {...register("pass", { required: "El password es requerido" })}
          />
          {errors.pass ? (
            <span className="lblError">{errors.pass.message}</span>
          ) : (
            <></>
          )}
        </label>
        <section>
          <button>Login</button>
          <div
            onClick={() => {
              navigate("/register");
            }}
          >
            Registrarse <FaUserEdit />
          </div>
        </section>
      </form>
    </section>
  );
};

export default FormLogin;
