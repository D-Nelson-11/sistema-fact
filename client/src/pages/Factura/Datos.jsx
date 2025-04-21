import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import PDF from "../../components/PDF";
import { toast } from "sonner";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";

const labelStyles = {
  fontSize: "13px",
};

function Datos({ rows, setItems, setParametros, total, setRows }) {
  const { register, handleSubmit, watch, getValues } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
  const isCash = paymentMethod === "Efectivo";
  const monto = watch("Monto", 0);
  const { user } = useAppContext();

  function generarFactura(values, total, metodoPago) {
    toast.dismiss();
    console.log(values);
    toast("¿Desea generar la factura?", {
      action: {
        label: "Generar",
        onClick: async () => {
          const resp = await axios.put("/generarFactura", {
            rows: rows,
          });
          if (resp.data.IsValid) {
            try {
              const response = await axios.get("/GetInventario");
              setItems(response.data);
              const resp2 = await axios.get("/GetParametros");
              setParametros(resp2.data);
              PDF(rows, values, total, metodoPago);
              let accion = `${
                user[0][0].Nombres
              } generó una factura, Productos Vendidos: ${rows.map(
                (item) => `${item.Descripcion} Cant: ${item.Cantidad}`
              )} total: ${total}`;
              axios.post("/insertBitacora", { Accion: accion });
              toast.success("Factura generada con éxito");
            } catch (error) {
              toast.error("Ha ocurrido un error");
            }
          } else {
            toast.error(resp.data.message);
          }
        },
      },
    });
  }

  return (
    <div
      style={{ width: "29.5%", backgroundColor: "#fff", height: "auto", boxShadow:"0px 10px 5px rgba(0, 0,0, 0.5)" }}
      className="p-2 rounded-1">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyles}>Nombre Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                size="sm"
                {...register("NombreCliente")}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyles}>Rtn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rtn"
                size="sm"
                {...register("Rtn")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label style={labelStyles}>Método de pago</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              label="Tarjeta"
              value="Tarjeta"
              checked={paymentMethod === "Tarjeta"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="me-3"
            />
            <Form.Check
              type="radio"
              label="Efectivo"
              value="Efectivo"
              checked={paymentMethod === "Efectivo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
        </Form.Group>

        {isCash && (
          <>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyles}>Monto recibido</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese monto"
                size="sm"
                {...register("Monto", { valueAsNumber: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyles}>Cambio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cambio"
                size="sm"
                readOnly
                value={monto > 0 ? monto - total : 0}
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3 d-flex justify-content-between">
          <Button
            style={{
              width: "100%",
              backgroundColor: "#0a0a2a",
              border: "none",
            }}
            onClick={() => {
              generarFactura(getValues(), total, paymentMethod);
            }}>
            Factura
          </Button>
          {/* <Button
            style={{
              width: "49.5%",
              backgroundColor: "#a4a4a4",
              border: "none",
            }}>
            Cotización
          </Button> */}
        </Form.Group>
      </Form>
    </div>
  );
}

export default Datos;
