import React from 'react';

const InfoTooltip = ({ isSuccess, message }) => {
  const classIconType = isSuccess
    ? ' popup__icon_type_accept'
    : ' popup__icon_type_error';

  return (
    <div className='popup__info-container'>
      <div className={`popup__icon${classIconType}`}></div>
      <h3 className='popup__message'>{message}</h3>
    </div>
  );
};

export default InfoTooltip;
