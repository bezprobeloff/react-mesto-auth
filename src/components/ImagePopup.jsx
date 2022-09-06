import React from 'react';
import Popup from './Popup';
import '../scss/popup.scss';

const ImagePopup = ({ card, name, isOpen, onClose }) => {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <img src={card.link} alt={card.name} className='popup__view-image' />
      <h3 className='popup__description'>{card.name}</h3>
    </Popup>
  );
};

export default ImagePopup;
