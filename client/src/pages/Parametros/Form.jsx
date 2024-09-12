import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

export const Formulario = ({ row,closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows } = useAppContext();

  useEffect(() => {
    if (row) {
      setValue("Descripcion", row.Descripcion);
      setValue("Valor", row.Valor);
      console.log(row);
    } else {
      console.log("No hay datos");
    }
  }, []);
  async function submit(values) {
    try {
      if (row) {
        const response = await axios.put(`/UpdateParametro/${row.Id}`, values);
        closeModal(false);

        const newRows = await axios.get("/GetParametros");
        setRows(newRows.data);
      } else {
        const response = await axios.post("/AddParametro", values);
        console.log(response);
        closeModal(false);
      }
    } catch (error) {
      alert("Error al guardar");
      console.error(error);
    }
  }
  return (
    <Form className="h-75 w-75" onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          placeholder="Descripcion"
          {...register("Descripcion", { required: true })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
        <Form.Label>Valor</Form.Label>
        <Form.Control
          type="text"
          placeholder="Valor"
          {...register("Valor", { required: true })}
        />
      </Form.Group>
      <Button variant="success" type="submit" className="w-100 mt-5">
        {row ? "Editar" : "Guardar"}
      </Button>
    </Form>
  );
};
