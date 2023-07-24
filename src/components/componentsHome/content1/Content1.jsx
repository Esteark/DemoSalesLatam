import React from "react";
import "./stylesContent1.scss";
import img from "../../../assets/img/imagenCuadro.svg";

const Content1 = () => {
  return (
    <section className="secContent1">
      <article className="secContent1__text">
        <h2>Content 1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </article>
      <article className="secContent1__galery">
        {[...Array(4)].map((_, index) => (
          <figure key={index}>
            <img src={img} alt="" />
            <figcaption>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </figcaption>
          </figure>
        ))}
      </article>
    </section>
  );
};

export default Content1;
