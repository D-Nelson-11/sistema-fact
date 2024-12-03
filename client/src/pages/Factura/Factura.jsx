import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Datos from "./Datos";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import axios from "../../api/axios";
import { useRef } from "react";
import { toast } from "sonner";
import { TfiReload } from "react-icons/tfi";
import { set } from "react-hook-form";

export default function Factura() {
  const [editable, setEditable] = useState(null); // Estado para rastrear qué fila se está editando
  const [rows, setRows] = useState([]);
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(calculateSubtotal(rows));
  const lastInputTime = useRef(Date.now());
  const inputSequence = useRef("");
  const [parametros, setParametros] = useState([]);
  const [valorDescuento, setValorDescuento] = useState(0);
  const [editable2, setEditable2] = useState(null); // Estado para rastrear qué fila se está editando

  useEffect(() => {
    async function GetData() {
      try {
        const response = await axios.get("/GetInventario");
        setItems(response.data);
        const resp = await axios.get("/GetParametros");
        setParametros(resp.data);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    }
    GetData();

    const handleKeyDown = (event) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastInputTime.current;

      const SCAN_THRESHOLD = 100;
      const SEQUENCE_THRESHOLD = 200;

      if (timeDiff < SCAN_THRESHOLD) {
        inputSequence.current += event.key;
      } else if (
        timeDiff < SEQUENCE_THRESHOLD &&
        inputSequence.current.length > 0
      ) {
        inputSequence.current += event.key;
      } else {
        inputSequence.current = event.key;
      }

      lastInputTime.current = currentTime;
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        let scannedValue = inputSequence.current;

        // Eliminar la palabra "Enter" si está al final
        if (scannedValue.endsWith("Enter")) {
          scannedValue = scannedValue.slice(0, -5);
        }

        handleScannedValue(scannedValue.trim()); // Limpiar espacios innecesarios
        inputSequence.current = ""; // Limpiar la secuencia después de procesarla
      }
    };
    // Escuchar los eventos de teclado a nivel global
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      // Limpiar los eventos al desmontar el componente
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const handleScannedValue = async (value) => {
    try {
      const response = await axios.get(`/GetInventarioById/${value}`);

      if (response.data.length > 0) {
        const newItem = response.data[0];
        setRows((prevRows) => {
          // Verificar si el código ya existe en prevRows
          const isDuplicate = prevRows.some(
            (item) => item.Codigo === newItem.Codigo
          );

          if (!isDuplicate) {
            const newRows = [...prevRows, newItem];
            setSubTotal(calculateSubtotal(newRows)); // Recalcular el subtotal
            return newRows;
          } else {
            console.log("El producto ya existe:", newItem.Codigo);
            return prevRows; // Retorna el estado previo sin cambios
          }
        });
      } else {
        console.log("Producto no encontrado:", value);
        alert("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };
  const handleDoubleClick = (index) => {
    setEditable(index); // Establecer la fila que se está editando
  };
  const handleDoubleClickDesc = () => {
    setEditable2(true); // Establecer la fila que se está editando
  };

  const AñadirProducto = (value) => {
    setRows((prevRows) => {
      console.log(prevRows);
      // Verificar si el código ya existe en prevRows
      const isDuplicate = prevRows.some((item) => value.Codigo === item.Codigo);

      if (!isDuplicate) {
        const newRows = [...prevRows, value];
        setSubTotal(calculateSubtotal(newRows)); // Recalcular el subtotal
        return newRows;
      } else {
        console.log("El producto ya existe:", value.Codigo);
        return prevRows; // Retorna el estado previo sin cambios
      }
    });
  };

  const handleDeleteProducto = (index) => {
    console.log(index);
    const updatedRows = rows.filter((row) => {
      return row.Id !== index;
    });
    setRows(updatedRows);
    setSubTotal(calculateSubtotal(updatedRows)); // Recalcular el subtotal
  };

  const handleCantidadChange = (index, value) => {
    const updatedRows = [...rows];
    if (value > updatedRows[index].Existencia) {
      toast.dismiss();
      toast.error("La cantidad no puede ser mayor a la existencia", {
        style: {
          fontSize: "20px",
          backgroundColor: "#C70039",
          width: "400px",
          color: "#fff",
          border: "none",
        },
      });
      return;
    }
    if (value == "") {
      updatedRows[index].Cantidad = 1;
      setRows(updatedRows);
      return;
    }
    updatedRows[index].Cantidad = parseInt(value);
    setRows(updatedRows);
    setSubTotal(calculateSubtotal(updatedRows)); // Recalcular el subtotal
  };
  const handleCantidadChangeDesc = (value) => {
    if (value > Number(parametros[1].Valor)) {
      toast.error("El descuento no puede ser mayor al permitido", {
        style: {
          fontSize: "20px",
          backgroundColor: "#C70039",
          width: "400px",
          color: "#fff",
          border: "none",
        },
      });
      setValorDescuento(0);
      return;
    }
    if (value < 0) {
      toast.error("El descuento no puede ser menor a 0", {
        style: {
          fontSize: "20px",
          backgroundColor: "#C70039",
          width: "400px",
          color: "#fff",
          border: "none",
        },
      });
      setValorDescuento(0);
      return;
    }
    setValorDescuento(value);
    const updatedRows = [...rows];

    setSubTotal(calculateSubtotal(updatedRows)); // Recalcular el subtotal
  };

  function calculateSubtotal(rows) {
    return rows.reduce((sum, row) => sum + row.Cantidad * row.Precio, 0);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditable2(null);
    }
  };

  return (
    <div
      className="center d-flex h-auto justify-content-between flex-wrap"
      style={{ width: "90%" }}>
      <div style={{ width: "90%" }}>
        <div>
          <h2  style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bolder",
            background: "linear-gradient(45deg, #1d54ae 30%, #df4e47 90%)",
            padding: "30px",
            color: "#fff",
            borderRadius: "5px",
            fontSize:"34px",
            letterSpacing:"4px"
          }}>Facturar</h2>
        </div>
        <SearchBar items={items} setRowsHelp={AñadirProducto} />
      </div>
      <div
        style={{ width: "10%" }}
        className="d-flex align-items-center justify-content-end">
        <TfiReload
          style={{ color: "black", fontSize: "32px", cursor: "pointer" }}
          onClick={() => {
            toast.dismiss();
            toast("¿Desea actualizar la página?", {
              action: {
                label: "Actualizar",
                onClick: async () => {
                  try {
                    const response = await axios.get("/GetInventario");
                    setItems(response.data);
                    if (rows.length > 0) {
                      console.log(rows);
                      rows.forEach((row) => {
                        response.data.forEach((item) => {
                          if (item.Codigo === row.Codigo) {
                            row.Existencia = item.Existencia;
                          }
                        });
                      });
                    }
                    const resp = await axios.get("/GetParametros");
                    setParametros(resp.data);
                    toast.success("Página actualizada");
                  } catch (error) {
                    console.log("Error al obtener los datos:", error);
                  }
                },
              },
            });
          }}
        />
      </div>
      <div style={{ width: "70%" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", height: "auto", maxHeight: "500px" }}>
          <Table
            sx={{ minWidth: 600 }}
            aria-label="spanning table"
            stickyHeader
            id="tabla">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Cantidad</TableCell>
                <TableCell align="left">Precio</TableCell>
                <TableCell align="left">Total</TableCell>
                {rows.length > 0 && <TableCell align="left">Accion</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={row.Descripcion}>
                  <TableCell>{row.Descripcion}</TableCell>
                  <TableCell
                    align="left"
                    onDoubleClick={() => handleDoubleClick(index)}>
                    {editable === index ? (
                      <input
                        type="number"
                        min={1}
                        style={{ width: "60px" }}
                        value={row.Cantidad}
                        onChange={(e) =>
                          handleCantidadChange(index, e.target.value)
                        }
                        onBlur={() => setEditable(null)} // Salir del modo de edición cuando se pierde el foco
                        autoFocus
                        onKeyDown={handleKeyDown}
                      />
                    ) : (
                      row.Cantidad
                    )}
                  </TableCell>
                  <TableCell align="left">{row.Precio.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</TableCell>
                  <TableCell align="left">
                    {(row.Precio * row.Cantidad).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => {
                        handleDeleteProducto(row.Id);
                      }}>
                      eliminar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="left">{subTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</TableCell>
              </TableRow>
              {parametros.length > 0 && (
                <>
                  <TableRow>
                    <TableCell>Impuesto</TableCell>
                    <TableCell align="left">{`${parametros[4].Valor} %`}</TableCell>
                    <TableCell align="left">
                      {((subTotal * parametros[4].Valor) / 100).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Descuento</TableCell>
                    <TableCell
                      align="left"
                      onDoubleClick={() => handleDoubleClickDesc()}>
                      {editable2 == true ? (
                        <input
                          type="number"
                          style={{ width: "60px" }}
                          value={valorDescuento}
                          max={Number(parametros[1].Valor)}
                          min={0}
                          onChange={(e) =>
                            handleCantidadChangeDesc(e.target.value)
                          }
                          onBlur={() => setEditable2(null)} // Salir del modo de edición cuando se pierde el foco
                          autoFocus
                          onKeyDown={handleKeyDown}
                        />
                      ) : (
                        valorDescuento + " " + "%"
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {((subTotal * valorDescuento) / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </>
              )}

              {parametros.length > 0 && (
                <>
                  <TableRow>
                    <TableCell></TableCell>

                    <TableCell
                      colSpan={2}
                      sx={{ fontSize: "80px", fontWeight:"bolder"  }}
                      align="left"
                      >
                      Total:
              
                    </TableCell>

                    <TableCell align="left" sx={{ fontSize: "60px" }}>
                      {(
                        subTotal -
                        (subTotal * valorDescuento) / 100 +
                        (parametros[4].Valor / 100) * subTotal
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {parametros.length > 0 && (
        <Datos
          rows={rows}
          setItems={setItems}
          setParametros={setParametros}
          total={
            subTotal -
            (subTotal * valorDescuento) / 100 +
            (parametros[4].Valor / 100) * subTotal
          }
          setRows={setRows}
        />
      )}
    </div>
  );
}
