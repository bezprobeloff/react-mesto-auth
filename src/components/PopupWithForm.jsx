import React from 'react';

const PopupWithForm = (props) => {
  const {
    name,
    title,
    buttonText,
    isOpen,
    onClose,
    onSubmit,
    isFormNotValid,
    children,
  } = props;

  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
  const handleOverlayClose = (evt) =>
    evt.target === evt.currentTarget && onClose();

  return (
    <div
      className={`popup popup_type_${name} ${classPopupOpened}`}
      onClick={handleOverlayClose}
    >
      <div className='popup__container'>
        <button
          className='popup__button-close'
          onClick={onClose}
          type='button'
          aria-label='Закрыть'
        ></button>
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
              ${isFormNotValid ? 'popup__button_disabled' : ''}`}
            type='submit'
            disabled={isFormNotValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
