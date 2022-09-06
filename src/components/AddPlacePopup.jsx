import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';
import useInput from '../utils/hooks/useInput';

const AddPlacePopup = ({ name, isOpen, onClose, onAddPlace }) => {
  const inputName = useInput({ inputValue: '' });
  const inputLink = useInput({ inputValue: '' });
  const inputNameClass = `popup__input popup__input_type_card-name
    ${inputName.isError ? 'popup__input_type_error' : ''}`;
  const inputLinkClass = `popup__input popup__input_type_card-link
    ${inputLink.isError ? 'popup__input_type_error' : ''}`;
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({ name: inputName.value, link: inputLink.value });
  };

  useEffect(() => {
    // обнуляем инпуты и дизейблим сабмит по умолчанию
    inputName.reset();
    inputLink.reset();
    setIsFormValid(false);
  }, [isOpen]);

  // меняем состояние кнопки сабмит
  useEffect(() => {
    if (
      inputName.isError ||
      inputName.value === '' ||
      inputLink.isError ||
      inputLink.value === ''
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [inputName.value, inputLink.value]);

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title='Новое место'
        buttonText='Сохранить'
        name={name}
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <input
          className={inputNameClass}
          value={inputName.value ?? ''}
          onChange={inputName.onChange}
          type='text'
          name='card-name'
          id='card-name'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='popup__input-error popup__input-error_type_card-name'>
          {inputName.errorMessage}
        </span>
        <input
          className={inputLinkClass}
          value={inputLink.value ?? ''}
          onChange={inputLink.onChange}
          type='url'
          name='card-link'
          id='card-link'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup__input-error popup__input-error_type_card-link'>
          {inputLink.errorMessage}
        </span>
      </PopupWithForm>
    </Popup>
  );
};

export default AddPlacePopup;
