import React from "react";
import "./stylesSales.scss";
import iconSale from "../../assets/img/women.svg";
import FormSales from "../../components/componentsAdmin/formSales/FormSales";

const Sales = () => {
  return (
    <section className="secSale">
      <article className="secSale__header">
        <figure>
          <img src={iconSale} alt="" />
        </figure>
        <div className="texts">
          <h2>New Sale</h2>
          <div></div>
        </div>
      </article>
      <FormSales />
    </section>
  );
};

export default Sales;
