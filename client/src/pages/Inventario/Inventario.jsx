import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { Formulario } from "./Form";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "N", label: "Item N°", minWidth: 100, align: "center" },
  { id: "Codigo", label: "Código", minWidth: 170 },
  { id: "Descripcion", label: "Nombre", minWidth: 300 },
  { id: "Existencia", label: "Cantidad", minWidth: 100, align: "center" },
  { id: "Precio", label: "Precio", minWidth: 100 , align: "center"},
  { id: "Acciones", label: "Acciones", minWidth: 250 },
];

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setRows, rows, user } = useAppContext();

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
      const resp = await axios.delete(`/DeleteInventario/${id}`);
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
    <div style={{width:"80%", margin:'auto'}}>
      <Tabla
        columns={columnas}
        rows={rows}
        formulario={Formulario}
        filteredData={filteredData}
        deleteRequest={deleteRequest}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
        titulo={"INVENTARIO EN TIENDA"}
        modalBtnValue={
          user[1]?.some(
            (permiso) => permiso.IdObjeto == 2 && permiso.PermisoInsercion == 1
          )
            ? "AGREGAR NUEVO PRODUCTO"
            : null
        }
        permisoConsulta={user[1]?.some(
          (permiso) => permiso.IdObjeto == 2 && permiso.PermisoConsultar == 1
        )}
        permisoActualizar={user[1]?.some(
          (permiso) => permiso.IdObjeto == 2 && permiso.PermisoActualizar == 1
        )}
        permisoEliminar={user[1]?.some(
          (permiso) => permiso.IdObjeto == 2 && permiso.PermisoEliminar == 1
        )}
      />
    </div>
  );
};

export default Inventario;
