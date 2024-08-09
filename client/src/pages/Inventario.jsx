import React from "react";
import Tabla from "../components/Mantenimientos/Tabla";
import ModalC from "../components/Mantenimientos/Modal";

const Inventario = () => {
  return (
    <div className="Inventario w-75">
      <div className="mb-2">
        <ModalC Nombre="Crear"/>
      </div>
      <Tabla />
    </div>
  );
};

export default Inventario;
