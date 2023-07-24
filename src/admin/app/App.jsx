import React, { useContext, useEffect } from "react";
import "./stylesApp.scss";
import MenuAdmin from "../../components/componentsAdmin/menuAdmin/MenuAdmin";
import Sales from "../sales/Sales";
import { AppContext } from "../../router/Routers";
import { useNavigate } from "react-router-dom";
import Modalppal from "../../components/componentsAdmin/modals/modalppal/Modalppal";
import DetailSales from "../detailSales/DetailSales";

const App = () => {
  const { sesion, propsModal, viewDetail } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.entries(sesion).length <= 0) {
      navigate("/login");
    }
  }, []);
  return (
    <section className="secApp">
      <Modalppal op={propsModal} />
      <MenuAdmin />
      {!viewDetail ? <Sales /> : <DetailSales />}
    </section>
  );
};

export default App;
