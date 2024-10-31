import React from "react";
import Tabla from "../../components/Mantenimientos/Tabla";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
const columnas = [
  { id: "Accion", label: "Nombre", minWidth: 100 },
];

const Bitacora = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {setRows,rows,user} = useAppContext();

  async function getData() {
    try {
      const response = await axios.get("/getBitacora");
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Bitácora";
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

//   const deleteRequest = async (id) => {
//     try {
//       let tabla = rows.filter((data) => {
//         return data.Id !== id;
//       });
//       const resp =  await axios.delete(`/deleteUsuario/${id}`);
//       setRows(tabla);
//       toast.success(resp.data.message);
//     } catch (error) {
//       toast.error(error.response.data);
//     }
//   };

  const filteredData = rows?.filter(
    (item) =>
      item.Accion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="center w-75">
      <Tabla
        columns={columnas}
        rows={rows}
        titulo={"Bitácora"}
        filteredData={filteredData}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Bitacora;
