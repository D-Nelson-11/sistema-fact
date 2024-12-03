import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { set } from "react-hook-form";
const columnas = [
  { id: "Rol", label: "Rol", minWidth: 170 },
  { id: "Descripcion", label: "Descripcion", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Rol = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getRoles");
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Roles";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteRequest = async (id) => {
    try {
      
      const resp =  await axios.delete(`/DeleteRol/${id}`);
      let tabla = rows.filter((data) => {
        return data.Id !== id;
      });
      setRows(tabla);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error("Este rol puede ser eliminado porque alguien lo tiene asignado");
      // toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.Descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Rol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{width:"90%", margin:'auto'}}>
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        deleteRequest={deleteRequest}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        titulo = {"Roles"}
        modalBtnValue={user[1]?.some((permiso)=> permiso.IdObjeto == 5 && permiso.PermisoInsercion == 1) ? "Nuevo" : null}
        permisoConsulta={user[1]?.some((permiso)=> permiso.IdObjeto == 5 && permiso.PermisoConsultar ==1)}
        permisoActualizar={user[1]?.some((permiso)=> permiso.IdObjeto == 5 && permiso.PermisoActualizar == 1)}
        permisoEliminar={user[1]?.some((permiso)=> permiso.IdObjeto == 5 && permiso.PermisoEliminar == 1)}

      />
    </div>
  );
};

export default Rol;
