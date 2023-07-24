import React, { useContext } from "react";
import { AppContext } from "../../../../router/Routers";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";
import "./stylesNewclient.scss";
import { addClient, getClients } from "../../../../services/clientsActions";

const NewClient = () => {
  const { isOpen, setIsOpen, propsModal, setClients } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = async (data) => {
    const response = await addClient(data);
    if (response) {
      toast.success("Cliente registrado satisfactoriamente");
      setIsOpen(!isOpen);
      reset();
      getClients()
        .then((res) => {
          setClients([...res]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("Ocurrió un error al intentar procesar la solicitud");
    }
  };
  return (
    <section className="secModalClient">
      <Toaster />
      <article className="secModalClient__sec1">
        <IoMdClose
          className="iconCloseModal"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </article>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="secModalClient__sec2"
      >
        <label>
          Identificación del cliente
          <input
            type="number"
            placeholder="Ingrese la identificación del cliente"
            {...register("idCli", {
              required: "la identificación es requerida",
            })}
            value={propsModal.otherProps}
            readOnly
          />
          {errors.idCli ? (
            <span className="lblError">{errors.idCli.message}</span>
          ) : (
            <></>
          )}
        </label>
        <label>
          Nombre
          <input
            type="text"
            placeholder="Ingrese el nombre del cliente"
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
            placeholder="Ingrese el apellido del cliente"
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
          Dirección
          <input
            type="text"
            placeholder="Cra 46-78 403"
            {...register("address", {
              required: "La dirección es requerida",
            })}
          />
          {errors.address ? (
            <span className="lblError">{errors.address.message}</span>
          ) : (
            <></>
          )}
        </label>
        <section>
          <button className="button"> Registrar cliente</button>
        </section>
      </form>
    </section>
  );
};

export default NewClient;
