import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import App from "../admin/app/App";
import FormLogin from "../admin/formAdmin/formLogin/FormLogin";
import FormRegister from "../admin/formAdmin/formRegister/FormRegister";
import { getSesionUser } from "../services/infoLocal";
export const AppContext = createContext({});
const Routers = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [propsModal, setPropsModal] = useState({});
  const [sesion, setSesion] = useState(getSesionUser());
  const [width, setwidth] = useState(window.innerWidth);
  const [clients, setClients] = useState([]);

  // Funcion que me servirá para colocar unas clases para cuando el usuario haga scroll y retirarlas cuando el usuario regrese al top de la pagina
  const handleScroll = () => {
    const menu = document.getElementById("menuScroll");
    const iconMenu = document.getElementById("icon");

    if (window.scrollY > menu.offsetHeight) {
      menu.classList.add("menuBackgroundScroll");
      iconMenu.classList.add("iconMenu");
    } else {
      menu.classList.remove("menuBackgroundScroll");
      iconMenu.classList.remove("iconMenu");
    }
  };
  // Esta función me sirve para realizar un scroll suave cuando el usuario de clic en el menu y se mueva automáticamente a dicha sección
  const [secNav, setSecNav] = useState("");
  const handleSetActiveSection = (section, ref1, ref2) => {
    if (section === "content1") {
      ref1.current.scrollIntoView({ behavior: "smooth" });
    } else if (section == "content2") {
      ref2.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // esta funcion me mueve para el incio de la página suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Estado para realizar un formato de moneda
  const [formatterPeso, setFormatterPeso] = useState();

  // Use efeect que me sirve para detectar el tamaño de la pantalla
  useEffect(() => {
    const resizeScreen = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  });
  return (
    <AppContext.Provider
      value={{
        showMenu,
        setShowMenu,
        isOpen,
        propsModal,
        setPropsModal,
        setIsOpen,
        handleScroll,
        width,
        handleSetActiveSection,
        setSecNav,
        secNav,
        scrollToTop,
        sesion,
        setSesion,
        formatterPeso,
        setFormatterPeso,
        clients,
        setClients,
        viewDetail,
        setViewDetail,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<App />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Routers;
