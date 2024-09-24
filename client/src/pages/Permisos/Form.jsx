import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { useEffect } from "react";

export function Formulario({ row, closeModal }) {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows, setUser,user } = useAppContext();

  const onSubmit = async (values) => {
    toast("¿Desea guardar los cambios?", {
      action: {
        label: "Guardar",
        onClick: async () => {
          try {
            const response = await axios.put(`/UpdatePermisos/${row.Id}`, {
              ...values,
              IdObjeto: row.IdObjeto,
            });
            let tabla = await axios.get("/GetPermisos");
            tabla.data.map((permiso) => {
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
            setRows(tabla.data);
            toast.success(response.data.message);
            closeModal(false);
            console.log(user);
            const resp2 = await axios.get(`/actualizarPermisos/${user[0][0].Id}`);
            setUser(resp2.data);
          } catch (error) {
            toast.error('Error al guardar los cambios');
            console.log(error);
          }
        },
      },
    });
  };

  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Insercion</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("PermisoInsercion")}>
          {row.PermisoInsercion === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Actualizar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("PermisoActualizar")}>
          {row.PermisoActualizar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Eliminar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("PermisoEliminar")}>
          {row.PermisoEliminar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Permiso Consultar</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("PermisoConsultar")}>
          {row.PermisoConsultar === "SI" ? (
            <>
              <option value={1}>SI</option>
              <option value={0}>NO</option>
            </>
          ) : (
            <>
              <option value={0}>NO</option>
              <option value={1}>SI</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
      <Button variant="success" type="submit" className="w-100 mt-5">
        {row ? "Editar" : "Guardar"}
      </Button>
    </Form>
  );
}
