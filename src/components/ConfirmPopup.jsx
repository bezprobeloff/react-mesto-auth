import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmPopup = ({ isOpen, onClose, onDeleteCard }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onDeleteCard();
  };

  return (
    <PopupWithForm
      title='Вы уверены?'
      buttonText='Да'
      name='confirm'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormNotValid={false}
    />
  );
};

export default ConfirmPopup;
