import React from "react";
import {Form, Button} from 'react-bootstrap'
import PDF from "../../components/PDF";


const labelStyles = {
  fontSize:"13px"
}

function Datos({rows}) {
  return (
    <div style={{ width: "29.5%", backgroundColor: "#fff", height: "372px" }} className="p-2 rounded-1">
       <Form>
      <Form.Group className="mb-3">
        <Form.Label style={labelStyles}>Nombre Cliente</Form.Label>
        <Form.Control type="text" placeholder="Nombre" size="sm" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={labelStyles}>RTN</Form.Label>
        <Form.Control type="text" placeholder="Rtn" size="sm" />
      </Form.Group>
      <Form.Group className="mb-3 d-flex justify-content-between">
       <Button style={{width:"49.5%"}} onClick={()=>{PDF(rows)}}>Factura</Button>
       <Button style={{width:"49.5%"}}>Cotización</Button>
      </Form.Group>
    </Form>
    </div>
  );
}

export default Datos;
