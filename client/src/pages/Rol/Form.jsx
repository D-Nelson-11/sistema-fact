import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "../../api/axios.js";
import { useAppContext } from "../../context/AppContext.jsx";
import { useEffect, useState } from "react";
import { BasicAccordion } from "./Accordion.jsx";

export function Formulario({ row, closeModal }) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { setRows } = useAppContext();
  const [Objetos, setObjetos] = useState([]);
  const [permisos, setPermisos] = useState([]); // Almacena los permisos obtenidos del rol
  const [objetosDelRol, setObjetosDelRol] = useState([]); // Almacena los objetos del rol
  let objetosEliminados = [];
  let objetosAgregados = [];

  useEffect(() => {
    async function obtenerObjetos() {
      try {
        const response = await axios.get("/getObjetos");
        setObjetos(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (row) {
      async function obtenerPermisos() {
        try {
          const response = await axios.get(`/getPermisosByRolId/${row.Id}`);
          setObjetosDelRol(response.data.map((objeto) => objeto.IdObjeto));

          setPermisos(response.data);
        } catch (error) {
          console.log(error);
        }
        setValue("Rol", row.Rol);
        setValue("Descripcion", row.Descripcion);
      }
      obtenerPermisos();
    }
    obtenerObjetos();
  }, []); // Se ejecuta una sola vez para obtener todos los objetos

  useEffect(() => {
    
  }, [row]);

  return (
    <Container>
      <Row className="p-3 d-flex justify-content-center ">
        <Col className="col-12 bg-ligt p-3">
          <Form
            onSubmit={handleSubmit(async (values) => {
              if (row) {
                toast("¿Desea guardar los cambios?", {
                  action: {
                    label: "Guardar",
                    onClick: async () => {
                      try {
                        const resp = await axios.put(`/updateRol/${row.Id}`, {...values,objetosAgregados,objetosEliminados});
                        if (resp.data.IsValid === false) {
                          toast.error(resp.data.message);
                          return;
                        }
                        const resp2 = await axios.get("/getRoles");
                        toast.success(resp.data.message);
                        closeModal(false);
                        setRows(resp2.data);
                      } catch (error) {
                        console.log(error);
                        toast.error("Error al actualizar el rol");
                      }
                    },
                  },
                });
                return;
              }
              if (!values.Objetos || values.Objetos.length === 0) {
                toast.error("Debes seleccionar al menos una pantalla");
                return;
              }
              try {
                const resp = await axios.post("/guardarRol", values);
                if (resp.data.IsValid === false) {
                  toast.error(resp.data.message);
                  return;
                }
                closeModal(false);
                toast.success(resp.data.message);
                const resp2 = await axios.get("/getRoles");
                setRows(resp2.data);
              } catch (error) {
                console.log(error);
                toast.error("Error al guardar el rol");
              }
            })}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del rol"
                {...register("Rol", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Añade una descripción..."
                {...register("Descripcion", { required: true })}
              />
            </Form.Group>
            {row === null ? (
              <Form.Group className="mb-3">
                <BasicAccordion
                  tabla={
                    <div
                      style={{
                        maxHeight: "150px",
                        overflowY: "auto",
                        marginTop: "5px",
                      }}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Acceso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Objetos.map((objeto, index) => (
                            <tr key={objeto.Id}>
                              <td>{index + 1}</td>
                              <td
                                onClick={(e) => {
                                  // Evita que el evento se propague al hacer clic en el checkbox
                                  if (e.target.tagName !== "INPUT") {
                                    e.currentTarget
                                      .querySelector('input[type="checkbox"]')
                                      .click();
                                  }
                                }}
                                style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clickeable
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={objeto.Objeto}
                                  value={objeto.Id} // Aquí usamos IdObjeto como valor
                                  name="Objetos"
                                  {...register("Objetos")}
                                  onClick={(e) => e.stopPropagation()} // Evita que el evento click en el td se dispare desde el checkbox
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  }
                  nombre="Pantallas a las que tendrá acceso"
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <BasicAccordion
                  tabla={
                    <div
                      style={{
                        maxHeight: "150px",
                        overflowY: "auto",
                        marginTop: "5px",
                      }}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Acceso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Objetos.map((objeto, index) => (
                            <tr key={objeto.Id}>
                              <td>{index + 1}</td>
                              <td
                                onClick={(e) => {
                                  // Evita que el evento se propague al hacer clic en el checkbox
                                  if (e.target.tagName !== "INPUT") {
                                    e.currentTarget
                                      .querySelector('input[type="checkbox"]')
                                      .click();
                                  }
                                }}
                                style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clickeable
                              >
                                <Form.Check
                                  type="checkbox"
                                  label={objeto.Objeto}
                                  value={objeto.Id} // Aquí usamos IdObjeto como valor
                                  name="Objetos"
                                  {...register("Objetos")}
                                  defaultChecked={permisos?.some(
                                    (permiso) =>
                                      permiso.IdObjeto === objeto.Id || false
                                  )} // Marcamos el checkbox si el IdObjeto está en los permisos
                                  onClick={(e) => e.stopPropagation()} // Evita que el evento click en el td se dispare desde el checkbox
                                  onChange={(e) => {
                                    if (!e.target.checked) { // si el check no está activado, se elimina el objeto
                                      if(objetosAgregados.includes(e.target.value)) {
                                        objetosAgregados = objetosAgregados.filter((objeto) => objeto !== e.target.value);
                                      }
                                      if(objetosDelRol.includes(Number(e.target.value))) {
                                        objetosEliminados.push(e.target.value);
                                      }
                                    } else {// si el check está activado
                                      if (!objetosDelRol.includes(Number(e.target.value))) {// si el objeto no está en el array de objetos que tiene el rol, se agrega pero
                                        if (!objetosAgregados.includes(e.target.value)) { // solo se agrega si no está en el array de objetos agregados
                                          objetosAgregados.push(e.target.value);
                                          if (objetosEliminados.includes(e.target.value)) {// si el objeto está en el array de objetos eliminados, se elimina del array de objetos eliminados
                                            objetosEliminados = objetosEliminados.filter((objeto) => objeto !== e.target.value);
                                            console.log('perro')
                                          }
                                        }
                                      } else {// si el objeto está en el array de objetos que tiene el rol, se elimina del array de objetos eliminados
                                        objetosEliminados = objetosEliminados.filter((objeto) =>objeto !== e.target.value);
                                      }
                                    }
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  }
                  nombre="Pantallas"
                />
              </Form.Group>
            )}

            <Button type="submit" className="w-100" variant="success">
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
