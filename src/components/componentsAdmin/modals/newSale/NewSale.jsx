import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import "./stylesNewSale.scss";

const NewSale = () => {
  return (
    <section className="secModalSale">
      <h3>Registrando la nueva venta</h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="secModalSale__icon"
      >
        <FaShoppingCart />
      </motion.div>
    </section>
  );
};

export default NewSale;
