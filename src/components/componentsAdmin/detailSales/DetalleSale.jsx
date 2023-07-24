import React, { useContext, useEffect, useState } from "react";
import "./styleDetalleSales.scss";
import { getSales } from "../../../services/salesAction";
import { AppContext } from "../../../router/Routers";
import { AiOutlineFileSearch } from "react-icons/ai";

const DetalleSale = () => {
  const { setViewDetail, viewDetail, setPropsModal, isOpen, setIsOpen } =
    useContext(AppContext);
  const [sales, setSales] = useState([]);
  useEffect(() => {
    getSales()
      .then((res) => {
        setSales([...res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <section className="secTableDetails">
      <article className="secTableDetails__header">
        <h3>Id Cliente</h3>
        <h3>Branch</h3>
        <h3>Currency</h3>
        <h3>Details</h3>
      </article>
      <article className="secTableDetails__data">
        {Array.isArray(sales) && sales.length > 0 ? (
          sales.map((item, index) => (
            <section key={index}>
              <h3>
                <span>Id Cliente: </span> {item.client}
              </h3>
              <h3>
                <span>Branch: </span>
                {item.branch}
              </h3>
              <h3>
                <span>Currency: </span>
                {item.currency}
              </h3>
              <AiOutlineFileSearch
                className="icon"
                onClick={() => {
                  setPropsModal({
                    op: 2,
                    otherProps: [item.details, item.total],
                  });
                  setIsOpen(!isOpen);
                }}
              />
            </section>
          ))
        ) : (
          <h3>Sin detallles de ventas</h3>
        )}
      </article>
      <hr />
      <article className="secTableDetails__actions">
        <div
          className=" buttonDetail"
          onClick={() => {
            setViewDetail(!viewDetail);
          }}
        >
          Regresar
        </div>
      </article>
    </section>
  );
};

export default DetalleSale;
