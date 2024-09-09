import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { colors } from "../../helpers/themes";
import { useAppContext } from "../../context/AppContext";


function ModalC({ContenidoModal,Nombre,row}) {
    const [lgShow, setLgShow] = useState(false);
    const { handleClose } = useAppContext();
  
    return (
      <>
        <Button onClick={() => setLgShow(true)} style={{width:"200px", backgroundColor:colors.themeColor, border:"none"}}>{Nombre}</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton />
          <Modal.Body style={{height:"590px"}} className="d-flex justify-content-center">
            <ContenidoModal row = {row ? row : null} />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default ModalC