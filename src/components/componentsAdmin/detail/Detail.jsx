import React, { useContext, useEffect, useState } from "react";
import "./stylesDetail.scss";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../../../router/Routers";

const Detail = ({ products, detail, details, idDetail, setDetails }) => {
  const { formatterPeso } = useContext(AppContext);
  //Cuando el usuario selecciona un producto de la lista
  const handleChange = (e) => {
    const copyProducts = [...products];
    const filterProduct = copyProducts.find(
      (item) => item.nom === e.target.value
    );
    const copyDetails = [...details];
    copyDetails[idDetail].nameProduct = e.target.value;
    copyDetails[idDetail].price = filterProduct.price;
    copyDetails[idDetail].subtotal = detail.quantity * filterProduct.price;
    setDetails(copyDetails);
  };
  //Cuando el usuario va a eliminar un detalle
  const deleteDetail = () => {
    const copyDetails = [...details];
    copyDetails.splice(idDetail, 1);
    setDetails(copyDetails);
  };

  // Si hay un cambio en la cantidad , este UseEffect me permite hacer la actualización en el array de detalles
  useEffect(() => {
    const copyDetails = [...details];
    copyDetails[idDetail].subtotal = detail.quantity * detail.price;
    copyDetails[idDetail].quantity = detail.quantity;
    setDetails(copyDetails);
  }, [detail.quantity]);

  return (
    <section className="secDetail">
      <article className="secDetail__inputs">
        <label className="secInput">
          <h3>Name</h3>
          <select
            className="input"
            onChange={handleChange}
            value={detail.nameProduct}
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <option value={product.name} key={index}>
                  {product.nom}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </label>
        <label className="secInput">
          <h3>Quantity</h3>
          <input
            type="number"
            className="input"
            value={detail.quantity}
            onChange={(e) => {
              const copyDetails = [...details];
              copyDetails[idDetail].quantity = Number(e.target.value);
              setDetails(copyDetails);
            }}
            style={{
              outline: `${detail.quantity === 0 ? "solid #192843" : "none"}`,
            }}
          />
        </label>
        <label className="secInput">
          <h3>price</h3>
          <input
            type="text"
            className="input"
            value={detail.price}
            readOnly={true}
          />
        </label>
        <label className="secInput">
          <h3>Subtotal</h3>
          <input
            type="text"
            className="input"
            value={formatterPeso.format(detail.subtotal)}
            readOnly={true}
          />
        </label>
        <IoMdClose
          className="iconClose"
          onClick={() => {
            deleteDetail();
          }}
        />
      </article>
    </section>
  );
};

export default Detail;
