import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalEventTitle, ModalFooter, ModalHeader } from './styled';

function MyModal({ show, setShow, event, deleteEvent, setShowPopover }) {
  const handleClose = () => {
    setShow(false);
    setShowPopover(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton closeVariant="white">
        <Modal.Title>Delete Event</Modal.Title>
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete <ModalEventTitle>{event.title}</ModalEventTitle> event?
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleClose();
            deleteEvent(event.evId);
          }}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default MyModal;
