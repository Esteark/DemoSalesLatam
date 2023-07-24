import React, { useContext } from "react";
import { AppContext } from "../../../../router/Routers";
import "./stylesModalppal.scss";
import { motion } from "framer-motion";
import NewClient from "../newClient/NewClient";
import NewSale from "../newSale/NewSale";
import ModalDetails from "../modalDetails/ModalDetails";

const Modalppal = ({ op }) => {
  const { isOpen } = useContext(AppContext);
  //animacion para el modal
  const modalVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };
  return (
    <motion.div
      className="secModal"
      variants={modalVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
    >
      {op.op === 0 ? (
        <NewClient />
      ) : op.op === 1 ? (
        <NewSale />
      ) : (
        <ModalDetails />
      )}
    </motion.div>
  );
};

export default Modalppal;
