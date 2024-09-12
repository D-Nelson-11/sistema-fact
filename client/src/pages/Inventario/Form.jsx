import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows } = useAppContext();

  useEffect(() => {
    if (row) {
      setValue("Codigo", row.Codigo);
      setValue("Descripcion", row.Descripcion);
      setValue("Cantidad", row.Existencia);
      setValue("Precio", row.Precio);
      console.log(row);
    } else {
      console.log("No hay datos");
    }
  }, []);
  async function submit(values) {
    if (row) {
        toast("¿Desea guardar los cambios?", {
          action: {
            label: "Guardar",
            onClick: async () => {
              try {
                const response = await axios.put(`/UpdateInventario/${row.Id}`,values);
                console.log(response)
                if (response.data.IsValid === false) {
                  return toast.error(response.data.message);
                }
                const newRows = await axios.get("/GetInventario");
                toast.success(response.data.message);
                closeModal(false);
                setRows(newRows.data);
              } catch (error) {
                toast.error("Error al actualizar el registro", error);
                console.error(error);
              }
            },
          },
        });
     
    } else {
      try {
        const response = await axios.post("/AddInventario", values);
        if (response.data.IsValid === false) {
          return toast.error(response.data.message);
        }
        const newRows = await axios.get("/GetInventario");
        toast.success("Registro agregado con éxito");
        closeModal(false);
        setRows(newRows.data);
      } catch (error) {
        console.error(error);
      }
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
