import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { colors } from "../../helpers/themes";
import { IoAddCircleOutline } from "react-icons/io5";

function ModalC({ ContenidoModal, Nombre, row, ancho, titulo }) {
  const [lgShow, setLgShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        style={{
          width: ancho,
          backgroundColor: "#1d54ae",
          border: "none",
          fontWeight: "bolder",
          letterSpacing: "3px",
        }}>
          {!row ? <IoAddCircleOutline style={{ color: "#fff" }} size={"30px"} /> : null}
        {Nombre}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-90w"
        centered>
        <Modal.Header
          closeButton
          style={{
            background: "#1d54ae",
            color: "#fff",
            borderRadius: "5px",
            fontSize: "34px",
            letterSpacing: "4px",
          }}>
          <Modal.Title id="example-modal-sizes-title-lg" style={{}}>
            {!row ? `AGREGANDO NUEVO ${titulo}` : `EDITANDO ${titulo}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ height: "auto", background: "#ece4e4" }}
          className="d-flex justify-content-center">
          <ContenidoModal row={row ? row : null} closeModal={setLgShow} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalC;
