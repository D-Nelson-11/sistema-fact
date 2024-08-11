import React from "react";
import Tabla from "../components/Mantenimientos/Tabla";
import ModalC from "../components/Mantenimientos/Modal";

const columnas = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Cantidad", minWidth: 100 },
  { id: "code", label: "Precio", minWidth: 100 },
];

const Inventario = () => {
  return (
    <div className="center w-75">
      <div className="mb-2">
        <ModalC Nombre="Crear"/>
      </div>
      <Tabla columns={columnas} />
    </div>
  );
};

export default Inventario;
