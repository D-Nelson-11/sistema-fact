import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const columnas = [
  { id: "Rol", label: "Rol", minWidth: 170 },
  { id: "Objeto", label: "Pantalla", minWidth: 100 },
  { id: "PermisoInsercion", label: "Ingresar", minWidth: 100 },
  { id: "PermisoActualizar", label: "Actualizar", minWidth: 100 },
  { id: "PermisoEliminar", label: "Eliminar", minWidth: 100 },
  { id: "PermisoConsultar", label: "Consultar", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Permisos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/GetPermisos");
      response.data.map((permiso) => {
        if (permiso.PermisoInsercion == 0) {
          permiso.PermisoInsercion = "NO";
        } else {
          permiso.PermisoInsercion = "SI";
        }

        if (permiso.PermisoActualizar == 0) {
          permiso.PermisoActualizar = "NO";
        } else {
          permiso.PermisoActualizar = "SI";
        }

        if (permiso.PermisoEliminar == 0) {
          permiso.PermisoEliminar = "NO";
        } else {
          permiso.PermisoEliminar = "SI";
        }

        if (permiso.PermisoConsultar == 0) {
          permiso.PermisoConsultar = "NO";
        } else {
          permiso.PermisoConsultar = "SI";
        }
      });
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Permisos";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = rows.filter(
    (item) =>
      item.Objeto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Rol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-75">
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        permisoConsulta={user[1]?.some((permiso)=> permiso.IdObjeto == 4 && permiso.PermisoConsultar ==1)}
        permisoActualizar={user[1]?.some((permiso)=> permiso.IdObjeto == 4 && permiso.PermisoActualizar == 1)}
      />
    </div>
  );
};

export default Permisos;
