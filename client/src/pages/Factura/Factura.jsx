import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Datos from "./Datos";
import { Form } from "react-bootstrap";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";

const TAX_RATE = 0.07;

export default function Factura() {
  const [editable, setEditable] = useState(null); // Estado para rastrear qué fila se está editando
  const [rows, setRows] = useState([

  ]);

  const items = [{ Nombre: "Lapices", cantidad: 0, precio: 0 },{ Nombre: "Cuaderno", cantidad: 0, precio: 20 }]
  
  const [subTotal, setSubTotal] = useState(calculateSubtotal(rows));

  const handleDoubleClick = (index) => {
    setEditable(index); // Establecer la fila que se está editando
  };

  const setRowsHelp = (value)=>{
    setRows([...rows,value])
  }

  const handleCantidadChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].cantidad = parseInt(value);
    setRows(updatedRows);
    setSubTotal(calculateSubtotal(updatedRows)); // Recalcular el subtotal
  };

  function calculateSubtotal(rows) {
    return rows.reduce((sum, row) => sum + row.cantidad * row.precio, 0);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditable(null)
    }
  };

  return (
    <div
      className="center d-flex h-auto justify-content-between flex-wrap"
      style={{ width: "80%" }}>
      <Form className="w-100">
       <SearchBar items={items} setRowsHelp={setRowsHelp}/>
      </Form>
      <div style={{ width: "70%" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", height: "auto", maxHeight:"500px" }}>
          <Table sx={{ minWidth: 600 }} aria-label="spanning table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Cantidad</TableCell>
                <TableCell align="left">Precio</TableCell>
                <TableCell align="left">Total</TableCell>
                {rows.length > 0 && (
                  <TableCell align="left">Accion</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={row.index}>
                  <TableCell>{row.Nombre}</TableCell>
                  <TableCell align="left" onDoubleClick={() => handleDoubleClick(index)}>
                    {editable === index ? (
                      <input
                        type="number"
                        style={{width:"60px"}}
                        value={row.cantidad}
                        onChange={(e) => handleCantidadChange(index, e.target.value)}
                        onBlur={() => setEditable(null)} // Salir del modo de edición cuando se pierde el foco
                        autoFocus
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      row.cantidad
                    )}
                  </TableCell>
                  <TableCell align="left">{row.precio}</TableCell>
                  <TableCell align="left">{row.precio * row.cantidad}</TableCell>
                  <TableCell align="left"><button>eliminar</button></TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="left">{subTotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Impuesto</TableCell>
                <TableCell align="left">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="left">{(subTotal * TAX_RATE).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="left">{(subTotal * (1 + TAX_RATE)).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Datos />
    </div>
  );
}
