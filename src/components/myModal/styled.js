import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const CustomModal = styled(Modal)``;

export const ModalHeader = styled(Modal.Header)`
  background-color: #616161;
  border-bottom: 2px solid white;

  .modal-title {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 2rem;
    letter-spacing: 0.2rem;
    font-family: 'Chakra Petch', sans-serif;
    color: white;
  }
`;

export const ModalBody = styled(Modal.Body)`
  padding: 3rem;
  text-align: center;
  background-color: rgba(247, 247, 249, 1);
`;

export const ModalFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: space-around;
  background-color: rgba(247, 247, 249, 1);
`;

export const ModalEventTitle = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  color: hsl(24 100% 65%);
`;
