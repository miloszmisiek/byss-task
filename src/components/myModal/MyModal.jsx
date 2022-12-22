import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalEventTitle, ModalFooter, ModalHeader } from './styled';

function MyModal({ show, setShow, deleteEvent, setShowPopover, selected }) {
  const [deleteItm, setDeleteItm] = useState({});
  // const deleteItm = selected.find((sel) => sel.idx === event.evId);

  useEffect(() => {
    setDeleteItm(selected[0]);
  }, [selected]);
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
        Are you sure you want to delete <ModalEventTitle>{deleteItm?.target}</ModalEventTitle>{' '}
        event?
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleClose();
            deleteEvent(deleteItm?.idx);
          }}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default MyModal;
