import React, { useContext, useEffect } from "react";
import "./stylesFormRegister.scss";
import { useForm } from "react-hook-form";
import { TbDoorEnter } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useValidate from "../../../hooks/UseValidate.js";
import { Toaster, toast } from "react-hot-toast";
import { addUser, getUsers } from "../../../services/userActions";
import { AppContext } from "../../../router/Routers";

const FormRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sesion } = useContext(AppContext);

  //Iniciamos el hook personalido
  const validacion = useValidate();

  const ObtainUsers = async (rut) => {
    const users = await getUsers();
    for (const item of users) {
      if (item.rut === rut) {
        return true;
      }
    }
    return false;
  };

  const onSubmitForm = async (data) => {
    console.log(data);
    if (data.pass1 !== data.pass2) {
      toast.error("Las contraseñas no coinciden");
    } else {
      const newSalesMan = {
        dateBorn: data.date,
        email: data.email,
        lastName: data.lastName,
        nom: data.nom,
        pass: data.pass2,
        rut: data.rut,
        tel: Number(data.tel),
      };
      let encontrado = await ObtainUsers(data.rut);
      if (encontrado) {
        toast.error(
          " Hay un vendedor registrado con este rut que intentas guardar, ingresa uno nuevo por favor"
        );
      } else {
        const response = await addUser(newSalesMan);
        if (response) {
          toast.success("Usuario registrado correctamente");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast.error(
            "Ocurrió un error al intentar procesar la solicitud intentalo nuevamente más tarde por favor"
          );
        }
      }
    }
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
            navigate("/login");
          }}
        />
      </header>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="formAdmin formRegister"
      >
        <label>
          Salesman RUT
          <input
            type="number"
            placeholder="Ingrese su rut de vendedor"
            {...register("rut", {
              required: "El rut es requerido",
              pattern: {
                value: validacion.rut,
                message: "Ingresa sólo 8 dígitos númericos",
              },
            })}
          />
          {errors.rut ? (
            <span className="lblError">{errors.rut.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Nombre
          <input
            type="text"
            placeholder="Ingrese el nombre del vendedor"
            {...register("nom", { required: "El nombre es requerido" })}
          />
          {errors.nom ? (
            <span className="lblError">{errors.nom.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Apellidos
          <input
            type="text"
            placeholder="Ingrese el apellido del vendedor"
            {...register("lastName", {
              required: "Los apellidos son requeridos",
            })}
          />
          {errors.lastName ? (
            <span className="lblError">{errors.lastName.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Teléfono
          <input
            type="number"
            placeholder="2567890"
            {...register("tel", {
              required: "El teléfono es requerido",
            })}
          />
          {errors.tel ? (
            <span className="lblError">{errors.tel.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="date"
            placeholder="Seleccione una fecha"
            {...register("date", {
              required: "La fecha es un campo requerido",
              pattern: {
                value: validacion.date,
                message: "Selecciona una fecha válida por favor",
              },
            })}
          />
          {errors.date ? (
            <span className="lblError">{errors.date.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="user@gmail.com"
            {...register("email", {
              required: "El email es un campo requerido",
              pattern: {
                value: validacion.email,
                message: "Ingresa un correo válido por favor",
              },
            })}
          />
          {errors.email ? (
            <span className="lblError">{errors.email.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Contraseña
          <input
            type="text"
            placeholder="Ingrese una contraseña"
            {...register("pass1", {
              required: "El password es requerido",
              pattern: {
                value: validacion.password,
                message:
                  "La contraseña debe contener almenos una mayuscula un numero y un caracter especial",
              },
            })}
          />
          {errors.pass1 ? (
            <span className="lblError">{errors.pass1.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Confirmar contraseña
          <input
            type="text"
            placeholder="Ingrese una contraseña"
            {...register("pass2", { required: "El password es requerido" })}
          />
          {errors.pass2 ? (
            <span className="lblError">{errors.pass2.message}</span>
          ) : (
            <></>
          )}
        </label>
        <section>
          <button> Registrarse</button>
        </section>
      </form>
    </section>
  );
};

export default FormRegister;
