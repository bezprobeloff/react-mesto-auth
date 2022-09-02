import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit();
  };

  return (
    <PopupWithForm
      title='Вы уверены?'
      buttonText='Да'
      name='confirm'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  );
};

export default ConfirmationPopup;
