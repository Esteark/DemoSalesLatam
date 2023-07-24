import React from "react";
import "./stylesDetailSales.scss";
import iconSale from "../../assets/img/women.svg";
import DetalleSale from "../../components/componentsAdmin/detailSales/DetalleSale";

const DetailSales = () => {
  return (
    <section className="secSale">
      <article className="secSale__header">
        <figure>
          <img src={iconSale} alt="" />
        </figure>
        <div className="texts">
          <h2>Details Sales</h2>
          <div></div>
        </div>
      </article>
      <DetalleSale />
    </section>
  );
};

export default DetailSales;
