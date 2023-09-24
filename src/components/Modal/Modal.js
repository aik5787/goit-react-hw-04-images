import React, { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import { useImageContext } from '../Context/Context';

export const Modal = () => {
  const { isModalOpen, selectedImage, closeModal, handleKeyDown } =
    useImageContext();

  // Adding and Removing Listener

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Close Modal if click on Overlay

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    isModalOpen &&
    Object.keys(selectedImage).length > 0 && (
      <Overlay onClick={handleBackdropClick}>
        <ModalStyle>
          <img
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            width="800"
            height="600"
          />
        </ModalStyle>
      </Overlay>
    )
  );
};
