import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAppContext } from "./context/AppContext";
import { useForm } from "react-hook-form";
import styles from "./public/login.module.css";

function Index() {
  const { login } = useAppContext();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container className={styles.container} fluid>
      <Form
        className={styles.form}
        onSubmit={handleSubmit((values) => {
          login(values);
        })}
      >
        <div className={styles.title}>Iniciar Sesión</div>

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
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("UserPassword", { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Mostrar Contraseña"
            className={styles.checkbox}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
        </Form.Group>

        <Button type="submit" className={`${styles.button} w-100`}>
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

export default Index;
