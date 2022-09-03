import React from 'react';

const PopupWithForm = (props) => {
  const { name, title, buttonText, onSubmit, isFormValid, children } = props;

  return (
    <form
      className='popup__form'
      name={`form-${name}`}
      onSubmit={onSubmit}
      action='form'
      noValidate
    >
      <h3 className='popup__title'>{title}</h3>
      {children}
      <button
        className={`popup__button popup__button_type_submit
              ${!isFormValid ? 'popup__button_disabled' : ''}`}
        type='submit'
        disabled={!isFormValid}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PopupWithForm;
