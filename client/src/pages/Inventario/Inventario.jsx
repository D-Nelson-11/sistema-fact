import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import ModalC from "../../components/Mantenimientos/Modal";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const columnas = [
  { id: "Codigo", label: "Código", minWidth: 170 },
  { id: "Descripcion", label: "Nombre", minWidth: 100 },
  { id: "Existencia", label: "Cantidad", minWidth: 100 },
  { id: "Precio", label: "Precio", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Inventario = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getData() {
    try {
      const response = await axios.get("/GetInventario");
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Inventario";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteRequest = async (id) => {
    try {
      let tabla = rows.filter((data) => {
        return data.IdActividadProduccion !== id;
      });
      const resp = axios.delete(`/DeleteInventario/${id}`);
      setRows(tabla);
      toast.success("Registro eliminado con éxito");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows.filter(
    (item) =>
      item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-75">
      <Tabla
        columns={columnas}
        rows={rows}
        modalBtnValue="Agregar"
        formulario={Formulario}
        filteredData={filteredData}
        deleteRequest={deleteRequest}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Inventario;
