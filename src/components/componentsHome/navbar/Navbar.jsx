import React, { useContext, useEffect } from "react";
import "./stylesNavabar.scss";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../../../router/Routers";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { showMenu, setShowMenu, handleScroll, width, setSecNav, sesion } =
    useContext(AppContext);
  const navigate = useNavigate();

  // UseEffect que se ejecutará cada vez que el usuario realice un scroll en la página
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className="navbar" id="menuScroll">
      <section className="navbar__icon">
        {showMenu == true ? (
          <IoMdClose
            className={`iconMenu ${showMenu ? " rotate-in-center" : ""}`}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            id="icon"
          />
        ) : (
          <HiOutlineMenu
            className={` ${showMenu ? "" : "fade-in"}`}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            id="icon"
          />
        )}
      </section>
      <ul
        className={`${
          width <= 768
            ? showMenu
              ? "scale-in-hor-center "
              : "scale-out-horizontal"
            : ""
        }`}
      >
        <li
          onClick={() => {
            setSecNav("content1");
            setShowMenu(!showMenu);
          }}
        >
          Content 1
        </li>
        <li
          onClick={() => {
            setSecNav("content2");
            setShowMenu(!showMenu);
          }}
        >
          Content 2
        </li>
        <li
          onClick={() => {
            if (sesion.isActive) {
              navigate("/admin");
            } else {
              navigate("/login");
            }
          }}
        >
          Login
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
