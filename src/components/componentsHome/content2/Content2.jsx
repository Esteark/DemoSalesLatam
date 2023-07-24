import React from "react";
import "./stylesContent2.scss";
import listadoazul from "../../../assets/img/listadoazul.svg";
import listadoBlanco from "../../../assets/img/listadoBlanco.svg";

const Content2 = () => {
  return (
    <>
      <section className="secContent2">
        <article className="secContent2__text">
          <h2>Content 2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </article>
        <article className="secContent2__img">
          <figure>
            <img src={listadoBlanco} alt="" />
          </figure>
          <figure>
            <img src={listadoazul} alt="" />
          </figure>
          <figure>
            <img src={listadoBlanco} alt="" />
          </figure>
        </article>
      </section>
      <footer></footer>
    </>
  );
};

export default Content2;
