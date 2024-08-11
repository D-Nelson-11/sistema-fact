import React from "react";
import Tabla from "../components/Mantenimientos/Tabla";
import ModalC from "../components/Mantenimientos/Modal";

const columnas = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "cantidad", label: "Cantidad", minWidth: 100 },
    { id: "precio", label: "Precio", minWidth: 100 },
    { id: "total", label: "Total", minWidth: 100 },
  ];

function Factura() {
  return (
    <div className="center w-75">
      <div className="mb-2">
        <ModalC Nombre="Crear" />
      </div>
      <Tabla columns={columnas} />
    </div>
  );
}

export default Factura;
