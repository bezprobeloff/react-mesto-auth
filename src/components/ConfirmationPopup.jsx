import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmationPopup = ({ name, onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit();
  };

  return (
    <PopupWithForm
      title='Вы уверены?'
      buttonText='Да'
      name={name}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  );
};

export default ConfirmationPopup;
