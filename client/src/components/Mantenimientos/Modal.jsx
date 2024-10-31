import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { colors } from "../../helpers/themes";

function ModalC({ ContenidoModal, Nombre, row, ancho }) {
  const [lgShow, setLgShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        style={{ width: ancho, backgroundColor: colors.themeColor, border: "none" }}
      >
        {Nombre}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body style={{ height: "auto" }} className="d-flex justify-content-center">
          <ContenidoModal row={row ? row : null} closeModal={setLgShow} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalC;