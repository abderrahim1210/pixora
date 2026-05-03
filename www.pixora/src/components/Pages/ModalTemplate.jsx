import React from 'react'
import { Modal } from "react-bootstrap";

const ModalTemplate = ({ show, closeModal, children }) => {
    return (
        <Modal show={show} onHide={closeModal} className="bottom-sheet-wrapper" dialogClassName="bottom-sheet-modal" >
            {/* <Modal.Header>
            </Modal.Header> */}
            <Modal.Body className="p-1">
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default ModalTemplate