import React from "react";
import { Container, Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Error() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Error 404</h1>
          <p>La página que buscas no existe</p>
          <Link to={-1}>Volver</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Error;
