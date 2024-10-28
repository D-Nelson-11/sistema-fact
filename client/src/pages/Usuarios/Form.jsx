import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

export const Formulario = ({ row, closeModal }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { setRows, user } = useAppContext();
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  useEffect(() => {
    async function getRoles() {
      const response = await axios.get("/getRoles");
      setRoles(response.data);
    }
    getRoles();
    console.log(user);
  }, []);

  useEffect(() => {
    if (row) {
      setValue("Nombres", row.Nombres);
      setValue("Apellidos", row.Apellidos);
      setValue("Correo", row.Correo);
      setValue("IdRol", row.IdRol);
      setValue("Estado", row.Estado === "Activo" ? "1" : "0");
    }
  }, [roles]);

  async function submit(values) {
    if (row) {
      toast("¿Desea guardar los cambios?", {
        action: {
          label: "Guardar",
          onClick: async () => {
            try {
              const response = await axios.put(
                `/updateUsuario/${row.Id}`,
                values
              );
              if (response.data.IsValid === false) {
                return toast.error(response.data.message);
              }
              const newRows = await axios.get("/getUsuarios");
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
        const response = await axios.post("/guardarUsuario", {
          ...values,
          Estado: 1,
        });
        if (response.data.IsValid === false) {
          return toast.error(response.data.message);
        }
        const newRows = await axios.get("/getUsuarios");
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
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombres"
              autoFocus
              {...register("Nombres", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos"
              {...register("Apellidos", { required: true })}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              readOnly={row ? true : false}
              placeholder="Correo"
              {...register("Correo", { required: true })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Rol</Form.Label>
            <Form.Select {...register("IdRol", { required: true })}>
              <option value="">Seleccione</option>
              {roles.map((rol) => (
                <option key={rol.Id} value={rol.Id}>
                  {rol.Rol}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {!row && (
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"} // Mostrar como texto o contraseña
                placeholder="Contraseña"
                {...register("userPassword", { required: !row })} // La contraseña solo es obligatoria si no hay datos previos
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              id="showPasswordCheck" // Agrega un id al checkbox
              label={
                <Form.Label controlId="showPasswordCheck">
                  Mostrar contraseña
                </Form.Label>
              } // El label apunta al id del checkbox
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          </Col>
        )}
        {row && (
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Estado</Form.Label>
              <Form.Select {...register("Estado", { required: true })}>
                <option value="">Seleccione</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        )}
        {row && user[0][0].Id == 1 ? (
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="text" // Mostrar como texto o contraseña
                placeholder="Contraseña"
                {...register("userPassword", { required: !row })} // La contraseña solo es obligatoria si no hay datos previos
              />
            </Form.Group>
          </Col>
        ) : null}
      </Row>
      <Button variant="success" type="submit" className="w-100 mt-5">
        Guardar
      </Button>
    </Form>
  );
};
