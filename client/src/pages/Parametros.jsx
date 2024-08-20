import React from "react";
import Tabla from "../components/Mantenimientos/Tabla";
import ModalC from "../components/Mantenimientos/Modal";

const columnas = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Valor", minWidth: 100 },
];

const Parametros = () => {
  return (
    <div className="center w-75">
      <div className="mb-2">
        <ModalC Nombre="Añadir"/>
      </div>
      <Tabla columns={columnas} />
    </div>
  );
};

export default Parametros;
