import React from 'react';
import Popup from './Popup';

const InfoTooltip = ({ name, isSuccess, message, isOpen, onClose }) => {
  const classIconType = isSuccess
    ? ' popup__icon_type_accept'
    : ' popup__icon_type_error';

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className='popup__info-container'>
        <div className={`popup__icon${classIconType}`}></div>
        <h3 className='popup__message'>{message}</h3>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
