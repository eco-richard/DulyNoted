import React from 'react';
import { useModal } from '../../context/Modal';

interface ModalProps {
  modalComponent: any,
  buttonText: any,
  onButtonClick?: any,
  onModalClose?: any
}

// function OpenModalButton({
//   modalComponent: any, // component to render inside the modal
//   buttonText: any, // text of the button that opens the modal
//   onButtonClick?: any, // optional: callback function that will be called once the button that opens the modal is clicked
//   onModalClose?: any // optional: callback function that will be called once the modal is closed
// }) {

function OpenModalButton(prop: ModalProps) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (prop.onModalClose) setOnModalClose(prop.onModalClose);
    setModalContent(prop.modalComponent);
    if (prop.onButtonClick) prop.onButtonClick();
  };

  return (
    <button onClick={onClick}>{prop.buttonText}</button>
  );
}

export default OpenModalButton;