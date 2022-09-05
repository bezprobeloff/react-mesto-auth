import React from 'react';
import '../scss/popup.scss';

const ImagePopup = ({ card }) => {
  return (
    <>
      <img src={card.link} alt={card.name} className='popup__view-image' />
      <h3 className='popup__description'>{card.name}</h3>
    </>
  );
};

export default ImagePopup;
