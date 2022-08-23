import PopupWithForm from './PopupWithForm';
import React, { useState, useEffect } from 'react';
import useInput from '../utils/hooks/useInput';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputAvatar = useInput({ inputValue: '' });
  const [isFormNotValid, setIsFormNotValid] = useState(true);

  const inputAvatarClass = `popup__input popup__input_type_avatar
    ${inputAvatar.isError ? 'popup__input_type_error' : ''}`;

  useEffect(() => {
    inputAvatar.reset();
    setIsFormNotValid(true);
  }, [isOpen]);

  // меняем состояние кнопки сабмит
  useEffect(() => {
    if (inputAvatar.isError || inputAvatar.value === '') {
      setIsFormNotValid(true);
    } else {
      setIsFormNotValid(false);
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
      name='update-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormNotValid={isFormNotValid}
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
