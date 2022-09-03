import PopupWithForm from './PopupWithForm';
import React, { useState, useEffect } from 'react';
import useInput from '../utils/hooks/useInput';

const EditAvatarPopup = ({ name, isOpen, onUpdateAvatar }) => {
  const inputAvatar = useInput({ inputValue: '' });
  const [isFormValid, setIsFormValid] = useState(false);

  const inputAvatarClass = `popup__input popup__input_type_avatar
    ${inputAvatar.isError ? 'popup__input_type_error' : ''}`;

  useEffect(() => {
    inputAvatar.reset();
    setIsFormValid(false);
  }, [isOpen]);

  // меняем состояние кнопки сабмит
  useEffect(() => {
    if (inputAvatar.isError || inputAvatar.value === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [inputAvatar.value]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar(inputAvatar.value);
  };

  return (
    <PopupWithForm
      title='Обновить аватар'
      buttonText='Сохранить'
      name={name}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        className={inputAvatarClass}
        type='url'
        name='avatar'
        value={inputAvatar.value}
        onChange={inputAvatar.onChange}
        id='avatar'
        placeholder='Ссылка на аватарку'
        minLength='2'
        required
      />
      <span className='popup__input-error popup__input-error_type_avatar'>
        {inputAvatar.errorMessage}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
