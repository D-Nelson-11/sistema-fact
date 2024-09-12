import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

export const Formulario = ({ row,closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows } = useAppContext();

  useEffect(() => {
    if (row) {
      setValue("Codigo", row.Codigo);
      setValue("Descripcion", row.Descripcion);
      setValue("Cantidad", row.Cantidad);
      setValue("Precio", row.Precio);
      console.log(row);
    } else {
      console.log("No hay datos");
    }
  }, []);
  async function submit(values) {
    try {
      if (row) {
        const response = await axios.put(`/UpdateInventario/${row.Id}`, values);
        closeModal(false);

        const newRows = await axios.get("/GetInventario");
        setRows(newRows.data);
      } else {
        const response = await axios.post("/AddInventario", values);
        closeModal(false);
      }
    } catch (error) {
      alert("Error al guardar");
      console.error(error);
    }
  }
  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Código</Form.Label>
        <Form.Control
          type="text"
          placeholder="Código"
          autoFocus
          {...register("Codigo", { required: true })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Descripcion"
          {...register("Descripcion", { required: true })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control
          type="number"
          placeholder="Cantidad"
          {...register("Cantidad", { required: true })}
          min={0}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="text"
          placeholder="Precio"
          {...register("Precio", { required: true })}
        />
      </Form.Group>
      <Button variant="success" type="submit" className="w-100 mt-5">
        {row ? "Editar" : "Guardar"}
      </Button>
    </Form>
  );
};
