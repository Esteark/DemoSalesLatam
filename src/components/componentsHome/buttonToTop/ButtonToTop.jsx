import React, { useContext, useEffect, useState } from "react";
import { PiCaretDoubleUpBold } from "react-icons/pi";
import "./stylesButton.scss";

import { AppContext } from "../../../router/Routers";

const ButtonToTop = () => {
  const { scrollToTop, width } = useContext(AppContext);
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (parseInt(window.scrollY) >= 2000 && width <= 768) {
      setShowButton(true);
    } else if (parseInt(window.scrollY) >= 1200 && width > 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  //UseEffect Para detectar el scroll del usuario
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PiCaretDoubleUpBold
      className={`iconFloat ${
        showButton ? "slide-in-right" : "slide-out-right"
      }`}
      onClick={() => {
        scrollToTop();
      }}
    />
  );
};

export default ButtonToTop;
