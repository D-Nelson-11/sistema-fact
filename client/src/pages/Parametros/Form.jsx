import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import {toast} from 'sonner'

export const Formulario = ({ row,closeModal }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
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
    if (row) {
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(`/UpdateParametro/${row.Id}`,values);
              console.log(response)
              if (response.data.IsValid === false) {
                return toast.error(response.data.message);
              }
              const newRows = await axios.get("/GetParametros");
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
      const response = await axios.post("/AddParametro", values);
      if (response.data.IsValid === false) {
        return toast.error(response.data.message);
      }
      const newRows = await axios.get("/GetParametros");
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
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        {/* <Form.Control
          type="text"
          placeholder="Descripcion"
          {...register("Descripcion", { required: true })}
          readOnly
        /> */}
        {setRows.length>0 &&(getValues("Descripcion"))}:
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
