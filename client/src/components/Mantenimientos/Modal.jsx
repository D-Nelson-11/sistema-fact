import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { colors } from "../../helpers/themes";


function ModalC({ContenidoModal,Nombre}) {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <>
        <Button onClick={() => setLgShow(true)} style={{width:"200px", backgroundColor:colors.themeColor, border:"none"}}>{Nombre}</Button>
        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton />
          <Modal.Body className="d-flex justify-content-between" style={{height:"590px"}}>
            {ContenidoModal}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default ModalC