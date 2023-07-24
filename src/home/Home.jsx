import React, { useContext, useEffect, useRef } from "react";
import "./stylesHome.scss";
import Navbar from "../components/componentsHome/navbar/Navbar";
import Header from "../components/componentsHome/header/Header";
import Content1 from "../components/componentsHome/content1/Content1";
import Content2 from "../components/componentsHome/content2/Content2";
import { AppContext } from "../router/Routers";
import ButtonToTop from "../components/componentsHome/buttonToTop/ButtonToTop";

const Home = () => {
  const content = useRef(null);
  const content2 = useRef(null);

  const { handleSetActiveSection, secNav, setSecNav } = useContext(AppContext);

  useEffect(() => {
    handleSetActiveSection(secNav, content, content2);
  }, [secNav]);
  // Este useEffect Detecta si el usuario realizo la acción de scroll, si la hizo reinicia nuevamente la referencia para la navegación
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setSecNav("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className="secHome">
      <Navbar />
      <Header />
      <div ref={content}>
        <Content1 />
      </div>
      <div ref={content2}>
        <Content2 />
      </div>
      <ButtonToTop />
    </main>
  );
};

export default Home;
