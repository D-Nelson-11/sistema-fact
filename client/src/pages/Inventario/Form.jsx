import { Form, Button, Row, Col } from "react-bootstrap";
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
              const response = await axios.put(
                `/UpdateInventario/${row.Id}`,
                values
              );
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
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Código"
              autoFocus
              {...register("Codigo", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripcion"
              {...register("Descripcion", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Existencia</Form.Label>
            <Form.Control
              type="number"
              readOnly = {row ? true : false}
              placeholder="Existencia"
              {...register("Cantidad", { required: true })}
            />
          </Form.Group>
        </Col>
        {row && (
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Añadir Unidades</Form.Label>
              <Form.Control
                type="number"
                placeholder="Añadir Unidades"
                defaultValue={0}
                {...register("NuevasUnidades", { required: true })}
                onChange={(e) => {
                  if (e.target.value === "") {
                    return setValue("Cantidad", row.Existencia);
                  }
                  setValue(
                    "Cantidad",
                    parseInt(e.target.value) + parseInt(row.Existencia)
                  );
                }}
                min={0}
              />
            </Form.Group>
          </Col>
        )}
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="float"
              placeholder="Precio"
              {...register("Precio", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="danger" type="submit" className="w-100 mt-5">
        Guardar
      </Button>
    </Form>
  );
};
