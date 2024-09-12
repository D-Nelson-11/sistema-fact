import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const columnas = [
  { id: "Descripcion", label: "Descripcion", minWidth: 170 },
  { id: "Valor", label: "Valor", minWidth: 100 },
];

const Parametros = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/GetParametros");
      console.log(response.data);
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Parámetros";
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
      const resp = axios.delete(`/DeleteParametro/${id}`);
      setRows(tabla);
      toast.success("Registro eliminado con éxito");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows.filter(
    (item) =>
      item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Valor.toLowerCase().includes(searchTerm.toLowerCase())
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

export default Parametros;
