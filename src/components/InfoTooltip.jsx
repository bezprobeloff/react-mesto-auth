import React from 'react';

const InfoTooltip = (props) => {
  const { isOpen, onClose } = props;

  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
  const handleOverlayClose = (evt) =>
    evt.target === evt.currentTarget && onClose();

  return (
    <div className={`popup ${classPopupOpened}`} onClick={handleOverlayClose}>
      <div className='popup__container'>
        <button
          className='popup__button-close'
          onClick={onClose}
          type='button'
          aria-label='Закрыть'
        ></button>
        <div className='popup__info-container'>
          <div className='popup__icon popup__icon_type_accept'></div>
          <h3 className='popup__message'>Вы успешно зарегистрировались!</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
