import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const columnas = [
  { id: "Descripcion", label: "Descripcion", minWidth: 170 },
  { id: "Valor", label: "Valor", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Parametros = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

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

  const filteredData = rows.filter(
    (item) =>
      item.Descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Valor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{width:"90%", margin:'auto'}}>
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        titulo={"Parámetros"}
        permisoConsulta={user[1]?.some((permiso)=> permiso.IdObjeto == 1 && permiso.PermisoConsultar ==1)}
        permisoActualizar={user[1]?.some((permiso)=> permiso.IdObjeto == 1 && permiso.PermisoActualizar == 1)}
      />
    </div>
  );
};

export default Parametros;
