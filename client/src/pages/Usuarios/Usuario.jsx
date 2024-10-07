import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "Codigo", label: "Código", minWidth: 170 },
  { id: "Descripcion", label: "Nombre", minWidth: 100 },
  { id: "Existencia", label: "Cantidad", minWidth: 100 },
  { id: "Precio", label: "Precio", minWidth: 100 },
  { id: "Acciones", label: "Acciones", minWidth: 100 },
];

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/GetInventario");
      setRows(response.data);
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
        return data.Id !== id;
      });
      const resp =  await axios.delete(`/DeleteInventario/${id}`);
      setRows(tabla);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const filteredData = rows?.filter(
    (item) =>
      item.Descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-75">
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        deleteRequest={deleteRequest}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        modalBtnValue={user[1]?.some((permiso)=> permiso.IdObjeto == 2 && permiso.PermisoInsercion == 1) ? "Nuevo" : null}
        permisoConsulta={user[1]?.some((permiso)=> permiso.IdObjeto == 2 && permiso.PermisoConsultar ==1)}
        permisoActualizar={user[1]?.some((permiso)=> permiso.IdObjeto == 2 && permiso.PermisoActualizar == 1)}
        permisoEliminar={user[1]?.some((permiso)=> permiso.IdObjeto == 2 && permiso.PermisoEliminar == 1)}
      />
    </div>
  );
};

export default Usuarios;
