import React from 'react';

const InfoTooltip = (props) => {
  const { isSuccess, message, isOpen, onClose } = props;

  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
  const classIconType = isSuccess
    ? ' popup__icon_type_accept'
    : ' popup__icon_type_error';
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
          <div className={`popup__icon${classIconType}`}></div>
          <h3 className='popup__message'>{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
