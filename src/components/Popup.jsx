import React, { useEffect } from 'react';
import '../scss/popup.scss';

const Popup = ({ name, isOpen, onClose, component: Component, ...props }) => {
  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
  const handleOverlayClose = (evt) =>
    evt.target === evt.currentTarget && onClose();

  const handleEscClosePopup = (evt) => {
    if (evt.key !== 'Escape') return;

    onClose();
  };

  const setHandleEscClosePopup = () => {
    document.addEventListener('keydown', handleEscClosePopup);
  };

  const removeHandleEscClosePopup = () => {
    document.addEventListener('keydown', handleEscClosePopup);
  };

  useEffect(() => {
    isOpen ? setHandleEscClosePopup() : removeHandleEscClosePopup();
  }, [isOpen]);

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
        <Component {...props} />
      </div>
    </div>
  );
};

export default Popup;
