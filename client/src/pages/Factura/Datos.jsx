import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PDF from "../../components/PDF";
import {toast} from 'sonner'
import axios from '../../api/axios'

const labelStyles = {
  fontSize: "13px",
};

function Datos({ rows,setItems,setParametros }) {
  const { register, handleSubmit } = useForm();
  return (
    <div
      style={{ width: "29.5%", backgroundColor: "#fff", height: "372px" }}
      className="p-2 rounded-1">
      <Form onSubmit={handleSubmit((values)=>{
        toast('¿Desea generar la factura?',{
          action: {
            label: 'Generar',
            onClick: async() => {
              try{
                const resp = await axios.put('/generarFactura',{rows:rows})
                if (resp.data.IsValid){
                  const response = await axios.get("/GetInventario");
                  setItems(response.data);
                  const resp2 = await axios.get("/GetParametros");
                  setParametros(resp2.data);
                  PDF(rows,values);
                  toast.success('Factura generada con éxito')
                }else{
                  toast.error(resp.data.message)
                }

              }catch(error){
                console.error(error);
              }
            }
          }
        })
        console.log(values)
      })}>
        <Form.Group className="mb-3">
          <Form.Label style={labelStyles}>Nombre Cliente</Form.Label>
          <Form.Control type="text" placeholder="Nombre" size="sm" {...register("NombreCliente")} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={labelStyles}>Rtn</Form.Label>
          <Form.Control type="text" placeholder="Rtn" size="sm" {...register("Rtn")} />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between">
          <Button
            style={{ width: "49.5%" }} type="submit">Factura</Button>
          <Button style={{ width: "49.5%" }}>Cotización</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Datos;
