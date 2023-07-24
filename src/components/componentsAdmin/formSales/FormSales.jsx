import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import "./stylesFormSales.scss";
import Detail from "../detail/Detail";
import { getClients } from "../../../services/clientsActions";
import { AppContext } from "../../../router/Routers";
import { getBranches } from "../../../services/branchActions";
import { getProductsFiltered } from "../../../services/productsActions";
import { Toaster, toast } from "react-hot-toast";
import useValidate from "../../../hooks/UseValidate";
import Swal from "sweetalert2";
import { addSale } from "../../../services/salesAction";
import { useNavigate } from "react-router-dom";

const FormSales = () => {
  //Estados para el cliente

  const [clientsFilter, setClientsFilter] = useState([]);
  const [client, setClient] = useState("");
  //Estados para las sucursales
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [currency, setCurrency] = useState("");
  //Estado para los productos
  const [products, setProducts] = useState([]);
  //Estado para los detalles
  const [details, setDetails] = useState([]);
  //Estado para el total
  const [total, setTotal] = useState(0);

  const validateHook = useValidate();
  const navigate = useNavigate();

  const {
    width,
    formatterPeso,
    setFormatterPeso,
    setIsOpen,
    isOpen,
    setPropsModal,
    clients,
    setClients,
    viewDetail,
    setViewDetail,
  } = useContext(AppContext);

  // UseEffect Para obtener los clientes
  useEffect(() => {
    getClients()
      .then((res) => {
        setClients([...res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // UseEffect Para obtener las sucursales
  useEffect(() => {
    getBranches()
      .then((res) => {
        setBranches([...res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // UseEffect para controlar el tamaño de la  lista desplegable
  useEffect(() => {
    const buscador = document.querySelector(".secBuscador");
    const inputClient = document.getElementById("inputClient");
    buscador.style.width = inputClient.clientWidth + "px";
  }, [width]);

  //UseEffect que me sirve para calcular el total de la venta
  useEffect(() => {
    let total = 0;
    details.map((item) => {
      total += Number(item.subtotal);
    });
    setTotal(total);
  }, [details]);

  //Cuando se cambie el currency cambie el formato de moneda
  useEffect(() => {
    let peso = {
      formato: "",
      currency: "",
    };
    switch (currency) {
      case "MXN":
        peso.formato = "es-MX";
        peso.currency = "MXN";
        break;

      case "BRL":
        peso.formato = "pt-BR";
        peso.currency = "BRL";
        break;
      case "ARS":
        peso.formato = "es-AR";
        peso.currency = "ARS";
        break;
      case "COP":
        peso.formato = "es-CO";
        peso.currency = "COP";
        break;
      case "CLP":
        peso.formato = "es-CL";
        peso.currency = "CLP";
        break;
      case "PEN":
        peso.formato = "es-PE";
        peso.currency = "PEN";
        break;

      case "VES":
        peso.formato = "es-VE";
        peso.currency = "VES";
        break;
      case "USD":
        peso.formato = "es";
        peso.currency = "USD";
        break;
      case "UYU":
        peso.formato = "es-UY";
        peso.currency = "UYU";
        break;
      case "PYG":
        peso.formato = "es-PY";
        peso.currency = "PYG";
        break;
      default:
        peso.formato = "es-CO";
        peso.currency = "COP";
        break;
    }

    const formato = new Intl.NumberFormat(peso.formato, {
      style: "currency",
      currency: peso.currency,
      minimumFractionDigits: 0,
    });
    setFormatterPeso(formato);
  }, [currency]);

  //Filtrado de clientes
  const filterClients = (id) => {
    if (Array.isArray(clients) && clients.length > 0) {
      const copyclients = [...clients];

      const clientFilter = copyclients.filter((client) =>
        client.idCli.includes(id)
      );

      setClientsFilter(clientFilter);
    }
  };
  //Agregar nuevo detalle
  const newDetail = () => {
    const newDetail = {
      nameProduct: products[0].nom,
      quantity: 0,
      price: products[0].price,
      subtotal: 0,
    };
    setDetails([...details, newDetail]);
  };

  // Funcion que se ejecuta cuando el usuario cambia de sucursal
  const handleChange = (e) => {
    setBranch(e.target.value);
    if (branches.length) {
      const countries = [...branches];
      const country = countries.find((pais) => pais.country === e.target.value);
      setCurrency(country.currency);
      getProductsFiltered(country.id)
        .then((res) => {
          setProducts([...res]);
        })
        .catch((error) => {
          console.log(error);
        });

      setDetails([]);
    }
  };

  // funcion para verificar si se abre el modal para ingresar un nuevo cliente o no
  const modalValidate = () => {
    const filterClient = clients.find((cliente) => cliente.idCli === client);
    if (filterClient !== undefined) {
      toast.error(
        "La identificación de este cliente ya se encuentra registrada"
      );
    } else {
      if (!validateHook.idCli.test(client)) {
        toast.error(
          "Para registrar el cliente, se necesita una identificación de solo 10 dígitos."
        );
      } else {
        setPropsModal({ op: 0, otherProps: client });
        setIsOpen(!isOpen);
      }
    }
  };
  // función que retorna un true si todos los campos se encuentran perfectamente valiados y me retorna un false si hay alguna incosistencia con los datos
  const validate = (venta) => {
    if (venta.client) {
      const copyclients = [...clients];
      const filterclient = copyclients.find(
        (client) => client.idCli === venta.client
      );

      if (filterclient !== undefined) {
        if (venta.branch) {
          if (Array.isArray(venta.details) && venta.details.length > 0) {
            const detailFilter = venta.details.filter(
              (detail) =>
                detail.quantity === 0 ||
                detail.quantity === "" ||
                typeof detail.quantity === undefined
            );
            if (detailFilter.length <= 0) {
              return true;
            } else {
              toast.error(
                "No deben de haber cantidades en cero o nulas en los detalles, Revisa por favor esta información"
              );
              return false;
            }
          } else {
            toast.error(
              "Ingresa detalles de la venta para poder guardarla por favor"
            );
            return false;
          }
        } else {
          toast.error("Selecciona una oficina para poder registrar la venta");
          return false;
        }
      } else {
        toast.error(
          "Registra la identificación del cliente primero, para poder guardar la venta por favor"
        );
        return false;
      }
    } else {
      toast.error(
        "Ingresa la identificación de un cliente para poder  registrar la venta por favor"
      );
      return false;
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const newSale = {
      client,
      details,
      branch,
      total,
      currency,
    };
    if (validate(newSale)) {
      const response = await addSale(newSale);
      setIsOpen(!isOpen);
      if (response) {
        setClient("");
        setDetails([]);
        setBranch(""), setTotal(0);
        setPropsModal({ op: 1, otherProps: "" });
        setTimeout(() => {
          setIsOpen(false);
          Swal.fire({
            title: "Venta Registrada!",
            text: "¿Quieres seguir ingresando ventas?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#279aff",
            cancelButtonColor: "#192843",
            confirmButtonText: "Volver al inicio",
            cancelButtonText: "Continuar registrando",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }, 2000);
      } else {
        toast.error("Ocurrió un error al intentar procesar la solicitud");
      }
    }
  };

  return (
    <>
      <form className="form" onSubmit={onSubmitForm}>
        <label className="form__label">
          Document
          <hr />
        </label>
        <section className="form__sec1">
          <label className="secInput">
            Client
            <div>
              <section className="inputClient">
                <input
                  type="number"
                  className="input"
                  value={client}
                  onChange={(e) => {
                    setClient(e.target.value);
                    filterClients(e.target.value);
                  }}
                  id="inputClient"
                  placeholder="1238564098"
                />
                <div
                  className={`secBuscador ${
                    Array.isArray(clientsFilter) && clientsFilter.length > 0
                      ? ""
                      : "hidden"
                  }`}
                >
                  {Array.isArray(clientsFilter) && clientsFilter.length > 0 ? (
                    clientsFilter.map((item, index) => (
                      <h3
                        key={index}
                        onClick={() => {
                          setClient(item.idCli);
                          setClientsFilter([]);
                        }}
                      >
                        {item.idCli}
                      </h3>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </section>
              <GoPlus
                className="iconPlus"
                onClick={() => {
                  modalValidate();
                }}
              />
            </div>
          </label>
          <label className="secInput">
            Branch Office
            <select className="input" onChange={handleChange}>
              {branches.length ? (
                branches.map((item, index) => (
                  <option value={item.country} key={index}>
                    {item.country}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </label>
          <label className="secInput">
            Currency
            <input
              type="text"
              className="input"
              value={currency}
              readOnly={true}
            />
          </label>
        </section>
        <label className="form__label">
          Details
          <hr />
        </label>
        <section className="form__sec2">
          <article className="header">
            <h3>Name</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
            <h3>Subtotal</h3>
          </article>
          <article className="details">
            {Array.isArray(details) && details.length > 0 ? (
              details.map((detail, index) => (
                <Detail
                  products={products}
                  detail={detail}
                  details={details}
                  key={index}
                  idDetail={index}
                  setDetails={setDetails}
                />
              ))
            ) : (
              <p>
                Selecciona primero una oficina y presiona el botón "Add" para
                poder agregar detalles a la venta
              </p>
            )}
          </article>
        </section>
        <section className="form__sec3">
          <div
            className="button"
            onClick={() => {
              newDetail();
            }}
          >
            Add
          </div>
        </section>
        <section className="form__sec4">
          <h3>Total</h3>
          <div className="total">
            {typeof total === "number" && total > 0
              ? formatterPeso.format(total)
              : 0}
          </div>
        </section>
        <hr />
        <section className="form__sec5">
          <div
            className=" buttonDetail"
            onClick={() => {
              setViewDetail(!viewDetail);
            }}
          >
            Ver detalle de ventas
          </div>
          <button className="button">Save</button>
        </section>
        <Toaster />
      </form>
    </>
  );
};

export default FormSales;
