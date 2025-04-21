import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalC from "./Modal";
import { toast } from "sonner";

export default function Tabla({
  columns,
  rows,
  modalBtnValue,
  formulario,
  searchTerm,
  handleSearchChange,
  filteredData,
  deleteRequest,
  permisoEliminar,
  permisoConsulta,
  permisoActualizar,
  titulo,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bolder",
            background: "linear-gradient(45deg, #1d54ae 30%, #df4e47 90%)",
            padding: "30px",
            color: "#fff",
            borderRadius: "5px",
            fontSize:"34px",
            letterSpacing:"4px"
          }}>
          {titulo}
        </h1>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between">
        {modalBtnValue && (
          <div
            className="mb-2 mb-md-2"
            style={{ width: "100%", maxWidth: "49.5%" }}>
            <ModalC
              Nombre={modalBtnValue}
              ContenidoModal={formulario}
              ancho="200px"
              titulo={titulo}
            />
          </div>
        )}
        {permisoConsulta && (
          <div className="mb-2 mb-md-2" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-100 p-1 rounded-1 border-1"
            />
          </div>
        )}
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table" sx={{boxShadow:"0px 10px 5px rgba(0, 0,0, 0.5)"}}>
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {column.id === "Acciones" && (
                              <>
                                {permisoActualizar && (
                                  <ModalC
                                    Nombre="Editar"
                                    ContenidoModal={formulario}
                                    row={row}
                                    titulo={titulo}
                                  />
                                )}
                                {deleteRequest && permisoEliminar && (
                                  <button
                                    className="btn btn-danger ms-1"
                                    onClick={() => {
                                      toast.dismiss();
                                      toast.error(
                                        "¿Desea eliminar este registro?",
                                        {
                                          action: {
                                            label: "Si, Eliminar",
                                            onClick: () => {
                                              {
                                                deleteRequest(row.Id);
                                              }
                                            },
                                          },
                                        }
                                      );
                                    }}>
                                    Eliminar
                                  </button>
                                )}
                              </>
                            )}
                            {column.id === "N" && <span>{index + 1}</span>}
                           
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="ITEMS EN PANTALLA"
          labelDisplayedRows={({ from, to, count }) =>{
            return `${from}-${to} de ${count !== -1 ? count : `mas de ${to}`}`
          }
        }
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ background:"linear-gradient(45deg, #df4e47 10%, #1d54ae 60%)", color: "#fff" }}
        />
      </Paper>
    </div>
  );
}
