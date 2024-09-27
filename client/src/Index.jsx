import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAppContext } from "./context/AppContext";
import { useForm } from "react-hook-form";

function Index() {
  const { login } = useAppContext();
  const { register, handleSubmit } = useForm();
  return (
    <Container className="d-flex justify-content-center p-3 mt-4">
      <Form
        className="bg-light p-3 border border-1 rounded mt-4"
        style={{ width: "35%" }}
        onSubmit={handleSubmit((values) => {
          login(values);
        })}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Correo"
            {...register("Correo", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register("UserPassword", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Mostrar Contraseña" />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100">
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

export default Index;