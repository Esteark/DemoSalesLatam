import React, { useContext } from "react";
import "./stylesHeader.scss";
import header from "../../../assets/img/header.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../router/Routers";

const Header = () => {
  const { sesion } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <header className="secHeader">
      <section className="secHeader__sec1">
        <h1>
          Lorem ipsum <br /> Design
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <button
          onClick={() => {
            if (sesion.isActive) {
              navigate("/admin");
            } else {
              navigate("/login");
            }
          }}
        >
          login
        </button>
      </section>
      <section className="secHeader__sec2">
        <img src={header} alt="" />
      </section>
    </header>
  );
};

export default Header;
