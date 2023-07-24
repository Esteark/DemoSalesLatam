import React, { useContext } from "react";
import "./stylesModalDetails.scss";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../../../../router/Routers";

const ModalDetails = () => {
  const { isOpen, setIsOpen, propsModal } = useContext(AppContext);
  return (
    <section className="secModalDetail">
      <article className="secModalDetail__sec1">
        <IoMdClose
          className="iconCloseModal"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </article>
      <article className="secModalDetail__sec2">
        {Array.isArray(propsModal.otherProps) &&
        propsModal.otherProps.length > 0 ? (
          propsModal.otherProps[0].map((item, index) => (
            <section key={index}>
              <h3>
                <span>Producto: </span>
                {item.nameProduct}
              </h3>
              <h3>
                <span>Cantidad: </span>
                {item.quantity}
              </h3>
              <h3>
                <span>Precio: </span>
                {item.price}
              </h3>
              <h3>
                <span>Subtotal: </span>
                {item.subtotal}
              </h3>
            </section>
          ))
        ) : (
          <h3>Sin detalles</h3>
        )}
      </article>
      <article className="secModalDetail__sec3">
        <h3>
          <span>Total: </span>
          {propsModal?.otherProps?.[1]}
        </h3>
      </article>
    </section>
  );
};

export default ModalDetails;
