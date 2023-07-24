import React, { useContext } from "react";
import { GoHome } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineFolder } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import "./stylesMenuAdmin.scss";
import { AppContext } from "../../../router/Routers";
import Swal from "sweetalert2";
import { logOutUser } from "../../../services/infoLocal";
import { useNavigate } from "react-router-dom";

const MenuAdmin = () => {
  const { showMenu, setSesion } = useContext(AppContext);
  const navigate = useNavigate();
  const closeSesion = () => {
    Swal.fire({
      title: "Adiós vendedor nos veremos pronto!",
      text: "¿Quieres cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#279aff",
      cancelButtonColor: "#192843",
      confirmButtonText: "Si, Adiós!",
      cancelButtonText: "No, quiero quedarme",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Hasta pronto!",
          showConfirmButton: false,
          timer: 1500,
        });

        logOutUser();
        setSesion({});
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };
  return (
    <nav className="navAdmin">
      <section className="navAdmin__icons">
        <GoHome className="icon" />
        <CiStar className="icon" />
        <MdContentCopy className="icon" />
        <AiOutlineFolder className="icon" />
        <HiOutlineUser
          className="icon"
          onClick={() => {
            closeSesion();
          }}
        />
      </section>
    </nav>
  );
};

export default MenuAdmin;
